import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from config.config import Users
from pages.login_page import LoginPage


@pytest.fixture
def logged_in_page(page):
    username, password = Users.STANDARD
    LoginPage(page).open().login(username, password)
    return page
