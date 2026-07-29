from locators.base_locators import BaseLocators


class ProductLocators(BaseLocators):
    NAME = ".inventory_details_name"
    PRICE = ".inventory_details_price"
    ADD_TO_CART_BUTTON = 'button[data-test^="add-to-cart"]'
    BACK_BUTTON = '[data-test="back-to-products"]'
