from locators.cart_locators import CartLocators
from pages.base_page import BasePage


class CartPage(BasePage):
    def open(self):
        self.goto("/cart.html")
        return self

    def item_count(self) -> int:
        return self.page.locator(CartLocators.ITEM).count()

    def item_names(self) -> list[str]:
        return self.page.locator(CartLocators.ITEM_NAME).all_inner_texts()

    def remove_item_by_name(self, name: str):
        item = self.page.locator(CartLocators.ITEM).filter(has_text=name)
        item.locator(CartLocators.REMOVE_BUTTON).click()
        return self

    def checkout(self):
        self.click(CartLocators.CHECKOUT_BUTTON)
        return self
