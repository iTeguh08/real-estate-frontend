# Cara deploy setelah ubah kode di lokal

**Site:** https://baliestate.web.id  
**Update:** 2026-08-21  

**Cursor skill:** `.agents/skills/how-to-deploy/SKILL.md` (`/how-to-deploy`).  
Agent **hanya kasih command** untuk di-copy — **tidak** menjalankan git commit/push atau `deploy:vps`.

Ada **dua repo**. Deploy-nya **beda**. Jangan campur.

| Repo lokal | Path VPS | Cara publish |
|------------|----------|--------------|
| `~/WORKS/TEGUH/real-estate-frontend` | `/var/www/real-estate-frontend` | `git` (backup) → **build lokal** → `rsync .next/` → `pm2 restart` |
| `~/WORKS/TEGUH/real-estate-backend` | `/var/www/real-estate-backend` | `git push` → VPS `git pull` (+ migrate / cache clear kalau perlu) |

Detail panjang frontend: `docs/VPS-NEXT-HANDOFF.md`.

---

## Kenapa terasa lama — dan kenapa bukan “cukup `git pull`”

Keluhan “perubahan kecil tapi `deploy:vps` lama” **valid** (build + rsync puluhan MB lewat uplink rumah/WSL).  
Solusi “kayak dulu: SSH + `git pull` saja” untuk **frontend Next** = **salah target**.

| Dulu (Vite) | Sekarang (Next + PM2) |
|-------------|------------------------|
| Live ≈ `dist/` yang di-commit | Live ≈ **`.next/`** hasil `build:prod` |
| `git pull` di VPS cukup | `git pull` hanya sync source; tanpa ganti `.next`, pengunjung tetap lihat build lama |

Yang memakan waktu biasanya:

1. `build:prod` lokal (wajib — SSG/env production)
2. Upload `.next/` (sering hampir full rebuild; rsync residual tetap besar)
3. `pm2 stop` → sync → `start` (503 sebentar = normal)

**Backend** tetap model cepat: `git pull` + artisan. Jangan campur mental model itu ke frontend.

**Jangan** “percepat” dengan: build Next di VPS, atau `npm run build` lokal yang bake `.env.local`.

### Deploy lewat GitHub Actions (cloud → VPS)

Setelah secret siap, **push ke `master`/`main` = deploy** (atau manual *workflow_dispatch*).

1. Repo frontend → Settings → Secrets and variables → Actions → New secret:  
   `VPS_SSH_PRIVATE_KEY` = private key OpenSSH yang bisa SSH ke VPS.
2. VPS: public key pasangan masuk `/root/.ssh/authorized_keys` (user `root` atau sesuai `DEPLOY_HOST`).
3. Workflow: `.github/workflows/deploy-vps.yml` (`Deploy VPS`) — `npm test` → `build:prod` → `scripts/deploy.sh` dengan `DEPLOY_SKIP_BUILD=1`.
4. Optional variables: `DEPLOY_HOST` (default `root@103.193.179.62`), `DEPLOY_PATH`.

Lokal `npm run deploy:vps` tetap fallback. Workflow **Deploy to GitHub Pages** (Vite) ≠ production `baliestate.web.id`.

---

## 0. Git dulu (wajib sebelum deploy)

Simpan kerjaan di remote **sebelum** (atau tepat sebelum) menyentuh VPS.  
**Frontend:** `git push` **bukan** berarti site sudah update. Live = isi `.next/` di VPS setelah `deploy:vps`.  
**Backend:** `git push` lalu VPS `git pull` = cara publish biasa.

### Pesan commit (manusia; agent hanya usulkan teks)

Jangan pakai pesan generik (`update`, `fix`, `wip`).

1. `git status` — file apa yang berubah  
2. `git diff` (+ staged) — isi perubahan  
3. `git log -5 --oneline` — gaya pesan repo ini  
4. Tulis **1–2 kalimat fokus “kenapa”**, sesuai diff nyata (bukan tebak-tebakan)

Contoh bagus:

- `fix compare: serve Next page; proxy API under /api/compare`
- `add legal pages for terms, privacy, and cookies`

Contoh jelek: `update code`, `deploy`, `fix bug`.

### Aturan agent Cursor (wajib)

Kalau user minta commit / deploy / `@how-to-deploy` / `/how-to-deploy`:

