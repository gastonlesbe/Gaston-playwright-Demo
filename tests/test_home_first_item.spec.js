const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/home_page');
const ProductPage = require('../pages/product_page');

const normalizeText = (text) => (text || '').trim().toLowerCase();
const extractPriceNumber = (text) => {
    const match = (text || '').replace(',', '').match(/[\d.]+/);
    return match ? match[0] : '';
};
const normalizeImageUrl = (url) => {
    if (!url) return '';
    const cleaned = url.trim().replace(/^https?:/, '');
    const base = cleaned.split('?')[0];
    return base.replace(/_large|_small|_medium|_grande/gi, '');
};

test.describe('HomePage', () => {
    test('clicks_first_item_on_home_page', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        await homePage.goto();

        const homeName = await homePage.getFirstProductName();
        const homePrice = await homePage.getFirstProductPrice();
        const homeImage = await homePage.getFirstProductImageSrc();

        await homePage.clickFirstProduct();

        await expect(page).toHaveURL(/\/products\/grey-jacket/);
        await page.waitForLoadState('domcontentloaded');

        const productName = await productPage.getProductName();
        const productPrice = await productPage.getProductPrice();
        const productImage = await productPage.getProductImageSrc();

        expect(normalizeText(productName)).toContain(normalizeText(homeName));
        expect(extractPriceNumber(productPrice)).toBe(extractPriceNumber(homePrice));
        expect(normalizeImageUrl(productImage)).toContain(normalizeImageUrl(homeImage));
    });
});
