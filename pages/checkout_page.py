from locators.checkout_locators import CheckoutLocators
from pages.base_page import BasePage


class CheckoutPage(BasePage):
    def fill_info(self, first_name: str, last_name: str, postal_code: str):
        self.fill(CheckoutLocators.FIRST_NAME_INPUT, first_name)
        self.fill(CheckoutLocators.LAST_NAME_INPUT, last_name)
        self.fill(CheckoutLocators.POSTAL_CODE_INPUT, postal_code)
        return self

    def continue_to_overview(self):
        self.click(CheckoutLocators.CONTINUE_BUTTON)
        return self

    def error_message(self) -> str:
        return self.text_of(CheckoutLocators.ERROR_MESSAGE)

    def subtotal(self) -> float:
        return self._dollar_amount(CheckoutLocators.SUBTOTAL_LABEL)

    def tax(self) -> float:
        return self._dollar_amount(CheckoutLocators.TAX_LABEL)

    def total(self) -> float:
        return self._dollar_amount(CheckoutLocators.TOTAL_LABEL)

    def finish(self):
        self.click(CheckoutLocators.FINISH_BUTTON)
        return self

    def is_order_complete(self) -> bool:
        return self.is_visible(CheckoutLocators.COMPLETE_HEADER)

    def _dollar_amount(self, selector: str) -> float:
        return float(self.text_of(selector).split("$")[-1])
