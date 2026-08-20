# Handoff: Production Next.js on VPS (`baliestate.web.id`)

**Date:** 2026-08-20  
**Audience:** next engineer / future-you  
**Status:** Live. Apache reverse-proxies to Next on `:3000`. Vite `dist/` is no longer the public frontend.

---

## 1. What changed

| Before | After |
|--------|--------|
| Apache `DocumentRoot` → `/var/www/real-estate-frontend/dist` (Vite CSR) | Apache proxies `/` → `http://127.0.0.1:3000` (Next.js) |
| Deploy = `npm run build:vite` → commit `dist/` → `git pull` on VPS | Deploy = build Next **locally** → `rsync .next/` → `pm2 restart` |
| No Node on VPS | Node **22.x** (NodeSource), PM2 runs `next start` |
| `APP_ENV=local` / `APP_DEBUG=true` on Laravel | Fixed to `production` / `false` |

**Why Next on VPS without building there:** VPS CPU lacks x86-64-v2; `sharp` prebuilds fail with `Unsupported CPU: Prebuilt binaries for linux-x64 require v2 microarchitecture`. Local WSL builds succeed; ship `.next` artifact.

---

## 2. Server inventory

| Item | Value |
|------|--------|
| Host | `103.193.179.62` |
| Domain | `baliestate.web.id` (+ `www`) |
| OS | Ubuntu 22.04 (Jammy) |
| Web server | Apache2 (active). Nginx inactive — do not install a second web server |
| DB | MySQL active. No Postgres/MariaDB needed |
| Docker | **Not installed — do not add** on this cheap VPS |
| PHP | 8.4.x CLI; Laravel **12.34** at `/var/www/real-estate-backend` |
| Node | **v22.23.x** via NodeSource (`setup_22.x`) |
| Next (app) | **15.5.23** (Maintenance LTS — keep unless deliberately upgrading to 16.x Active LTS) |
| Process manager | PM2 app name: **`baliestate-next`** |
| RAM | ~3.8 GiB, no swap |
| Frontend path | `/var/www/real-estate-frontend` |
| Backend path | `/var/www/real-estate-backend` |

**Local Node (WSL):** `v22.14.0` — close enough to VPS 22.x.

---

## 3. Repo map

| Path on VPS | Role |
|-------------|------|
| `/var/www/real-estate-frontend` | Next.js app (Pages Router). Also still contains Vite scripts (`dev:vite` / `build:vite`) for legacy |
| `/var/www/real-estate-frontend/.next` | Production build output (synced from local) |
| `/var/www/real-estate-frontend/dist` | Old Vite build — **unused by Apache now**; safe to leave, not the live entry |
| `/var/www/real-estate-backend` | Laravel API + Nova + GraphQL |

Fingerprint files: frontend `package.json` + `next.config.mjs`; backend `artisan` + `composer.json`.

Composer **not** installed globally on VPS; `vendor/` already present. Install Composer only when changing PHP deps on server (prefer build vendor locally).

---

## 4. Apache routing

**Config file:** `/etc/apache2/sites-enabled/real-estate-backend.conf`  
**Backups:** `/root/real-estate-backend.conf.bak.2026-08-20` (pre-Next), `/root/real-estate-backend.conf.bak.2026-08-20-graphql-fix`

**Behavior:**

1. `DocumentRoot` = Laravel `public/`.
2. Next gets traffic via **negative-lookahead** `ProxyPassMatch` (not bare `ProxyPass /path !`).
3. **Must exclude `index.php`** from the Next proxy. Laravel `.htaccess` rewrites `/graphql` → `/index.php`; if `index.php` is proxied, GraphQL/API return Next 404 HTML and SSR falls back to mock/Unsplash.

**Laravel paths kept on Apache/PHP (do not proxy to Next):**

