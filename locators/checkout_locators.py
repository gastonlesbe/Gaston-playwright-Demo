from locators.base_locators import BaseLocators


class CheckoutLocators(BaseLocators):
    FIRST_NAME_INPUT = "#first-name"
    LAST_NAME_INPUT = "#last-name"
    POSTAL_CODE_INPUT = "#postal-code"
    CONTINUE_BUTTON = '[data-test="continue"]'
    ERROR_MESSAGE = '[data-test="error"]'
    SUBTOTAL_LABEL = ".summary_subtotal_label"
    TAX_LABEL = ".summary_tax_label"
    TOTAL_LABEL = ".summary_total_label"
    FINISH_BUTTON = '[data-test="finish"]'
    COMPLETE_HEADER = ".complete-header"
