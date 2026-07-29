import pytest

from pages.cart_page import CartPage
from pages.checkout_page import CheckoutPage
from pages.inventory_page import InventoryPage

pytestmark = pytest.mark.ui


@pytest.fixture
def cart_with_item(logged_in_page):
    inventory = InventoryPage(logged_in_page).open()
    name = inventory.first_item_name()
    inventory.add_item_to_cart_by_name(name)
    CartPage(logged_in_page).open().checkout()
    return logged_in_page


def test_checkout_happy_path_completes_order(cart_with_item):
    checkout = CheckoutPage(cart_with_item)
    checkout.fill_info("Gaston", "Lesbegueris", "1000").continue_to_overview()
    checkout.finish()
    assert checkout.is_order_complete()


def test_checkout_missing_first_name_shows_error(cart_with_item):
    checkout = CheckoutPage(cart_with_item)
    checkout.fill_info("", "Lesbegueris", "1000").continue_to_overview()
    assert "first name" in checkout.error_message().lower()


def test_checkout_missing_postal_code_shows_error(cart_with_item):
    checkout = CheckoutPage(cart_with_item)
    checkout.fill_info("Gaston", "Lesbegueris", "").continue_to_overview()
    assert "postal code" in checkout.error_message().lower()


def test_checkout_totals_add_up(cart_with_item):
    checkout = CheckoutPage(cart_with_item)
    checkout.fill_info("Gaston", "Lesbegueris", "1000").continue_to_overview()
    assert round(checkout.subtotal() + checkout.tax(), 2) == round(checkout.total(), 2)
