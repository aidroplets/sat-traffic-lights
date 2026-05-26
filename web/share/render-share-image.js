/**
 * Render share/og-image.svg → share/og-image.png + share/twitter-card.png.
 *
 * Run:
 *   node render-share-image.js
 *
 * Why a separate render step (vs. ship the SVG directly):
 *   Slack, iMessage, Twitter, LinkedIn, Discord, and Notion all want
 *   a real PNG for unfurls. SVG support in unfurl pipelines is patchy
 *   and at best inconsistent — PNG is the safe lowest-common-denominator.
 *   We ship the SVG too as the source-of-truth for future edits.
 */
'use strict';
const fs   = require('node:fs');
const path = require('node:path');
const sharp = require('/tmp/node_modules/sharp');

const SRC = path.resolve(__dirname, 'og-image.svg');
const OUT_OG = path.resolve(__dirname, 'og-image.png');
const OUT_TW = path.resolve(__dirname, 'twitter-card.png');

(async () => {
  const svg = fs.readFileSync(SRC);
  const png = await sharp(svg, { density: 144 })
    .resize(1200, 630, { fit: 'fill' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  fs.writeFileSync(OUT_OG, png);
  // Twitter expects the same 1200×630 ratio for summary_large_image —
  // ship an identical PNG under the twitter filename so the tag in
  // index.html keeps resolving.
  fs.writeFileSync(OUT_TW, png);
  console.log('wrote', OUT_OG, '(' + png.length + ' bytes)');
  console.log('wrote', OUT_TW, '(' + png.length + ' bytes)');
})();
