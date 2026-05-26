#!/usr/bin/env bash
# Vercel build for sat-traffic-lights:
# Bundle web/ into dist/. The SAT app is fully standalone (its own
# CSS, no visual-library dep), so this build is mostly a copy.
#
# One rewrite: the in-repo backlink href="../../../homepage/index.html"
# points at the umbrella site's homepage. That path makes sense in
# the monorepo dev preview (localhost:3000/droplets/...) but breaks
# in a standalone deploy at studysignal.ai. Rewrite it to the
# absolute https://aidroplets.com so the link still works in prod.
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SRC_DIR/dist"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

# Copy with cp+find — Vercel's build image doesn't ship rsync, but
# cp + find are POSIX-baseline. We list everything in SRC_DIR
# (excluding build/meta artifacts) and copy each survivor recursively.
EXCLUDES_REGEX='^(dist|node_modules|\.vercel|\.git|\.DS_Store|vercel\.json|vercel-build\.sh|api|db|package\.json|package-lock\.json)$'

find "$SRC_DIR" -mindepth 1 -maxdepth 1 -print0 \
  | while IFS= read -r -d '' entry; do
      name="$(basename "$entry")"
      if [[ ! "$name" =~ $EXCLUDES_REGEX ]]; then
        cp -R "$entry" "$OUT_DIR/"
      fi
    done

# Strip the dev-only Test button from the prod HTML entirely. The
# button is hidden by attribute and gated by isLocalHost() in JS, but
# its existence in the source could still be spotted via View Source.
# Removing the line keeps prod source clean. Local dev still has it.
DEV_BTN_RE='/btn-dev-test/d'
if [[ "$(uname -s)" == Darwin ]]; then
  sed -i '' "$DEV_BTN_RE" "$OUT_DIR/index.html"
else
  sed -i    "$DEV_BTN_RE" "$OUT_DIR/index.html"
fi

echo "Built sat-traffic-lights → $OUT_DIR"
