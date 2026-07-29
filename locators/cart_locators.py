from locators.base_locators import BaseLocators


class CartLocators(BaseLocators):
    ITEM = ".cart_item"
    ITEM_NAME = ".cart_item .inventory_item_name"
    REMOVE_BUTTON = 'button[data-test^="remove"]'
    CHECKOUT_BUTTON = '[data-test="checkout"]'