`index.php`, `/api`, `/graphql`, `/graphiql`, `/nova`, `/nova-api`, `/vendor`, `/storage`, `/newsletter`, `/property-submissions`, `/wishlist`, `/compare`, `/up`, `/security`, `/custom-nova-script`

**Modules required:** `proxy`, `proxy_http`, `rewrite`, `php` (`a2enmod`).

**Smoke:** `curl -s -X POST http://127.0.0.1/graphql -H 'Content-Type: application/json' -d '{"query":"{ __typename }"}'` → JSON `{"data":…}`, **not** Homzen 404 HTML. Prefer HTTPS smoke on public origin (see §4b).

**Note:** `/contact` is served by **Next** (page), not Laravel.

**Rollback Apache (emergency):**

```bash
cp /root/real-estate-backend.conf.bak.2026-08-20 /etc/apache2/sites-enabled/real-estate-backend.conf
apache2ctl configtest && systemctl restart apache2
```

---

## 4b. HTTPS / TLS (Let’s Encrypt)

**Status (2026-08-20):** Apex `baliestate.web.id` has Certbot Apache cert. HTTP → HTTPS 301.

| Item | Value |
|------|--------|
| Cert path | `/etc/letsencrypt/live/baliestate.web.id/{fullchain,privkey}.pem` |
| SSL vhost | `/etc/apache2/sites-enabled/real-estate-backend-le-ssl.conf` (Certbot-managed) |
| Expiry (approx) | ~2026-11-18 — renew via `certbot renew` (systemd timer usually enough) |
| `www` | On cert (SAN). Apache **301** `www` → `https://baliestate.web.id%{REQUEST_URI}` (HTTP + HTTPS). Apex is canonical |

**After any Laravel `.env` URL change** (see §6b): `php artisan config:clear` **and** `php artisan cache:clear`. Featured/type-count GraphQL responses are cached ~12h with absolute media URLs baked in — stale `http://` URLs survived `APP_URL` fixes until cache clear.

**Public smoke:**

```bash
curl -s -X POST https://baliestate.web.id/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ __typename }"}'   # JSON, not HTML

curl -s https://baliestate.web.id/ | grep -oE 'rel="canonical"[^>]*>'
# expect https://baliestate.web.id/  — not localhost:5173

curl -s https://baliestate.web.id/ | grep -c 'http://baliestate'   # expect 0
```

**Expand cert to `www` (done 2026-08-20):** cert SAN includes both hosts; Apache redirects `www` → apex. Re-run only if renew drops `www` from the cert:

```bash
certbot --apache -d baliestate.web.id -d www.baliestate.web.id
```

**Redirect check:**

```bash
curl -sI https://www.baliestate.web.id/ | head -5   # 301 → https://baliestate.web.id/
```

---

## 5. Next.js runtime notes

- `next.config.mjs` has `images: { unoptimized: true }` so production is less dependent on `sharp` image optimizer. Do not remove without fixing VPS CPU / sharp story.
- `optimize:hero` / `optimize:bg` use `sharp` — **manual only** (`npm run optimize:hero` when hero/bg assets change). No automatic `prebuild` hook (removed 2026-08-20; fails on VPS CPU).
- Rendering mix (intentional):
  - Most marketing routes: **SSG/ISR** (`getStaticProps`, `revalidate`, `fallback: 'blocking'` on slugs)
  - `/listings`: **SSR** (`getServerSideProps`) for filter/query SEO
  - Auth/dashboard: mostly static shell + client
- **Dual-runtime GraphQL:** browser uses `NEXT_PUBLIC_GRAPHQL_URL=/graphql` (same-origin). SSR prefixes relative URLs with `INTERNAL_BACKEND_ORIGIN` (default `http://127.0.0.1`) in `src/lib/runtime-env.ts`. Do **not** bake `http://127.0.0.1` into a `NEXT_PUBLIC_*` value the browser uses for GraphQL.
- `NEXT_PUBLIC_BACKEND_URL` is for Next rewrites / server fallback only. Browser API base stays empty (same-origin) when `NEXT_PUBLIC_API_URL` is unset.
- `.env.local` **overrides** `.env.production` on `next build`. Always use `npm run build:prod` for VPS artifacts.

