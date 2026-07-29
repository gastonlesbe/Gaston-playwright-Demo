from locators.inventory_locators import InventoryLocators
from pages.base_page import BasePage


class InventoryPage(BasePage):
    def open(self):
        self.goto("/inventory.html")
        return self

    def item_names(self) -> list[str]:
        return self.page.locator(InventoryLocators.ITEM_NAME).all_inner_texts()

    def item_prices(self) -> list[float]:
        texts = self.page.locator(InventoryLocators.ITEM_PRICE).all_inner_texts()
        return [float(text.replace("$", "")) for text in texts]

    def first_item_name(self) -> str:
        return self.page.locator(InventoryLocators.ITEM_NAME).first.inner_text()

    def first_item_price(self) -> str:
        return self.page.locator(InventoryLocators.ITEM_PRICE).first.inner_text()

    def open_first_item(self):
        self.page.locator(InventoryLocators.ITEM_NAME).first.click()
        return self

    def sort_by(self, option_value: str):
        self.page.select_option(InventoryLocators.SORT_DROPDOWN, option_value)
        return self

    def add_item_to_cart_by_name(self, name: str):
        item = self.page.locator(InventoryLocators.ITEM).filter(has_text=name)
        item.locator(InventoryLocators.ADD_TO_CART_BUTTON).click()
        return self

    def go_to_cart(self):
        self.click(InventoryLocators.CART_LINK)
        return self
