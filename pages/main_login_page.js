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

    async errorMessageText() {
        return await this.errorMessage.textContent();
    }

    async passwordFieldType() {
        return await this.passwordInput.getAttribute('type');
    }

    async captureDialogsDuring(action) {
        // Runs `action` while capturing any JS dialogs (alert/confirm/prompt) it
        // triggers, auto-dismissing each one. Used to catch reflected-XSS
        // regressions without letting a dialog block the test.
        const messages = [];
        this.page.once('dialog', dialog => {
            messages.push(dialog.message());
            dialog.dismiss();
        });
        await action();
        return messages;
    }
}

module.exports = MainLoginPage;