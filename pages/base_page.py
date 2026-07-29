from playwright.sync_api import Page

from config.config import Config
from locators.base_locators import BaseLocators


class BasePage:
    def __init__(self, page: Page):
        self.page = page
        self.base_url = Config.BASE_URL

    def goto(self, path: str = "/"):
        self.page.goto(f"{self.base_url}{path}")

    def click(self, selector: str):
        self.page.click(selector)

    def fill(self, selector: str, value: str):
        self.page.fill(selector, value)

    def text_of(self, selector: str) -> str:
        return self.page.inner_text(selector)

    def is_visible(self, selector: str) -> bool:
        return self.page.is_visible(selector)

    def cart_badge_count(self) -> int:
        if self.is_visible(BaseLocators.CART_BADGE):
            return int(self.text_of(BaseLocators.CART_BADGE))
        return 0
