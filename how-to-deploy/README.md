# Cara deploy setelah ubah kode di lokal

**Site:** https://baliestate.web.id  
**Update:** 2026-08-20  

Ada **dua repo**. Deploy-nya **beda**. Jangan campur.

| Repo lokal | Path VPS | Cara publish |
|------------|----------|--------------|
| `~/WORKS/TEGUH/real-estate-frontend` | `/var/www/real-estate-frontend` | Build lokal → `rsync .next/` → `pm2 restart` |
| `~/WORKS/TEGUH/real-estate-backend` | `/var/www/real-estate-backend` | `git pull` (+ migrate / cache clear kalau perlu) |

Detail panjang frontend: `real-estate-frontend/docs/VPS-NEXT-HANDOFF.md`.

---

## Keputusan cepat: aku ubah apa?

| Perubahan | Deploy apa |
|-----------|------------|
| UI / halaman Next / `src/**` frontend | **Frontend** (`deploy:vps`) |
| `.env.production` / `runtime-env` / `next.config` frontend | **Frontend** (wajib `build:prod`, bukan `next build` biasa) |
| Laravel / GraphQL / Nova / migration | **Backend** |
| Env Laravel (`APP_URL`, `FRONTEND_URL`, dll.) | **Backend** `config:clear` + `cache:clear`, lalu sering **rebuild frontend** (SSG bake URL) |
| Hanya docs / komentar | Tidak perlu deploy production |

---

## 1. Deploy frontend (paling sering)

**Jangan** `npm run build` di VPS (CPU tidak kuat / `sharp`).  
**Jangan** `next build` lokal yang masih kena `.env.local` (`localhost:8080`) — pakai `build:prod`.

### Satu perintah (disarankan)

Di mesin lokal (WSL):

```bash
cd ~/WORKS/TEGUH/real-estate-frontend
npm run deploy:vps
```

Itu menjalankan `scripts/deploy.sh`:

1. `npm run build:prod` (paksa env production)
2. `rsync .next/` → VPS
3. `pm2 restart baliestate-next`
4. Smoke `https://baliestate.web.id/`

Kalau smoke sempat **503**: biasanya Next belum siap. Tunggu ~10–30 detik, cek lagi:

```bash
curl -sI https://baliestate.web.id/ | head -5
```

Harus **200**.

### Manual (sama isinya)

```bash
cd ~/WORKS/TEGUH/real-estate-frontend
npm run build:prod

rsync -avz --delete \
  .next/ \
  root@103.193.179.62:/var/www/real-estate-frontend/.next/

ssh root@103.193.179.62 'pm2 restart baliestate-next'
```

### Kalau ubah dependency / script yang dipakai runtime

`rsync` hanya `.next/`. Kalau ubah `package.json` / lockfile yang perlu di VPS:

```bash
# lokal: setelah build, sync file sumber yang berubah, lalu di VPS:
ssh root@103.193.179.62
cd /var/www/real-estate-frontend
# git pull ATAU rsync file itu
npm ci --omit=dev   # hanya jika node_modules harus ikut
pm2 restart baliestate-next
```

Untuk perubahan UI biasa, **cukup** `deploy:vps`.

---

## 2. Deploy backend (Laravel)

```bash
# lokal: commit & push dulu (kalau VPS pull dari remote)
cd ~/WORKS/TEGUH/real-estate-backend
# git add / commit / push — sesuai workflow kamu

ssh root@103.193.179.62
cd /var/www/real-estate-backend
git pull
php artisan migrate --force   # hanya jika ada migration baru
php artisan config:clear
php artisan cache:clear       # wajib setelah ubah APP_URL / FRONTEND_URL (cache media ~12 jam)
```

Jangan `cat` full `.env` ke chat.

Env penting production (sudah diset; jangan balik ke localhost):

- `APP_URL=https://baliestate.web.id`
- `FRONTEND_URL=https://baliestate.web.id`
- `FRONTEND_URLS=https://baliestate.web.id,https://www.baliestate.web.id`

Setelah ubah URL env: clear cache **lalu** sering perlu `npm run deploy:vps` di frontend supaya HTML SSG tidak masih `http://` / canonical lama.

---

## 3. SSH & process

```bash
ssh root@103.193.179.62
# pakai key default; jangan -i key salah (bisa minta password)

pm2 status                 # baliestate-next = online
ss -ltnp | grep 3000       # harus SATU next-server
pm2 logs baliestate-next
```

Kalau port 3000 bentrok (orphan):

```bash
pm2 stop baliestate-next
# bunuh proses non-pm2 yang megang :3000 jika ada
pm2 start baliestate-next
pm2 save
```

---

## 4. Smoke wajib setelah deploy

```bash
curl -sI https://baliestate.web.id/ | head -5
curl -s -X POST https://baliestate.web.id/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ __typename }"}'
# harus JSON, bukan HTML 404 Next

curl -sI https://www.baliestate.web.id/ | head -5
# harus 301 → https://baliestate.web.id/
```

Browser: View Source homepage — canonical `https://baliestate.web.id…`, **bukan** `localhost:5173`.

---

## 5. Jangan lakukan

1. Build Next di VPS.
2. Deploy hasil `next build` yang bake `.env.local`.
3. Commit / rsync `.env.local` atau secrets.
4. Menganggap `git push` frontend = site update (live HTML = isi `.next` di VPS).
5. Mengandalkan Vite `dist/` — sudah tidak dipakai Apache.
6. Hapus `FRONTEND_URL` di Laravel (fallback canonical jadi `localhost:5173`).

---

## Ringkas satu kalimat

**Ubah frontend → lokal `npm run deploy:vps`. Ubah backend → VPS `git pull` + artisan. Ubah URL/env Laravel → clear cache + sering rebuild frontend.**
