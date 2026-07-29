from locators.base_locators import BaseLocators


class InventoryLocators(BaseLocators):
    ITEM = ".inventory_item"
    ITEM_NAME = ".inventory_item_name"
    ITEM_PRICE = ".inventory_item_price"
    ADD_TO_CART_BUTTON = 'button[data-test^="add-to-cart"]'
    SORT_DROPDOWN = '[data-test="product-sort-container"]'
