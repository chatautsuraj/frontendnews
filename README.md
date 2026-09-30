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

- `NEWS_API_BASE_URL` — `https://newsportalapi.ekaartech.com/v1`
- `NEWS_TENANT_HOST` — `thenagarik.com`
- `NEWS_PORTAL_KEY` — portal public key for this tenant

Swagger (dev): https://newsportalapi.ekaartech.com/api  
Frontend uses **public routes only** under `/v1/public/*`.
