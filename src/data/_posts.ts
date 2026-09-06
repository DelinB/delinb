import type { Post } from './types';

export const POSTS: Post[] = [
{
  slug:'react-performance-guide', title:'A practical guide to React performance', cat:'React', cats:['React','Performance'],
  date:'2025-06-18', updated:'2025-07-02', read:'12 min', seed:'db-post-react', pop:'4.6k reads',
  excerpt:'Most React performance advice is cargo cult. Here is the process I use instead: measure, suspect the render list, and only then reach for the tools.',
  takeaways:[
    'Instrument before optimizing — assumptions are usually wrong',
    'memo is a boundary tool; stable props beat wrapped hooks',
    'Virtualize lists past ~200 rows',
    'Field data (RUM, p75) is the only scoreboard that pays'
  ],
  cmts:[
    {n:'Karthik M.', r:'Frontend dev · 2y in', x:'“Instrument before optimizing” saved my team a sprint. We found a waterfall three fetches deep that nobody suspected.'},
    {n:'Elena V.', r:'Tech lead', x:'The virtualization numbers match what we saw — though I’d add: fixed row heights make the math trivial, variable ones don’t. Budget for it.'}
  ],
  blocks:[
    {t:'h2', h:'Start with a profile, not a hunch'},
    {t:'p', x:'Every performance problem I have been asked to “just add memo everywhere” on turned out to be something else: a waterfall of sequential fetches, a list rendering 2,000 unvirtualized rows, or an image serving 3MB to a phone. React.memo would have hidden the symptom and priced it in permanently — every wrapped component is one more thing to keep correct.'},
    {t:'p', x:'So the first pull request on any performance task is instrumentation: the Performance panel, why-did-you-render on one screen, and a RUM baseline if it exists.'},
    {t:'code', lang:'js', x:`// Measure a suspicion before treating it — one screen, one trace
function ProfileRender({ id }) {
  const start = performance.now();
  useEffect(() => {
    console.log('[render] ' + id + ': ' + (performance.now() - start) + 'ms');
  });
  return null;
}`},
    {t:'quote', x:'Fast is a feature you ship, not an optimization you bolt on.', by:'Working note, 2023'},
    {t:'h2', h:'The usual suspects'},
    {t:'p', x:'In roughly the order I check them:'},
    {t:'ul', items:[
      'Render volume — a parent re-rendering a large child tree over state that concerns one leaf',
      'List rendering — unvirtualized lists past ~200 rows',
      'Waterfalls — data dependencies resolved sequentially that could resolve together',
      'Media — unoptimized images and fonts, the two heaviest bytes on most pages',
      'Bundle — one entry chunk where there could be four routes']},
    {t:'h2', h:'Memoize the boundary, not everything'},
    {t:'p', x:'memo, useMemo and useCallback are boundary tools. They buy nothing at leaf level and cost comparisons everywhere. I wrap the expensive component and pass it stable props — which usually means lifting state down, not data up.'},
    {t:'code', lang:'jsx', x:`// One memoized boundary instead of twenty sprinkled hooks
const Row = memo(function Row({ item, onSelect }) {
  return (
    <li>
      <button onClick={() => onSelect(item.id)}>{item.label}</button>
    </li>
  );
});`},
    {t:'p', x:'Note what is absent: no useCallback inside children, no context in the subtree. The boundary works because props are stable by construction, not by memoization.'},
    {t:'h2', h:'Virtualize the long lists'},
    {t:'p', x:'Past a few hundred rows, render only what is visible. The technique is old — your operating system has done it since the nineties — and React makes it boring. Boring is good.'},
    {t:'code', lang:'jsx', x:`const [range, setRange] = useState({ start: 0, end: 30 });

// onScroll: recompute the visible window, keep 5 rows of overscan
items
  .slice(range.start, range.end)
  .map((item) => <Row key={item.id} item={item} />)`},
    {t:'img', seed:'db-post-react-1', alt:'Profiling a React app in the browser', cap:'One afternoon of profiling beats a week of guessing.'},
    {t:'diagram', nodes:['Profile','Suspect list','Fix ship','Field verify','Stop'], cap:'The loop that replaces guesswork — exit only on field data.'},
    {t:'h2', h:'Measure the right thing'},
    {t:'p', x:'Lab numbers flatter you; field numbers pay you. Lighthouse says 99 while the p75 LCP of real users on mid-tier Android says 3.4 seconds. Both are true. Only one matters.'},
    {t:'table', head:['Metric · p75', 'Before', 'After'], rows:[
      ['LCP','4.1s','1.3s'],['INP','320ms','70ms'],
      ['JS shipped','690KB','210KB'],['Transferred','2.4MB','640KB']]},
    {t:'h2', h:'What I actually do, in order'},
    {t:'ul', items:[
      'Profile one real user flow',
      'Fix waterfalls and media first — they are free wins',
      'Push state down; restructure before memoizing',
      'Virtualize lists over 200 rows',
      'Re-measure in the field, then stop']}
  ]
},
{
  slug:'nextjs-seo-guide', title:'Next.js SEO: from metadata to structured data', cat:'Next.js', cats:['Next.js','SEO'],
  date:'2025-05-30', read:'9 min', seed:'db-post-next', pop:'3.1k reads',
  excerpt:'Titles and sitemaps are table stakes. The compounding traffic comes from structured data, answer-ready markup and Core Web Vitals.',
  takeaways:['The Metadata API is the floor — structured data is the compounding part','Answer engines cite pages whose meaning is machine-readable','Core Web Vitals are the ranking input you fully control'],
  blocks:[
    {t:'h2', h:'Metadata is the floor, not the house'},
    {t:'p', x:'Next.js makes the basics effortless, and that is exactly the trap. Titles, descriptions and Open Graph get filled in, the checklist feels complete, and the compounding work never ships.'},
    {t:'code', lang:'js', x:`export const metadata = {
  title: { default: 'Delin B — Frontend Developer', template: '%s — Delin B' },
  description: 'Fast, accessible, precisely-crafted interfaces.',
  openGraph: { type: 'website', siteName: 'Delin B' }
};`},
    {t:'h2', h:'Structured data earns the snippets'},
    {t:'p', x:'Answer engines and rich results do not guess — JSON-LD tells them what a page is. Articles get Article, products get Product, FAQs get FAQPage. This is now SEO and AEO in the same motion.'},
    {t:'code', lang:'jsx', x:`// app/articles/[slug]/page.tsx
export default function Article({ params }) {
  const post = getPost(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <JsonLd type="Article" data={post} />
    </article>
  );
}`},
    {t:'diagram', nodes:['Crawler','Metadata','JSON-LD','Index','SERP / AEO'], cap:'How a page becomes an answer, not just a result.'},
    {t:'h2', h:'Core Web Vitals are the input you control'},
    {t:'ul', items:[
      'LCP — preload the hero, serve AVIF/WebP with fallbacks',
      'INP — long tasks off the main thread, workers for heavy transforms',
      'CLS — explicit dimensions on every media element, reserved space for embeds']},
    {t:'h2', h:'The unglamorous twenty percent'},
    {t:'ul', items:[
      'Semantic HTML before any framework feature',
      'sitemap.ts and robots.ts, generated from real data',
      'Canonical URLs on every paginated and filtered route',
      'hreflang when localized — always both directions']},
    {t:'quote', x:'The best SEO strategy is a page a machine can understand and a human wants to stay on.', by:'Working note'}
  ]
},
{
  slug:'gsap-scroll-patterns', title:'Scroll animations with GSAP: the patterns I reuse', cat:'Animation', cats:['Animation'],
  date:'2025-04-12', read:'8 min', seed:'db-post-gsap', pop:'2.7k reads',
  excerpt:'Six patterns cover 90% of scroll-driven UI: scrubbed timelines, batched reveals, sparing pins — and knowing when not to animate at all.',
  takeaways:['One scrubbed master timeline beats scattered triggers','Batch your reveals — never one ScrollTrigger per card','Pin sparingly; the browser already scrolls','Design the reduced-motion cut, don’t just disable'],
  cmts:[
    {n:'Ravi S.', r:'Creative dev', x:'The “one master timeline” point is underrated. I consolidated 30 triggers into 3 timelines last month and the scroll jank simply vanished.'}
  ],
  blocks:[
    {t:'h2', h:'One timeline, scrubbed'},
    {t:'p', x:'The biggest quality jump in my scroll work came from collapsing dozens of triggers into one timeline scrubbed by scroll. Sequence lives in one place; reversing scroll plays it backwards, perfectly.'},
    {t:'code', lang:'js', x:`const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#story',
    start: 'top top',
    end: '+=200%',
    scrub: 0.6,
    pin: true
  }
});
tl.from('.beat-1', { opacity: 0, y: 40 })
  .to('.beat-1', { opacity: 0 }, '+=1')
  .from('.beat-2', { opacity: 0, y: 40 }, '<');`},
    {t:'h2', h:'Batch the reveals'},
    {t:'p', x:'One ScrollTrigger per card is the classic tax: 40 cards, 40 observers, jank on scroll. Batch them and let GSAP stagger the group.'},
    {t:'code', lang:'js', x:`ScrollTrigger.batch('.card', {
  start: 'top 88%',
  onEnter: (batch) =>
    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08 })
});`},
    {t:'h2', h:'Pin sparingly'},
    {t:'p', x:'Pinning is powerful and expensive — it fights the browser’s native scroll contract. I pin when a sequence genuinely needs a stage, and never for decoration. If a section reads fine while scrolling, let it scroll.'},
    {t:'h2', h:'When not to animate'},
    {t:'ul', items:[
      'Content the user is trying to read — motion is noise',
      'Anything carrying meaning without a motion-free equivalent',
      'Scroll hijacking for its own sake — it reads as insecurity',
      'Anything without a reduced-motion plan from day one']}
  ]
},
{
  slug:'css-grid-design-tool', title:'CSS Grid is a design tool, not a layout utility', cat:'CSS', cats:['CSS'],
  date:'2025-03-02', read:'7 min', seed:'db-post-css',
  excerpt:'Grid lines, dense placement and min-content tracks do more for a composition than any amount of margin tuning.',
  takeaways:['Named lines turn layout into a design decision','minmax(min-content, X) makes translation-proof tracks','Asymmetry is a grid decision, not a padding hack'],
  blocks:[
    {t:'h2', h:'Layout is typography at scale'},
    {t:'p', x:'The moment I stopped treating Grid as “columns” and started treating it as composition, my layouts stopped looking like every template. Grid tracks are rhythm; placement is hierarchy.'},
    {t:'code', lang:'css', x:`.spread {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1.5rem, 1fr)
    [text-start] minmax(auto, 68ch)
    [text-end] minmax(1.5rem, 1fr)
    [aside-start] minmax(auto, 20rem)
    [aside-end] minmax(1.5rem, 1fr) [full-end];
}`},
    {t:'h2', h:'Asymmetry is a grid decision'},
    {t:'p', x:'An off-center editorial layout is one line of track sizing — not a mountain of negative margins. And minmax(min-content, X) means German translation never breaks the page.'},
    {t:'quote', x:'Every layout problem I used to solve with padding, I now solve with a track.', by:'Working note'}
  ]
},
{
  slug:'typescript-strict-after-a-year', title:'TypeScript strict mode, one year later', cat:'TypeScript', cats:['TypeScript'],
  date:'2024-12-09', read:'6 min', seed:'db-post-ts',
  excerpt:'Two hundred errors on day one. Three near-misses caught in production by month twelve. The math holds up.',
  takeaways:['The initial error wave is inventory, not damage','StrictNullChecks alone would have caught a third of the bugs','Generic helper types pay rent within weeks'],
  blocks:[
    {t:'h2', h:'The errors are the feature'},
    {t:'p', x:'Turning strict on in a mature codebase felt like vandalism — two hundred errors in an afternoon. A week later I understood: those errors were the backlog of latent bugs the codebase had been quietly carrying.'},
    {t:'code', lang:'ts', x:`// The null-check the old code was lying about
function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}`},
    {t:'h2', h:'Where it paid off'},
    {t:'ul', items:[
      'A third of caught near-misses were strictNullChecks doing arithmetic on undefined',
      'Discriminated unions replaced four stringly-typed status flags',
      'Shared API schemas: the server and the client can no longer disagree']}
  ]
},
{
  slug:'accessible-by-default', title:'Accessible by default: habits, not heroics', cat:'Accessibility', cats:['Accessibility'],
  date:'2024-11-20', read:'8 min', seed:'db-post-a11y',
  excerpt:'Accessibility fails in the gaps between features, not in the features. The fix is habits small enough to survive deadline week.',
  takeaways:['Semantics first, ARIA second, ARIA rarely','The keyboard is a first-class input, tested weekly','Automated checks catch a fraction — real users catch the rest'],
  blocks:[
    {t:'h2', h:'Semantics first, ARIA second'},
    {t:'p', x:'The most accessible component is usually the boring one: a real button, a real label, a real heading order. ARIA is powerful and easy to get wrong — reach for it when semantics genuinely cannot express the pattern.'},
    {t:'code', lang:'jsx', x:`// Boring wins
<label htmlFor="email">Email</label>
<input id="email" type="email" />

<button onClick={submit}>Continue</button>`},
    {t:'h2', h:'The keyboard is a first-class citizen'},
    {t:'ul', items:[
      'Tab through every build before it ships — a two-minute habit',
      'Visible focus, always; never outline: none without a replacement',
      'Test one screen-reader session per month — automation covers less than half']},
    {t:'quote', x:'Accessibility isn’t a feature you add. It’s the absence of the bugs you never made.', by:'Working note'}
  ]
}
];
