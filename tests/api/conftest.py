import pytest

from api.client import APIClient


@pytest.fixture(scope="session")
def api_client():
    return APIClient()
