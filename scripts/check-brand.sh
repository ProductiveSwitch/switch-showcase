#!/bin/sh
# De recruitmenttak heet Productive Search (sinds 2026-07-30). De oude naam
# "Productive Hire" mag nergens meer op de site of op posters staan.
# Draait automatisch voor elke build (zie "prebuild" in package.json).
cd "$(dirname "$0")/.."
if grep -rnIi "productive[ -]*hire" app components lib public scripts --exclude=check-brand.sh; then
  echo "FOUT: oude merknaam 'Productive Hire' gevonden. Gebruik 'Productive Search'." >&2
  exit 1
fi