---

## 6. Deploy workflow (frontend)

**Do not** rely on `npm run build` on the VPS for Next. **Do not** ship a build made with localhost `.env.local` baked in.

**One command (local):**

```bash
cd ~/WORKS/TEGUH/real-estate-frontend
npm run deploy:vps   # scripts/deploy.sh: build:prod → rsync .next → pm2 restart → smoke
```

Override host/path if needed: `DEPLOY_HOST=user@host DEPLOY_PATH=/var/www/real-estate-frontend npm run deploy:vps`

**Manual steps (same as deploy script):**

```bash
# --- LOCAL (WSL) ---
cd ~/WORKS/TEGUH/real-estate-frontend
npm run build:prod   # forces NEXT_PUBLIC_* production values over .env.local
# sanity: bundle must inline NEXT_PUBLIC_GRAPHQL_URL:"/graphql" (localhost:8080 only as dead fallback string)

rsync -avz --delete \
  .next/ \
  root@103.193.179.62:/var/www/real-estate-frontend/.next/

# if package.json / lock / runtime-env changed: rsync those too or git pull on VPS

# --- VPS ---
ssh root@103.193.179.62
cd /var/www/real-estate-frontend
# ensure only ONE next on :3000 (orphan next-server causes PM2 EADDRINUSE crash-loop)
ss -ltnp | grep 3000
pm2 stop baliestate-next
# if a non-pm2 next still holds the port: kill that pid, then:
pm2 start baliestate-next
pm2 save
curl -I http://127.0.0.1:3000/listings
curl -s -X POST http://127.0.0.1/graphql -H 'Content-Type: application/json' \
  -d '{"query":"{ __typename }"}'   # must be JSON, not Next 404
```

**Manual steps end.**

**Backend** (unchanged pattern):

```bash
cd /var/www/real-estate-backend
git pull
php artisan migrate --force   # if needed
php artisan config:clear      # or config:cache after env edits
php artisan cache:clear       # required after APP_URL / FRONTEND_URL changes (media + SEO absolute URLs)
```

**Git vs rsync:** Source can stay on git pull. Live Next HTML comes from **`.next`**. Committing `dist/` only helped the old Vite path.

**SSG note:** Homepage SEO/media absolute URLs are baked at `build:prod`. After fixing Laravel `APP_URL` / `FRONTEND_URL` / cache, **rebuild + rsync `.next`** or HTML stays stale even when live GraphQL is correct.

---

## 6b. Laravel URL env (SEO + media)

Set on VPS `/var/www/real-estate-backend/.env` (do not paste secrets into chat):

| Key | Role |
|-----|------|
| `APP_URL` | Absolute `/storage/...` media URLs (`PublicMediaUrl`). Must be `https://baliestate.web.id` on production HTTPS |
| `FRONTEND_URL` | Single base for GraphQL `seo.canonicalUrl` / og:url (`config/frontend.php` → `SeoMeta`). **Not** the same as `FRONTEND_URLS` |
| `FRONTEND_URLS` | CORS allowlist (comma-separated). Prefer `https://` origins after TLS |

If `FRONTEND_URL` is missing, SeoMeta falls back to `http://localhost:5173` → bad canonical in HTML until fixed + Next rebuild.

---

## 7. PM2 / process

```bash
pm2 status
pm2 logs baliestate-next
pm2 restart baliestate-next
pm2 save          # after changing process list
# startup already enabled as pm2-root.service (systemd)
```

Only **one** listener on `:3000`. If Restarts climb, check duplicate `next start` / old `nohup`:

```bash
ss -ltnp | grep 3000
pkill -f "next start -p 3000" || true
pm2 restart baliestate-next
```

