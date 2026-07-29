# Test Requirements

Use this checklist before running the Playwright tests.

## System
- Python 3.10+ installed
- Sufficient disk space for Playwright browsers (~1.5–2 GB)
- Internet access to download Playwright browsers on first run

## Project
- Create and activate a virtual environment: `python3 -m venv .venv && source .venv/bin/activate`
- Install dependencies: `pip install -r requirements.txt`
- Install Playwright browsers: `playwright install chromium`

## Optional
- Run headed (visible browser): `pytest --headed`
- Run a different browser: `pytest --browser firefox`
- If running behind a proxy, set `HTTPS_PROXY` / `HTTP_PROXY` before installing browsers

## Run
- `pytest`
- Run one file: `pytest tests/ui/test_login.py`
- Run by marker: `pytest -m smoke`
- View report: open `reports/report.html` after a run
