#!/usr/bin/env bash
# Local → VPS Next deploy: build:prod, rsync .next/, pm2 restart.
# Run from repo root: npm run deploy:vps  (or bash scripts/deploy.sh)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

HOST="${DEPLOY_HOST:-root@103.193.179.62}"
REMOTE="${DEPLOY_PATH:-/var/www/real-estate-frontend}"
PM2_APP="${PM2_APP:-baliestate-next}"
SITE_URL="${DEPLOY_SMOKE_URL:-https://baliestate.web.id/}"

echo "==> build:prod (local)"
npm run build:prod

echo "==> stop ${PM2_APP} (avoid rsync --delete racing a live server)"
ssh "$HOST" "pm2 stop '$PM2_APP'"

echo "==> rsync .next/ → ${HOST}:${REMOTE}/.next/"
rsync -avz --delete .next/ "${HOST}:${REMOTE}/.next/"

# Favicons live in public/ (not inside .next); keep them in sync without full public/ sync.
if [[ -f public/favicon.ico || -f public/favicon.svg ]]; then
  echo "==> rsync favicons → ${HOST}:${REMOTE}/public/"
  rsync -avz public/favicon.ico public/favicon.svg "${HOST}:${REMOTE}/public/" 2>/dev/null || \
    rsync -avz public/favicon.* "${HOST}:${REMOTE}/public/"
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

echo "Done."
