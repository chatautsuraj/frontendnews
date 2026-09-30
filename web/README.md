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

## API

- Base: `https://newsportalapi.ekaartech.com/v1`
- Docs: https://newsportalapi.ekaartech.com/api
- Used routes (public only):
  - `GET /public/categories`
  - `GET /public/homepage`
  - `GET /public/feed`
  - `GET /public/articles/{slug}`
  - `GET /public/breaking`
  - `GET /public/ads`
  - `GET /public/media/{id}`
  - `GET /public/ads/{id}/image`
  - `POST /public/articles/{slug}/views`

Media/ads are proxied via `/api/media/[id]` and `/api/ads/[id]/image`.
