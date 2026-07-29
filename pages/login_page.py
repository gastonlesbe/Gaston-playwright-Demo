from locators.login_locators import LoginLocators
from pages.base_page import BasePage


class LoginPage(BasePage):
    def open(self):
        self.goto("/")
        return self

    def login(self, username: str, password: str):
        self.fill(LoginLocators.USERNAME_INPUT, username)
        self.fill(LoginLocators.PASSWORD_INPUT, password)
        self.click(LoginLocators.LOGIN_BUTTON)
        return self

    def is_logged_in(self) -> bool:
        return self.is_visible(LoginLocators.INVENTORY_CONTAINER)

    def error_message(self) -> str:
        return self.text_of(LoginLocators.ERROR_MESSAGE)
