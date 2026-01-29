const { PRODUCT_TITLE, PRODUCT_PRICE, PRODUCT_IMAGE, ADD_TO_CART_BUTTON } = require('../locators/product_page_locators');

class ProductPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator(PRODUCT_TITLE);
        this.productPrice = page.locator(PRODUCT_PRICE);
        this.productImage = page.locator(PRODUCT_IMAGE);
        this.addToCartButton = page.locator(ADD_TO_CART_BUTTON);
    }

    async getProductName() {
        const titleTexts = await this.productTitle.allTextContents();
        const cleanTitle = titleTexts.map((t) => (t || '').trim()).find((t) => t);
        if (cleanTitle) {
            return cleanTitle;
        }

        const metaTitle = await this.page.locator('meta[property="og:title"]').getAttribute('content');
        if (metaTitle) {
            return metaTitle.trim();
        }

        const docTitle = await this.page.title();
        return docTitle ? docTitle.trim() : '';
    }

    async getProductPrice() {
        await this.productPrice.first().waitFor({ state: 'visible', timeout: 10000 });
        const prices = await this.productPrice.allTextContents();
        const clean = prices.map((p) => (p || '').trim()).find((p) => p);
        if (clean) {
            return clean;
        }

        const metaAmount = await this.page.locator('meta[property="product:price:amount"], meta[property="og:price:amount"]').first().getAttribute('content');
        const metaCurrency = await this.page.locator('meta[property="product:price:currency"], meta[property="og:price:currency"]').first().getAttribute('content');
        if (metaAmount) {
            return metaCurrency ? `${metaCurrency} ${metaAmount}` : metaAmount;
        }

        return '';
    }

    async getProductImageSrc() {
        const metaImage = await this.page.locator('meta[property="og:image"]').getAttribute('content');
        if (metaImage) {
            return metaImage.trim();
        }

        const images = this.productImage;
        const count = await images.count();
        for (let i = 0; i < count; i += 1) {
            const img = images.nth(i);
            const src = await img.getAttribute('src');
            const alt = await img.getAttribute('alt');
            const cleanSrc = src ? src.trim() : '';
            const cleanAlt = alt ? alt.trim().toLowerCase() : '';
            if (cleanSrc && !cleanSrc.includes('logo') && cleanAlt.includes('jacket')) {
                return cleanSrc;
            }
        }

        for (let i = 0; i < count; i += 1) {
            const src = await images.nth(i).getAttribute('src');
            const cleanSrc = src ? src.trim() : '';
            if (cleanSrc && !cleanSrc.includes('logo')) {
                return cleanSrc;
            }
        }

        return '';
    }

    async addToCart() {
        await this.addToCartButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.addToCartButton.first().click();
    }

    async getVariantId() {
        const idInput = this.page.locator('form[action*="/cart/add"] input[name="id"]').first();
        if (await idInput.isVisible()) {
            const value = await idInput.getAttribute('value');
            return value ? value.trim() : '';
        }
        return '';
    }
}

module.exports = ProductPage;
