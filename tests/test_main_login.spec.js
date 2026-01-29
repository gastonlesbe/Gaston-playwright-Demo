const { test, expect } = require('@playwright/test');
const MainLoginPage = require('../pages/main_login_page');

test.describe('TestMainLogin', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('test_login_successful_C01', async ({ page }) => {
        const loginPage = new MainLoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.clickLoginButton();
        expect(await loginPage.isLoginSuccessful()).toBeTruthy();
    });

    test('test_login_wrong_password_C02', async ({ page }) => {
        const loginPage = new MainLoginPage(page);
        await loginPage.login('standard_user', 'wrong_password');
        await loginPage.clickLoginButton();
        expect(await loginPage.loginErrorMessage()).toBeTruthy();
    });

    test('test_login_wrong_username_C03', async ({ page }) => {
        const loginPage = new MainLoginPage(page);
        await loginPage.login('wrong_username', 'secret_sauce');
        await loginPage.clickLoginButton();
        expect(await loginPage.loginErrorMessage()).toBeTruthy();
    });
});