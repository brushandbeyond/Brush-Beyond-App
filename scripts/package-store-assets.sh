#!/bin/bash
set -euo pipefail
for group in iphone-medium ipad-13; do
  mkdir -p "release/app-store/upload-screenshots/$group"
  for source in "release/app-store/screenshots/$group/"*.png; do
    name="$(basename "$source" .png)"
    sips -s format jpeg -s formatOptions best "$source" --out "release/app-store/upload-screenshots/$group/$name.jpg" >/dev/null
  done
done
ditto -c -k --norsrc --keepParent release/app-store release/Brush-Beyond-App-Store-Pack.zip
