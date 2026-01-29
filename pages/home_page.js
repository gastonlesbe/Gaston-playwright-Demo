const {
    FIRST_PRODUCT_LINK,
    FIRST_PRODUCT_NAME,
    FIRST_PRODUCT_PRICE,
    FIRST_PRODUCT_IMAGE
} = require('../locators/home_page_locators');

class HomePage {
    constructor(page) {
        this.page = page;
        this.firstProductLink = page.locator(FIRST_PRODUCT_LINK);
        this.firstProductName = page.locator(FIRST_PRODUCT_NAME);
        this.firstProductPrice = page.locator(FIRST_PRODUCT_PRICE);
        this.firstProductImage = page.locator(FIRST_PRODUCT_IMAGE);
    }

    async goto() {
        await this.page.goto('https://sauce-demo.myshopify.com');
    }

    async getFirstProductName() {
        const name = await this.firstProductName.textContent();
        return name ? name.trim() : '';
    }

    async getFirstProductPrice() {
        const price = await this.firstProductPrice.textContent();
        return price ? price.trim() : '';
    }

    async getFirstProductImageSrc() {
        const src = await this.firstProductImage.getAttribute('src');
        return src ? src.trim() : '';
    }

    async clickFirstProduct() {
        await this.firstProductLink.click();
    }
}

module.exports = HomePage;
