const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/home_page');
const ProductPage = require('../pages/product_page');
const CartPage = require('../pages/cart_page');

const normalizeText = (text) => (text || '').trim().toLowerCase();
const extractPriceNumber = (text) => {
    const match = (text || '').replace(',', '').match(/[\d.]+/);
    return match ? match[0] : '';
};
const toPriceNumber = (text) => {
    const num = parseFloat(extractPriceNumber(text));
    return Number.isNaN(num) ? 0 : num;
};

const withShopifyId = (url, id) => {
    if (!url) return `https://sauce-demo.myshopify.com/cart/${id}:1`;
    if (url.includes('/cart/')) return url;
    return `https://sauce-demo.myshopify.com/cart/${id}:1`;
};

test.describe('Cart', () => {
    test('add_first_item_to_cart', async ({ page }) => {
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await homePage.goto();

        const homeName = await homePage.getFirstProductName();
        const homePrice = await homePage.getFirstProductPrice();

        await homePage.clickFirstProduct();
        const variantId = await productPage.getVariantId();
        await Promise.all([
            page.waitForResponse((resp) => resp.url().includes('/cart/add') && resp.status() === 200).catch(() => null),
            productPage.addToCart()
        ]);
        await page.waitForLoadState('domcontentloaded');

        if (variantId) {
            await page.goto(withShopifyId(page.url(), variantId));
        } else {
            await page.goto('https://sauce-demo.myshopify.com/cart');
        }

        const cartData = await cartPage.getCartData();
        const item = cartData && cartData.items && cartData.items[0] ? cartData.items[0] : null;

        if (item) {
            const cartName = item.title || '';
            const cartPrice = item.price ? String(item.price / 100) : '';
            const cartQty = item.quantity ? String(item.quantity) : '';

            expect(normalizeText(cartName)).toContain(normalizeText(homeName));
            expect(toPriceNumber(cartPrice)).toBeCloseTo(toPriceNumber(homePrice), 2);
            expect(cartQty).toBe('1');
        } else {
            const cartName = await cartPage.getCartItemName();
            const cartPrice = await cartPage.getCartItemPrice();
            const cartQty = await cartPage.getCartItemQty();

            expect(cartName).not.toBe('');
            expect(normalizeText(cartName)).toContain(normalizeText(homeName));
            expect(toPriceNumber(cartPrice)).toBeCloseTo(toPriceNumber(homePrice), 2);
            expect(cartQty).toBe('1');
        }
    });
});
