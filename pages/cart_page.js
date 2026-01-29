const { CART_ITEM_TITLE, CART_ITEM_PRICE, CART_ITEM_QTY, CART_EMPTY_TEXT } = require('../locators/cart_page_locators');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItemTitle = page.locator(CART_ITEM_TITLE).first();
        this.cartItemPrice = page.locator(CART_ITEM_PRICE).first();
        this.cartItemQty = page.locator(CART_ITEM_QTY).first();
        this.cartEmptyText = page.locator(CART_EMPTY_TEXT).first();
    }

    async goto() {
        await this.page.goto('https://sauce-demo.myshopify.com/cart');
    }

    async waitForCartState() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(500);
    }

    async getCartItemName() {
        await this.waitForCartState();
        if (await this.cartEmptyText.isVisible()) {
            return '';
        }
        if (await this.cartItemTitle.isVisible()) {
            const name = await this.cartItemTitle.innerText();
            return name ? name.trim() : '';
        }
        const fallbackLink = this.page.locator('a[href*="/products/"]').first();
        if (await fallbackLink.isVisible()) {
            const name = await fallbackLink.innerText();
            return name ? name.trim() : '';
        }
        return '';
    }

    async getCartItemPrice() {
        await this.waitForCartState();
        if (await this.cartEmptyText.isVisible()) {
            return '';
        }
        if (await this.cartItemPrice.isVisible()) {
            const price = await this.cartItemPrice.innerText();
            return price ? price.trim() : '';
        }
        return '';
    }

    async getCartItemQty() {
        await this.waitForCartState();
        if (await this.cartEmptyText.isVisible()) {
            return '';
        }
        if (await this.cartItemQty.isVisible()) {
            const value = await this.cartItemQty.getAttribute('value');
            return value ? value.trim() : '';
        }
        return '1';
    }

    async getCartData() {
        const response = await this.page.request.get('https://sauce-demo.myshopify.com/cart.js');
        if (!response.ok()) {
            return null;
        }
        return response.json();
    }
}

module.exports = CartPage;
