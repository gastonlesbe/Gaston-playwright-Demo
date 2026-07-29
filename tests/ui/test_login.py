import pytest

from config.config import Users
from pages.login_page import LoginPage

pytestmark = pytest.mark.ui


@pytest.mark.smoke
def test_login_successful_standard_user(page):
    username, password = Users.STANDARD
    login = LoginPage(page).open().login(username, password)
    assert login.is_logged_in()


def test_login_wrong_password_shows_error(page):
    username, _ = Users.STANDARD
    login = LoginPage(page).open().login(username, "wrong_password")
    assert not login.is_logged_in()
    assert "do not match" in login.error_message().lower()


def test_login_wrong_username_shows_error(page):
    _, password = Users.STANDARD
    login = LoginPage(page).open().login("wrong_username", password)
    assert not login.is_logged_in()
    assert "do not match" in login.error_message().lower()


def test_login_locked_out_user_shows_error(page):
    username, password = Users.LOCKED_OUT
    login = LoginPage(page).open().login(username, password)
    assert not login.is_logged_in()
    assert "locked out" in login.error_message().lower()


def test_login_empty_username_shows_error(page):
    _, password = Users.STANDARD
    login = LoginPage(page).open().login("", password)
    assert not login.is_logged_in()
    assert "username is required" in login.error_message().lower()
