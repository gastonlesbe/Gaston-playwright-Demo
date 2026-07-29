import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    BASE_URL = os.getenv("BASE_URL", "https://www.saucedemo.com")
    API_BASE_URL = os.getenv("API_BASE_URL", "https://reqres.in")
    REQRES_API_KEY = os.getenv("REQRES_API_KEY", "")


class Users:
    """saucedemo.com's public, well-known test accounts (password is the same
    for all of them). Safe to hardcode — there's nothing secret about them."""

    STANDARD = ("standard_user", "secret_sauce")
    LOCKED_OUT = ("locked_out_user", "secret_sauce")
    PROBLEM = ("problem_user", "secret_sauce")
    PERFORMANCE_GLITCH = ("performance_glitch_user", "secret_sauce")
