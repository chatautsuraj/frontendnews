# The Nagarik Frontend

Kalopati-inspired public news UI for **The Nagarik** / **द नागरिक** (`thenagarik.com`).

## Setup

```bash
cp .env.example .env.local
# Put the portal public key for thenagarik.com into NEWS_PORTAL_KEY
npm install
npm run dev
```

## Notes

- Without a valid `NEWS_PORTAL_KEY`, pages use mock content.
- Media is proxied via `/api/media/[id]` using the portal key server-side.
