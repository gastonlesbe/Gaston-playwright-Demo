import pytest

from pages.cart_page import CartPage
from pages.inventory_page import InventoryPage

pytestmark = pytest.mark.ui


def test_add_single_item_updates_badge_and_cart(logged_in_page):
    inventory = InventoryPage(logged_in_page).open()
    name = inventory.first_item_name()
    inventory.add_item_to_cart_by_name(name)

    assert inventory.cart_badge_count() == 1

    cart = CartPage(logged_in_page).open()
    assert cart.item_count() == 1
    assert name in cart.item_names()


def test_add_multiple_items_updates_badge_count(logged_in_page):
    inventory = InventoryPage(logged_in_page).open()
    names = inventory.item_names()[:2]
    for name in names:
        inventory.add_item_to_cart_by_name(name)

    assert inventory.cart_badge_count() == len(names)


def test_remove_item_from_cart_updates_badge(logged_in_page):
    inventory = InventoryPage(logged_in_page).open()
    name = inventory.first_item_name()
    inventory.add_item_to_cart_by_name(name)

    cart = CartPage(logged_in_page).open()
    cart.remove_item_by_name(name)

    assert cart.item_count() == 0
    assert cart.cart_badge_count() == 0
