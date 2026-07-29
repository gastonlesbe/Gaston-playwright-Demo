import pytest

from pages.inventory_page import InventoryPage
from pages.product_page import ProductPage

pytestmark = pytest.mark.ui


def test_first_item_detail_matches_listing(logged_in_page):
    inventory = InventoryPage(logged_in_page).open()
    name = inventory.first_item_name()
    price = inventory.first_item_price()

    inventory.open_first_item()

    product = ProductPage(logged_in_page)
    assert product.name() == name
    assert product.price() == price


def test_sort_price_low_to_high(logged_in_page):
    inventory = InventoryPage(logged_in_page).open().sort_by("lohi")
    prices = inventory.item_prices()
    assert prices == sorted(prices)


def test_sort_name_z_to_a(logged_in_page):
    inventory = InventoryPage(logged_in_page).open().sort_by("za")
    names = inventory.item_names()
    assert names == sorted(names, reverse=True)
