#!/bin/sh
# Render de LinkedIn-poster van een rol naar PNG (2160 x 2700, 4:5).
# Gebruik: scripts/poster.sh <slug> [nl|en] [baseurl]
set -e
SLUG="${1:?slug}"; LANG="${2:-nl}"; BASE="${3:-https://www.productiveswitch.nl}"
OUT="posters/${SLUG}-${LANG}.png"; mkdir -p posters
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1080,1350 --force-device-scale-factor=2 --virtual-time-budget=8000 \
  --screenshot="$OUT" "$BASE/jobs/$SLUG/poster?lang=$LANG" >/dev/null 2>&1
echo "$OUT"
