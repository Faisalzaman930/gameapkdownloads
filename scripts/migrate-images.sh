#!/usr/bin/env bash
# Downloads all competitor-hosted game images into public/screenshots/
# and rewrites games.ts to use local paths.

set -euo pipefail

GAMES_TS="lib/games.ts"
SCREENSHOTS_DIR="public/screenshots"
BASE_URL="/screenshots"

# Domains to keep as-is (official game sites / neutral CDNs)
KEEP_DOMAINS="s3.cdnpk688.com|bcgame-download.net|666-wgame.com.pk|naya.com.pk"

mkdir -p "$SCREENSHOTS_DIR"

# Collect all unique image URLs that should be migrated
URLS=$(grep -oE 'https://[^"]+\.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP)' "$GAMES_TS" | sort -u | grep -vE "$KEEP_DOMAINS")

TOTAL=$(echo "$URLS" | wc -l | tr -d ' ')
echo "Migrating $TOTAL images..."

COUNT=0
FAILED=0

while IFS= read -r url; do
  COUNT=$((COUNT + 1))

  # Derive a filename: take the last path segment, sanitise it
  filename=$(basename "$url" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9._-]/-/g')

  dest="$SCREENSHOTS_DIR/$filename"
  local_path="$BASE_URL/$filename"

  # Skip if already downloaded
  if [ -f "$dest" ]; then
    echo "[$COUNT/$TOTAL] EXISTS  $filename"
  else
    echo -n "[$COUNT/$TOTAL] DOWNLOAD $filename ... "
    if curl -fsSL --max-time 20 --retry 2 -o "$dest" "$url" 2>/dev/null; then
      echo "OK"
    else
      echo "FAILED"
      FAILED=$((FAILED + 1))
      # Remove empty/partial file
      rm -f "$dest"
      continue
    fi
  fi

  # Replace the URL in games.ts (escape special chars for sed)
  escaped_url=$(printf '%s\n' "$url" | sed 's/[[\.*^$()+?{|]/\\&/g')
  escaped_local=$(printf '%s\n' "$local_path" | sed 's/[[\.*^$()+?{|]/\\&/g')
  sed -i '' "s|$url|$local_path|g" "$GAMES_TS"

done <<< "$URLS"

echo ""
echo "Done. $((COUNT - FAILED)) migrated, $FAILED failed."
echo "Check lib/games.ts — any remaining https:// image URLs are either kept domains or failed downloads."
