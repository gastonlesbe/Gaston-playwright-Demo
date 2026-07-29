from locators.product_locators import ProductLocators
from pages.base_page import BasePage


class ProductPage(BasePage):
    def name(self) -> str:
        return self.text_of(ProductLocators.NAME)

    def price(self) -> str:
        return self.text_of(ProductLocators.PRICE)

    def add_to_cart(self):
        self.click(ProductLocators.ADD_TO_CART_BUTTON)
        return self

    def go_back(self):
        self.click(ProductLocators.BACK_BUTTON)
        return self
