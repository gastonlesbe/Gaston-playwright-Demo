import pytest
import requests

from config.config import Config

pytestmark = [
    pytest.mark.api,
    pytest.mark.skipif(
        not Config.REQRES_API_KEY,
        reason="REQRES_API_KEY not set — see .env.example",
    ),
]


def test_list_users_returns_200_and_paginated_data(api_client):
    resp = api_client.get("/api/users", params={"page": 1})
    assert resp.status_code == 200

    body = resp.json()
    assert body["page"] == 1
    assert len(body["data"]) == body["per_page"]
    for user in body["data"]:
        assert {"id", "email", "first_name", "last_name"} <= user.keys()


def test_list_users_pagination_returns_distinct_pages(api_client):
    page_one = api_client.get("/api/users", params={"page": 1}).json()
    page_two = api_client.get("/api/users", params={"page": 2}).json()

    ids_page_one = {user["id"] for user in page_one["data"]}
    ids_page_two = {user["id"] for user in page_two["data"]}
    assert ids_page_one.isdisjoint(ids_page_two)


def test_get_single_user_returns_matching_id(api_client):
    resp = api_client.get("/api/users/2")
    assert resp.status_code == 200
    assert resp.json()["data"]["id"] == 2


def test_get_nonexistent_user_returns_404(api_client):
    resp = api_client.get("/api/users/23")
    assert resp.status_code == 404


def test_create_user_returns_201_with_submitted_fields(api_client):
    payload = {"name": "morpheus", "job": "leader"}
    resp = api_client.post("/api/users", json=payload)

    assert resp.status_code == 201
    body = resp.json()
    assert body["name"] == payload["name"]
    assert body["job"] == payload["job"]
    assert "id" in body
    assert "createdAt" in body


def test_update_user_put_returns_200_with_updated_fields(api_client):
    payload = {"name": "morpheus", "job": "zion resident"}
    resp = api_client.put("/api/users/2", json=payload)

    assert resp.status_code == 200
    body = resp.json()
    assert body["job"] == payload["job"]
    assert "updatedAt" in body


def test_partial_update_user_patch_returns_200_with_updated_field(api_client):
    resp = api_client.patch("/api/users/2", json={"job": "zion resident"})

    assert resp.status_code == 200
    body = resp.json()
    assert body["job"] == "zion resident"
    assert "updatedAt" in body


def test_delete_user_returns_204(api_client):
    resp = api_client.delete("/api/users/2")
    assert resp.status_code == 204
    assert resp.text == ""


def test_request_without_api_key_returns_401():
    # Uses POST rather than GET: reqres.in's CDN caches authenticated GET
    # responses without varying the cache key on x-api-key, so a GET can
    # return a stale 200 to an unauthenticated caller once the URL has been
    # warmed by any authenticated request in the suite. POST isn't cached,
    # so it reliably reflects real auth enforcement.
    resp = requests.post(f"{Config.API_BASE_URL}/api/users", json={"name": "x", "job": "y"})
    assert resp.status_code == 401
