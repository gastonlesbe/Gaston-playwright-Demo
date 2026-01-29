# Test Requirements

Use this checklist before running the Playwright tests.

## System
- Node.js installed (LTS recommended)
- npm available in PATH
- Sufficient disk space for Playwright browsers (~1.5–2 GB)
- Internet access to download Playwright browsers on first run

## Project
- Install dependencies: `npm install`
- Install Playwright browsers: `npx playwright install`

## Optional
- If you want headless mode, set in `playwright.config.ts` (use.headless = true)
- If running behind a proxy, set `HTTPS_PROXY` / `HTTP_PROXY` before installing browsers

## Run
- `npm test`
- View report: `npx playwright show-report`