1. Boleh **baca** `git status` / `diff` / `log` (read-only) untuk menyusun pesan commit.  
2. **Jangan** eksekusi `git add`, `git commit`, `git push`, `npm run deploy:vps`, `build:prod`, `rsync`, atau `ssh` publish.  
3. **Serahkan** satu blok command siap tempel — user yang jalankan di terminal.  
4. Setelah itu berhenti; bantu lagi kalau user kirim error.

Jangan commit/deploy “atas nama user” meski user bilang “deploy sekarang”, kecuali mereka mematikan skill ini untuk giliran itu.

### Perintah git (frontend atau backend)

```bash
cd ~/WORKS/TEGUH/real-estate-frontend   # atau real-estate-backend

git status
git diff
git log -5 --oneline

# stage yang relevan saja
git add -A
# atau lebih aman: git add path/ke/file …

git commit -m "$(cat <<'EOF'
Pesan commit singkat dari diff di atas.

EOF
)"

git push -u origin HEAD
```

Cek remote / branch:

```bash
git status -sb
git remote -v
```

---

## Keputusan cepat: aku ubah apa?

| Perubahan | Deploy apa |
|-----------|------------|
| UI / halaman Next / `src/**` frontend | **Frontend** (`deploy:vps`) |
| `.env.production` / `runtime-env` / `next.config` frontend | **Frontend** (wajib `build:prod`, bukan `next build` / `npm run build` biasa) |
| Laravel / GraphQL / Nova / migration | **Backend** |
| Env Laravel (`APP_URL`, `FRONTEND_URL`, dll.) | **Backend** `config:clear` + `cache:clear`, lalu sering **rebuild frontend** (SSG bake URL) |
| Hanya docs / komentar | Commit/push boleh; tidak perlu deploy production |

---

## 1. Deploy frontend (paling sering)

### Build: lokal dulu — ya. VPS — tidak.

| Perintah | Pakai? |
|----------|--------|
| `npm run deploy:vps` | **Ya** (disarankan) — di dalamnya sudah `build:prod` |
| `npm run build:prod` lalu rsync manual | Ya, kalau tidak pakai script |
| `npm run build` / `next build` | **Tidak** untuk production — sering bake `.env.local` (`localhost:8080`) |
| `npm run build` **di VPS** | **Tidak** — CPU / `sharp` tidak kuat |

Urutan aman:

1. Git add → commit (pesan dari diff) → push  
2. `npm run deploy:vps` (build lokal + rsync + pm2)

### Satu perintah deploy (disarankan)

Di mesin lokal (WSL), **setelah** commit/push (atau setidaknya commit lokal):

```bash
cd ~/WORKS/TEGUH/real-estate-frontend
npm run deploy:vps
```

Itu menjalankan `scripts/deploy.sh`:

1. `npm run build:prod` (paksa env production) — **bukan** `npm run build`
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
# lokal
cd ~/WORKS/TEGUH/real-estate-backend
git status && git diff && git log -5 --oneline
git add -A
git commit -m "$(cat <<'EOF'
Pesan dari diff backend (kenapa, bukan daftar file).

EOF
)"
git push -u origin HEAD

# VPS
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
2. Deploy hasil `npm run build` / `next build` yang bake `.env.local`.
3. Commit / rsync `.env.local` atau secrets.
4. Menganggap `git push` frontend = site update (live HTML = isi `.next` di VPS).
5. Mengandalkan Vite `dist/` — sudah tidak dipakai Apache.
6. Hapus `FRONTEND_URL` di Laravel (fallback canonical jadi `localhost:5173`).
7. Commit dengan pesan kosong / generik tanpa baca diff.

---

## Checklist agent (frontend) — print commands, jangan jalankan

```text
[ ] (opsional read-only) status + diff + log → draft pesan commit
[ ] paste blok: git add → commit → push  (USER menjalankan)
[ ] paste: npm run deploy:vps            (USER menjalankan; = build:prod lokal)
[ ] paste smoke curl                     (USER menjalankan)
```

---

## Ringkas satu kalimat

**Agent kasih command; kamu yang jalankan. Git commit/push dulu (pesan dari diff). Frontend live = `deploy:vps` (`build:prod` lokal). Backend = push + VPS `git pull`. Jangan `npm run build` biasa.**
