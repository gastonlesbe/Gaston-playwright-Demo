import os


class Config:
    BASE_URL = os.getenv("BASE_URL", "https://www.saucedemo.com")


class Users:
    """saucedemo.com's public, well-known test accounts (password is the same
    for all of them). Safe to hardcode — there's nothing secret about them."""

    STANDARD = ("standard_user", "secret_sauce")
    LOCKED_OUT = ("locked_out_user", "secret_sauce")
    PROBLEM = ("problem_user", "secret_sauce")
    PERFORMANCE_GLITCH = ("performance_glitch_user", "secret_sauce")
