/* A11y + SEO structural audit across all routes (dev server). */
const BASE = 'http://localhost:3100';

const routes = [
  '/', '/about', '/projects', '/projects/aurora-analytics', '/projects/kessel-commerce',
  '/projects/pulse-health', '/projects/meridian-bank', '/projects/atlas-design-system',
  '/projects/loop-studio', '/skills', '/experience', '/services', '/resume', '/blog',
  '/blog/react-performance-guide', '/blog/nextjs-seo-guide', '/blog/gsap-scroll-patterns',
  '/blog/css-grid-design-tool', '/blog/typescript-strict-after-a-year',
  '/blog/accessible-by-default', '/playground', '/uses', '/testimonials', '/contact',
];

function text(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

let issues = 0;
const results = [];
for (const r of routes) {
  const res = await fetch(BASE + r);
  const html = await res.text();

  const title = text(html, /<title>([^<]*)<\/title>/);
  const desc = text(html, /meta name="description" content="([^"]*)"/);
  const canonical = text(html, /rel="canonical" href="([^"]*)"/);
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  const ldCount = (html.match(/application\/ld\+json/g) || []).length;

  // Heading levels present, in order
  const levels = [...html.matchAll(/<h([1-6])[ >]/g)].map((m) => +m[1]);
  let skip = false;
  let prev = 0;
  for (const l of levels) {
    if (prev && l > prev + 1) skip = true;
    prev = l;
  }

  // Images without alt
  const imgsNoAlt = [...html.matchAll(/<img([^>]*)>/g)].filter((m) => !m[1].includes('alt=')).length;

  // Inputs without labels (id-based)
  const inputIds = [...html.matchAll(/<input[^>]*\sid="([^"]*)"/g)].map((m) => m[1]).filter((id) => id !== 'false');
  const unlabeled = inputIds.filter((id) => !html.includes(`for="${id}"`) && !html.includes(`aria-label="${id}`));

  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);
  if (!title) problems.push('no title');
  if (title && r !== '/' && !title.includes('Delin B')) problems.push('title missing brand');
  if (!desc) problems.push('no description');
  if (r !== '/' && !canonical) problems.push('no canonical');
  if (canonical && canonical !== `https://delinb.dev${r === '/' ? '' : r}`) problems.push(`canonical ${canonical}`);
  if (h1s !== 1) problems.push(`h1 count ${h1s}`);
  if (skip) problems.push('heading skip');
  if (imgsNoAlt) problems.push(`${imgsNoAlt} imgs no alt`);
  if (unlabeled.length) problems.push(`unlabeled inputs: ${unlabeled.join(',')}`);
  if (ldCount < 1) problems.push('no jsonld');

  if (problems.length) issues++;
  results.push(`${problems.length ? '✗' : '✓'} ${r} — h1:${h1s} h:${[...new Set(levels)].join(',')} ld:${ldCount}${problems.length ? ' | ' + problems.join('; ') : ''}`);
}
console.log(results.join('\n'));
console.log(`\n${issues} route(s) with issues of ${routes.length}`);

// Cross-page duplicate title check
const titles = new Map();
for (const r of routes) {
  const res = await fetch(BASE + r);
  const html = await res.text();
  const t = text(html, /<title>([^<]*)<\/title>/);
  if (titles.has(t)) console.log(`DUPLICATE TITLE: ${t} (${titles.get(t)} and ${r})`);
  titles.set(t, r);
}
console.log('duplicate-title check done');
