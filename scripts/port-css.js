#!/usr/bin/env node
/* Port the source <style> block into src/app/globals.css, adapted for next/font variables. */
const fs = require('fs');
const SRC = '/home/z/my-project/upload/Pasted Content_1788681231365.txt';
const OUT = '/home/z/my-project/src/app/globals.css';
const raw = fs.readFileSync(SRC, 'utf8').split('\n');

// <style> content is lines 19..719 (1-indexed), minus the closing </style>
let css = raw.slice(19 - 1, 719 - 1).join('\n');

// Route fonts through next/font CSS variables instead of the Google Fonts <link>
css = css.replace(
  /--sans:"Poppins",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;/,
  '--sans:var(--font-poppins),-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;'
);
css = css.replace(
  /--mono:"JetBrains Mono",ui-monospace,monospace;/,
  '--mono:var(--font-jetbrains-mono),ui-monospace,monospace;'
);

if (!css.includes('--font-poppins')) throw new Error('sans font replacement failed');
if (!css.includes('--font-jetbrains-mono')) throw new Error('mono font replacement failed');

const header = `@import "tailwindcss";

/* ============================================================
   Delin B — portfolio design system
   Ported 1:1 from the original static HTML site.
   Fonts are provided by next/font (CSS variables).
   ============================================================ */
`;

fs.writeFileSync(OUT, header + css.trim() + '\n');
console.log('globals.css written:', (header + css).length, 'bytes');
