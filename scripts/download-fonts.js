#!/usr/bin/env node
/**
 * Downloads the exact latin-subset woff2 files for Poppins (300,400,500,600)
 * and JetBrains Mono (400,500) from Google Fonts, so the project can switch
 * from next/font/google (requires build-time network access) to
 * next/font/local (fully offline, deterministic builds).
 *
 * Usage: node scripts/download-fonts.js
 */
const fs = require('fs');
const path = require('path');

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FAMILIES = [
  {
    family: 'Poppins',
    weights: [300, 400, 500, 600],
    cssUrl:
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
  },
  {
    family: 'JetBrains Mono',
    weights: [400, 500],
    cssUrl:
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
  },
];

const OUT_DIR = path.join(__dirname, '..', 'src', 'app', 'fonts');

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/** Parse @font-face blocks from Google Fonts CSS, keep only the latin subset. */
function parseLatinFontFaces(css) {
  const faces = [];
  // Blocks look like:
  // /* latin */
  // @font-face { font-family: 'Poppins'; font-style: normal; font-weight: 300;
  //   font-display: swap; src: url(https://fonts.gstatic.com/...woff2) format('woff2');
  //   unicode-range: U+0000-00FF, ...; }
  const blockRe = /\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;
  let m;
  while ((m = blockRe.exec(css)) !== null) {
    const subset = m[1];
    const body = m[2];
    if (subset !== 'latin') continue;
    const weight = body.match(/font-weight:\s*(\d+)/)?.[1];
    const url = body.match(/src:\s*url\((https:[^)]+\.woff2)\)/)?.[1];
    if (weight && url) faces.push({ weight, url });
  }
  return faces;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const manifest = [];

  for (const fam of FAMILIES) {
    const css = await fetchText(fam.cssUrl);
    const faces = parseLatinFontFaces(css);
    if (faces.length !== fam.weights.length) {
      throw new Error(
        `${fam.family}: expected ${fam.weights.length} latin faces, parsed ${faces.length}`
      );
    }
    for (const face of faces) {
      const slug = fam.family.toLowerCase().replace(/\s+/g, '-');
      const file = `${slug}-latin-${face.weight}-normal.woff2`;
      const res = await fetch(face.url, { headers: { 'User-Agent': UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${face.url}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) throw new Error(`Suspiciously small file: ${file}`);
      const dest = path.join(OUT_DIR, file);
      fs.writeFileSync(dest, buf);
      manifest.push({ family: fam.family, weight: face.weight, file, bytes: buf.length });
      console.log(`✓ ${fam.family} ${face.weight} -> src/app/fonts/${file} (${buf.length} bytes)`);
    }
  }

  // Verification: expected exact set of files
  const expected = manifest.map((f) => f.file).sort();
  const actual = fs.readdirSync(OUT_DIR).sort();
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    throw new Error(`Directory mismatch.\nExpected: ${expected.join(', ')}\nActual: ${actual.join(', ')}`);
  }
  console.log('\nAll fonts downloaded and verified. Manifest:');
  for (const f of manifest) console.log(`  ${f.family} ${f.weight}w -> ${f.file} (${f.bytes} B)`);
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
