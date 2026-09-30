# The Nagarik frontend

Public news portal frontend for **The Nagarik** (`thenagarik.com`).

## App

```bash
cd web
cp .env.example .env.local   # set NEWS_PORTAL_KEY
npm install
npm run dev
```

## Env

- `NEWS_API_BASE_URL` — default `https://newsportalapi.ekaartech.com`
- `NEWS_TENANT_HOST` — `thenagarik.com`
- `NEWS_PORTAL_KEY` — portal public key for this tenant (required for `/v1/public/*`)