---

## 8. Smoke checks

```bash
curl -I http://127.0.0.1:3000          # 200 + X-Powered-By: Next.js
curl -I https://baliestate.web.id      # 200 via Apache TLS
curl -s http://127.0.0.1:3000/listings | head -c 400
# expect real <title>/meta, e.g. Properti Disewa | Homzen — not empty SPA shell

pm2 status                             # baliestate-next online, uptime growing
```

Browser: View Page Source on `/listings` and a `/properties/[slug]` URL. Canonical/og must be `https://baliestate.web.id…`, not `localhost:5173`.

---

## 9. Known landmines

1. **`sharp` / CPU microarch** — VPS cannot build Next images pipeline reliably. Build locally.
2. **Ubuntu default `nodejs` (apt without NodeSource)** = Node 12 — wrong. Use NodeSource 22.x.
3. **Do not install Docker/Nginx** “because local uses Docker”.
4. **SSH:** use default key `~/.ssh/id_ed25519` → `ssh root@103.193.179.62`. Wrong `-i` key (e.g. idcloudhost) asks password.
5. **`apt install` / NodeSource** are system-wide; cwd (`/var/www` vs project folder) does not matter for those. `npm ci` / `next build` **must** run inside the project directory.
6. **Laravel `.env`** must stay `APP_ENV=production`, `APP_DEBUG=false`. Never `cat` full `.env` into chat.
7. **Next 15.5.x** is Maintenance LTS (stable). Jumping to 16.x is a major migration, not a patch. Prefer stay until deploy path is boring.
8. **Bake localhost** — `next build` with `.env.local` → GraphQL `localhost:8080` in `.next` → SSR mock + missing/real-broken images. Use `npm run build:prod`.
9. **Apache + `index.php`** — excluding `/graphql` but proxying `/index.php` breaks Laravel routing (symptoms: Next 404 on POST `/graphql`, Unsplash mock on `/listings`).
10. **PM2 EADDRINUSE** — orphan `next-server` on `:3000` → thousands of PM2 restarts. Stop PM2, free the port, start once, `pm2 save`.
11. **Missing `FRONTEND_URL`** — only `FRONTEND_URLS` set → SeoMeta defaults to `http://localhost:5173` for canonical.
12. **Stale Laravel cache** — `properties.featured` etc. keep old `http://` media URLs after `APP_URL` change until `php artisan cache:clear`.
13. **SSG stale HTML** — live GraphQL can be fixed while homepage HTML still shows old SEO/media until `build:prod` + rsync.
14. **`www` without SAN** — apex cert alone: HTTPS on `www` fails certificate name mismatch. After expand, still redirect `www` → apex so one canonical host.
15. **Certbot renew** — may rewrite HTTP vhost `RewriteRule`s; re-check `www` → apex redirect after renew if behavior changes.

---

## 10. Suggested next work (not done)

- [x] Audit `NEXT_PUBLIC_*` / SSR GraphQL (done 2026-08-20: `build:prod`, `runtime-env` dual-runtime, Apache `index.php` exclusion)
- [x] HTTPS apex via Certbot; `APP_URL` / `FRONTEND_URL` / `FRONTEND_URLS` https; cache clear + rebuild for SEO/media
- [x] `www` on cert + 301 redirect to apex (canonical = apex only)
- [x] Optional: archive Vite `dist/` on VPS; ignore + untrack `dist/` in frontend git (do not rely on Vite `dist/` for deploy)
- [x] Fix or drop VPS `prebuild` sharp scripts; keep optimize on CI/local only (prebuild hook removed; optimize:* manual)
- [x] One-command deploy: `npm run deploy:vps` → `scripts/deploy.sh`

---

## 11. One-line architecture

`Browser → Apache:80/443 → (Laravel paths → PHP public/) | (else → PM2 Next :3000 serving synced .next)`
