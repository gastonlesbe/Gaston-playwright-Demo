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

    test('test_login_password_field_is_masked_C04', async ({ page }) => {
        const loginPage = new MainLoginPage(page);
        expect(await loginPage.passwordFieldType()).toBe('password');
    });

    test('test_login_username_password_errors_are_indistinguishable_C05', async ({ page }) => {
        // Anti-enumeration check: wrong-password and wrong-username must produce
        // the exact same message, so the app never reveals which field was wrong.
        const loginPage = new MainLoginPage(page);
        await loginPage.login('standard_user', 'wrong_password');
        await loginPage.clickLoginButton();
        const wrongPasswordError = await loginPage.errorMessageText();

        await page.goto('https://www.saucedemo.com');
        await loginPage.login('wrong_username', 'secret_sauce');
        await loginPage.clickLoginButton();
        const wrongUsernameError = await loginPage.errorMessageText();

        expect(wrongPasswordError).toBe(wrongUsernameError);
    });

    test('test_login_locked_out_user_shows_lockout_message_C06', async ({ page }) => {
        const loginPage = new MainLoginPage(page);
        await loginPage.login('locked_out_user', 'secret_sauce');
        await loginPage.clickLoginButton();
        expect(await loginPage.errorMessageText()).toContain('locked out');
    });

    test('test_login_username_field_resists_script_injection_C07', async ({ page }) => {
        const loginPage = new MainLoginPage(page);
        const payload = '"><script>alert(1)</script>';
        const dialogs = await loginPage.captureDialogsDuring(async () => {
            await loginPage.login(payload, 'secret_sauce');
            await loginPage.clickLoginButton();
        });
        expect(dialogs).toEqual([]);
        expect(await loginPage.isLoginSuccessful()).toBeFalsy();
    });

    test('test_login_error_does_not_echo_password_C08', async ({ page }) => {
        // Error responses must never reflect the submitted password back.
        const loginPage = new MainLoginPage(page);
        const secret = 'SuperSecretPass123!';
        await loginPage.login('wrong_username', secret);
        await loginPage.clickLoginButton();
        expect(await loginPage.errorMessageText()).not.toContain(secret);
    });
});