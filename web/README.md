# The Nagarik Frontend

Kalopati-inspired public news UI for **The Nagarik** / **द नागरिक**.

This app is frontend-only: every category, homepage, and article page loads data from the multi-tenant newsportal API. There is no CMS in this repo.

## Setup

```bash
cp .env.example .env.local
# NEWS_API_BASE_URL=https://newsportalapi.ekaartech.com/v1
# NEWS_TENANT_HOST=thenagarik.com
# NEWS_PORTAL_KEY=<portal public key>
npm install
npm run dev
```

Open `http://localhost:3000/en/khel` — that route calls:

`GET /v1/public/feed?category=sports` with `X-Forwarded-Host` + `X-Portal-Key`.

## Routes

- `/{locale}` — home (`ne` / `en`) via `/public/homepage` (+ `/public/feed` fallback)
- `/{locale}/{category}` — category feed (e.g. `/en/khel`) via `/public/feed`
- `/{locale}/{category}/{slug}` — article via `/public/articles/:slug`

`khel` maps to API category slug `sports`.

## API

- Base: `https://newsportalapi.ekaartech.com/v1`
- Docs: https://newsportalapi.ekaartech.com/api
- Public routes only (`/public/*`)
- Tenant: `X-Forwarded-Host: thenagarik.com`
- Auth: `X-Portal-Key`
- Media proxy: `/api/media/[id]/full`
