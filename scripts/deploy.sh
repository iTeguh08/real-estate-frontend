#!/usr/bin/env bash
# Local or CI → VPS Next deploy: (optional) build:prod, rsync .next/, pm2 restart.
# Run from repo root: npm run deploy:vps  (or bash scripts/deploy.sh)
# CI: set DEPLOY_SKIP_BUILD=1 after the job already ran build:prod.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

HOST="${DEPLOY_HOST:-root@103.193.179.62}"
REMOTE="${DEPLOY_PATH:-/var/www/real-estate-frontend}"
PM2_APP="${PM2_APP:-baliestate-next}"
SITE_URL="${DEPLOY_SMOKE_URL:-https://baliestate.web.id/}"
SKIP_BUILD="${DEPLOY_SKIP_BUILD:-0}"

if [[ "$SKIP_BUILD" != "1" ]]; then
  echo "==> build:prod (local)"
  npm run build:prod
else
  echo "==> skip build (DEPLOY_SKIP_BUILD=1) — expecting .next/ already present"
  if [[ ! -d .next ]]; then
    echo "ERROR: .next/ missing" >&2
    exit 1
  fi
fi

echo "==> stop ${PM2_APP} (avoid rsync --delete racing a live server)"
ssh "$HOST" "pm2 stop '$PM2_APP'"

echo "==> rsync .next/ → ${HOST}:${REMOTE}/.next/"
rsync -avz --delete .next/ "${HOST}:${REMOTE}/.next/"

# Static files in public/ are not inside .next; sync the ones we care about.
# robots.txt / sitemap.xml / llms.txt are Pages routes (not public/) so Apache→Next always serves them.
PUBLIC_FILES=()
for f in \
  public/favicon.ico \
  public/favicon.svg \
  public/apple-touch-icon.png
do
  [[ -f "$f" ]] && PUBLIC_FILES+=("$f")
done
if ((${#PUBLIC_FILES[@]} > 0)); then
  echo "==> rsync public assets → ${HOST}:${REMOTE}/public/"
  rsync -avz "${PUBLIC_FILES[@]}" "${HOST}:${REMOTE}/public/"
fi

echo "==> pm2 start on VPS"
ssh "$HOST" bash -s -- "$PM2_APP" <<'REMOTE'
set -euo pipefail
PM2_APP="$1"
if ss -ltnp 2>/dev/null | grep ':3000' | grep -qv 'pm2'; then
  echo "WARN: orphan listener on :3000 — check with: ss -ltnp | grep 3000" >&2
fi
pm2 start "$PM2_APP"
pm2 save
REMOTE

SITE_ORIGIN="${SITE_URL%/}"

echo "==> smoke ${SITE_URL}"
ok=0
for i in 1 2 3 4 5 6 7 8; do
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 25 "$SITE_URL" || true)"
  echo "  try ${i}: HTTP ${code}"
  if [[ "$code" == "200" ]]; then
    ok=1
    break
  fi
  sleep 3
done
if [[ "$ok" -ne 1 ]]; then
  echo "WARN: smoke did not return 200 yet — check pm2 logs" >&2
fi

for path in /robots.txt /sitemap.xml /llms.txt; do
  code="$(curl -sS -o /dev/null -w '%{http_code}' --max-time 25 "${SITE_ORIGIN}${path}" || true)"
  echo "  smoke ${path}: HTTP ${code}"
  if [[ "$code" != "200" ]]; then
    echo "WARN: ${path} did not return 200 — check Pages SEO routes" >&2
  fi
done

echo "Done."
