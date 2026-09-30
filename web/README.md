# The Nagarik Frontend

Kalopati-inspired public news UI for **The Nagarik** / **द नागरिक** (`thenagarik.com`).

## Setup

```bash
cp .env.example .env.local
# NEWS_API_BASE_URL=https://newsportalapi.ekaartech.com/v1
# NEWS_TENANT_HOST=thenagarik.com
# NEWS_PORTAL_KEY=<portal public key>
npm install
npm run dev
```

## Routes

- `/{locale}` — home (`ne` / `en`)
- `/{locale}/{category}` — category feed (e.g. `/en/khel`)
- `/{locale}/{category}/{slug}` — article

`khel` maps to API category slug `sports`.

## API

- Base: `https://newsportalapi.ekaartech.com/v1`
- Docs: https://newsportalapi.ekaartech.com/api
- Public routes only (`/public/*`)
- Media proxy: `/api/media/[id]/full`

## Deploy note

`www.thenagarik.com` currently serves a **different** Payload/Next app (`the-nagarik.vercel.app`), not this repo. Point that domain/Vercel project at **this** frontend for `/en/khel` to hit newsportalapi.
