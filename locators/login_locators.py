from locators.base_locators import BaseLocators


class LoginLocators(BaseLocators):
    USERNAME_INPUT = "#user-name"
    PASSWORD_INPUT = "#password"
    LOGIN_BUTTON = "#login-button"
    ERROR_MESSAGE = '[data-test="error"]'
    INVENTORY_CONTAINER = '[data-test="inventory-container"]'
