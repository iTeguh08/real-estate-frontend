# Homzen Real Estate — Frontend

React SPA for Homzen listings, agents, articles, and member/agent dashboards. Talks to the Laravel backend via GraphQL (reads) and Sanctum REST (auth + agent listings + guest forms).

## Stack

- React 19 + TypeScript + Vite 8
- Tailwind 4 + Homzen `hz-*` design tokens (light / navy themes)
- TanStack Query, React Router 7
- React Hook Form + Zod (login / register / contact)
- Sentry (`@sentry/react`) — enabled only when `VITE_SENTRY_DSN` is set
- Vitest unit tests

## Local development

Requires the backend Sail stack on `:8080` (see `real-estate-backend`).

```bash
cp .env.example .env
npm ci
npm run dev
```

App: `http://localhost:5173`  
Vite proxies `/api`, `/graphql`, guest forms, wishlist/compare to `localhost:8080`.

### Important env

| Variable | Notes |
|----------|--------|
| `VITE_USE_MOCK` | Must be `false` to hit the live API (default in `.env.example`) |
| `VITE_GRAPHQL_URL` | Dev: `http://localhost:8080/graphql` · Prod: `/graphql` or API host |
| `VITE_API_URL` | Leave empty in dev (proxy). Set API origin in production if cross-origin |
| `VITE_SENTRY_DSN` | Optional. Empty = no-op locally |

## Scripts

```bash
npm run dev          # Vite HMR
npm test             # Vitest
npm run lint         # ESLint (some legacy rule debt remains)
npm run build        # optimize assets + typecheck + production bundle
npm run preview      # preview dist/
```

## Auth-protected routes

`/dashboard` and `/dashboard/my-property/*` are wrapped in a route guard. Guests are redirected to `/login`.

## Deploy

GitHub Actions:

- `ci.yml` — unit tests + production build on PR/push
- `deploy.yml` — tests, then GitHub Pages from `dist/`

Set production secrets/env for `VITE_SENTRY_DSN` (and API URLs) on the host or CI build environment — do not commit real DSNs.

## Design system

See `.cursorrules` for Homzen typography, color tokens, iconography, and dual-theme rules.
