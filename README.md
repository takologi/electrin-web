# electrin-web2

Fresh Node.js website for the Rincoin wallet, built with **Express + EJS**.

## Why this stack

For your use case (mostly static pages + occasional news/version updates), this is the simplest reliable setup:

- very small dependency set
- no build step required
- content updates via JSON files
- easy to host behind Nginx/Caddy or run directly with Node

## Run locally

1. Install dependencies:
   - `npm install`
2. Start:
   - `npm start`
3. Open:
   - `http://localhost:8080`

If port 8080 is busy:
- `PORT=8090 npm start`

## Update content (no code changes needed)

- Site metadata, feature cards, links:
  - `src/content/site.json`
- Download buttons/signatures/new versions:
  - `src/content/downloads.json`
  - `src/content/site.json` (`latestVersion`)
- News feed:
  - `src/content/news.json`

## Project structure

- `src/server.js` - Express server and routes
- `src/views/index.ejs` - single-page template
- `src/content/*.json` - editable content
- `public/styles/main.css` - styling

## Notes for migration from electrin-web

The legacy project is static HTML + jQuery. In this rewrite:

- navigation remains section-based (`#home`, `#download`, `#community`, `#about`)
- download/news are now data-driven JSON
- visual style is modernized and lightweight

You can gradually replace placeholder links in JSON with real Rincoin wallet release URLs.
