const { USERNAME_INPUT, PASSWORD_INPUT, LOGIN_BUTTON, ERROR_MESSAGE } = require('../locators/login_page_locators');

class MainLoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator(USERNAME_INPUT);
        this.passwordInput = page.locator(PASSWORD_INPUT);
        this.loginButton = page.locator(LOGIN_BUTTON);
        this.errorMessage = page.locator(ERROR_MESSAGE);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isLoginSuccessful() {
        return await this.page.locator('[data-test="inventory-container"]').isVisible();
    }

    async loginErrorMessage() {
        return await this.errorMessage.isVisible();
    }
}

module.exports = MainLoginPage;