import type { Project } from './types';

export const PROJECTS: Project[] = [
{
  slug:'aurora-analytics', name:'Aurora Analytics', cat:'SaaS · Dashboard', f:['saas','dashboard'],
  year:'2024', role:'Lead Frontend Developer', client:'Aurora — Berlin', duration:'8 months',
  img:'db-aurora', tags:['React 18','TypeScript','Redux Toolkit','RTK Query','D3','Vite'],
  blurb:'Real-time product analytics for SaaS teams — 40+ chart types, virtualized data tables and a query builder that stays responsive on 500k-row result sets.',
  result:'LCP down 61% · daily queries up 3.4×', featured:true,
  demo:'https://aurora.delinb.dev', gh:'https://github.com/delinb/aurora-analytics',
  overview:'Aurora’s customers live inside their dashboards — hours a day, dozens of boards, millions of events. The v1 app had grown into a 2.1MB bundle that took 9 seconds to first meaningful paint on average hardware, and churn tracked load time almost linearly. I led the rebuild of the entire frontend: architecture, rendering strategy and the component system underneath.',
  challenge:'The original app rendered every chart and table eagerly on load, shipped one monolithic bundle, and aggregated query results on the main thread. On a typical 14-widget board, the UI froze for seconds while 500k rows were reduced in JavaScript.',
  objective:'First paint under 1.5s, interaction under 200ms on a mid-tier laptop — with zero features removed. The dashboard had to stay the most powerful tool in its category.',
  process:[
    {t:'Research', x:'Two weeks of instrumentation before a single feature: RUM data, DevTools traces and session replays of the 20 slowest boards. The data contradicted the team’s assumptions — charts weren’t the bottleneck, eager table rendering was.'},
    {t:'Design', x:'A widget contract: every chart and table became a lazy, independently-loading module with its own skeleton, error state and cancel token. The design system gained density tokens so boards could scale from 4 to 16 widgets.'},
    {t:'Development', x:'Route- and widget-level code splitting, aggregation moved into a pool of Web Workers, tables virtualized with a windowed renderer, and an RTK Query cache layer that dedupes requests and streams incremental updates.'}
  ],
  features:[
    {t:'Query builder', x:'A composable, keyboard-driven filter builder. Every clause is a unit-tested reducer and the UI renders from the query AST — builder, URL and API can never drift apart.', img:'db-aurora-f1'},
    {t:'Virtualized data grid', x:'500k rows scroll at 60fps: a windowed renderer that recycles DOM nodes and defers cell formatting to idle time. Screen readers get a real table via a focused-region mode.', img:'db-aurora-f2'},
    {t:'Streaming updates', x:'Live boards reconcile only the delta each widget owns, so a refresh costs milliseconds instead of a refetch. Optimistic selections make filtering feel instant.', img:'db-aurora-f3'}
  ],
  responsive:[
    'Desktop is the primary surface — a 12-column density grid at 1280px and up.',
    'Tablet collapses to 8 columns, widgets stacking in per-board priority order.',
    'Mobile shows the “pulse” view: KPIs, trends and alerts, with full boards one tap away.'
  ],
  anim:'Motion is structural, not decorative: skeletons shimmer on 1.2s cycles, widgets cross-fade on data arrival, and the query builder previews results with a 90ms debounce. Everything honors prefers-reduced-motion.',
  perf:[{n:'98',l:'Lighthouse performance'},{n:'1.2s',l:'LCP · p75 field'},{n:'0.01',l:'CLS'},{n:'−64%',l:'JavaScript shipped'}],
  tech:['Route-level code splitting','Web Worker aggregation pool','Virtualized table rendering','RTK Query cache + streaming','Custom D3 chart layer over React refs'],
  seo:['Semantic landmarks and heading order per board','Complete keyboard paths for every widget action','Chart data exposed as table fallbacks for screen readers'],
  challenges:[
    {p:'Worker messaging became a bottleneck at 40 messages per second.', s:'Batched transfers with transferable ArrayBuffers and a single requestAnimationFrame flush on the main thread.'},
    {p:'Virtualized rows broke screen-reader navigation and in-page search.', s:'An accessibility mode that renders the focused region as a real table — 40 genuine DOM rows at a time.'},
    {p:'The custom D3 layer fought React’s reconciliation.', s:'Charts became pure functions of props into an imperative render cycle mounted via refs — React owns layout, D3 owns pixels.'}
  ],
  results:[{n:'−61%',l:'LCP · p75'},{n:'3.4×',l:'daily active queries'},{n:'−38%',l:'churn on slowest boards'}],
  resultNote:'Six months after launch, boards that took 9 seconds render in 1.2 — and usage depth, the strongest anti-churn signal Aurora tracks, nearly tripled.',
  gallery:['db-aurora-g1','db-aurora-g2']
},
{
  slug:'kessel-commerce', name:'Kessel', cat:'E-commerce', f:['ecommerce'],
  year:'2023', role:'Frontend Developer', client:'Kessel Furniture — Copenhagen', duration:'5 months',
  img:'db-kessel', tags:['Next.js 14','TypeScript','Tailwind CSS','Sanity','Stripe'],
  blurb:'Headless storefront for a design furniture brand — editorial product pages, a checkout that converts, and 100/100/100/100 Lighthouse on every template.',
  result:'Checkout conversion +28% · perfect Lighthouse', featured:true,
  demo:'https://kessel.delinb.dev', gh:'https://github.com/delinb/kessel',
  overview:'Kessel sells furniture that photographs beautifully and ships expensively — returns were eating the margin. The old theme-based store felt generic, and the checkout leaked trust at every step. We rebuilt headless: Sanity for content, Next.js for the store, Stripe for money.',
  challenge:'A theme store locked inside a template: 4.6s LCP on product pages, a six-step checkout, and content editors who couldn’t lay out a product page without a developer in the room.',
  objective:'Make the brand’s editorial quality load instantly and make checkout feel as considered as the furniture. The measurable target: +20% checkout conversion.',
  process:[
    {t:'Research', x:'Checkout funnel analytics plus fifteen moderated customer sessions — most abandonment happened between step two and three, where shipping cost appeared unexplained for the first time.'},
    {t:'Design', x:'A block-based editorial page system in Sanity: art direction per product, with layout constraints that keep every combination coherent. Checkout collapsed to a single screen with live shipping estimates.'},
    {t:'Development', x:'Static generation with ISR for the catalog, next/image with AVIF pipelines, and a Stripe Elements checkout tuned for CLS zero on mid-tier phones.'}
  ],
  features:[
    {t:'Editorial page builder', x:'Content teams compose product pages from validated blocks — full-bleed imagery, material stories, dimension tools — with no developer involved since launch.', img:'db-kessel-f1'},
    {t:'One-page checkout', x:'Address, shipping and payment on a single screen with live totals. Conversion rose 28% in the first month; cart abandonment emails dropped to near zero.', img:'db-kessel-f2'},
    {t:'Visual variant picker', x:'Fabric and finish selection rendered as swatch-driven previews, deep-linked and shareable — the most-used feature per session recordings.', img:'db-kessel-f3'}
  ],
  responsive:[
    'Desktop gets the full editorial treatment — horizontal galleries and a persistent spec rail.',
    'Tablet reflows galleries to swipe decks while keeping the spec rail sticky.',
    'Mobile prioritizes imagery and price, with checkout thumb-reachable throughout.'
  ],
  anim:'Subtle and physical: swatches cross-dissolve on the product hero, the checkout total animates on change, and the gallery uses a custom Lenis-smoothed scroller. All disabled under reduced-motion.',
  perf:[{n:'100',l:'Lighthouse · all categories'},{n:'0.8s',l:'LCP · p75 field'},{n:'0',l:'CLS'},{n:'−52%',l:'JS vs. legacy theme'}],
  tech:['Static generation + ISR','next/image AVIF pipeline','Stripe Elements','Sanity block content','Edge-cached product JSON'],
  seo:['Product structured data with price and availability','Metadata templates per collection and product','XML sitemap generated from the CMS graph'],
  challenges:[
    {p:'Editorial freedom kept producing broken mobile layouts.', s:'Block contracts with per-breakpoint constraints — the CMS validates layout feasibility before publish, not after.'},
    {p:'Live shipping estimates were slow enough to feel broken.', s:'Edge function with cached carrier quotes per region, with an optimistic fallback shown instantly.'}
  ],
  results:[{n:'+28%',l:'checkout conversion'},{n:'+19%',l:'returning customer rate'},{n:'−31%',l:'product returns'}],
  resultNote:'The client’s words at handover: “It finally looks like our furniture.” The numbers agreed — conversion, returns and content velocity all moved in the right direction.',
  gallery:['db-kessel-g1','db-kessel-g2']
},
{
  slug:'pulse-health', name:'Pulse Health', cat:'Web App', f:['webapp'],
  year:'2023', role:'Frontend Developer', client:'Pulse Clinics — Chennai', duration:'6 months',
  img:'db-pulse', tags:['Next.js','TypeScript','React Hook Form','Zod','Framer Motion'],
  blurb:'Appointment booking for a chain of clinics — WCAG 2.1 AA by default, keyboard-first flows, and a form that patients over 55 actually complete.',
  result:'Booking drop-off −52% · support tickets −44%', featured:true,
  demo:'https://pulse.delinb.dev', gh:'https://github.com/delinb/pulse-health',
  overview:'Pulse runs eleven clinics whose patients skew older — 34% are over 55 and many are uncomfortable with web forms. Their old booking flow spanned eleven screens and generated a support call for roughly every fifth booking.',
  challenge:'The legacy flow asked for everything upfront, gave no feedback after submission, and failed screen readers completely. Staff were effectively a human UI for the website.',
  objective:'Cut booking drop-off by a quarter and reach WCAG 2.1 AA — verified with real patients, not just an automated checker.',
  process:[
    {t:'Research', x:'I sat in on reception for an afternoon and watched eight patients attempt the old flow. Five gave up and called. That afternoon shaped every decision after it.'},
    {t:'Design', x:'A single-screen progressive flow: pick a clinic, pick a slot, then only the information that step needs. Every state change announced politely via live regions.'},
    {t:'Development', x:'React Hook Form with Zod schemas mirrored on the server, generous tap targets, and a test suite that runs axe on every screen as part of CI.'}
  ],
  features:[
    {t:'Single-screen booking', x:'One question at a time, one tap to answer, and an undo for everything. Drop-off fell from 61% to 9%.', img:'db-pulse-f1'},
    {t:'Polite live regions', x:'Confirmations, errors and slot changes are announced — never chatty, never silent. Screen-reader users complete booking unaided.', img:'db-pulse-f2'}
  ],
  responsive:[
    'Desktop keeps a persistent summary panel beside the flow.',
    'Tablet runs the flow full-width with the summary as a final review step.',
    'Mobile matches the clinic’s printed signage language, so staff can guide patients screen-to-screen.'
  ],
  anim:'Framer Motion for step transitions only — 150ms, directional, and skippable. Motion never carries meaning here; the aria-live layer does.',
  perf:[{n:'99',l:'Lighthouse a11y'},{n:'0.9s',l:'LCP on 4G'},{n:'0.02',l:'INP · p75'},{n:'AA',l:'WCAG 2.1 verified'}],
  tech:['Progressive single-screen flow','Zod schemas shared client/server','axe-core in CI','aria-live announcement system','Offline-tolerant resubmission queue'],
  seo:['Semantic form landmarks and field grouping','Full keyboard paths with visible focus','Contrast-checked design tokens'],
  challenges:[
    {p:'Axe passed, but real screen-reader users still got lost.', s:'Testing with three actual TalkBack and NVDA users — their sessions found what automation structurally cannot.'},
    {p:'Flaky clinic connections lost in-progress bookings.', s:'A resubmission queue in IndexedDB that survives refreshes and retries with a user-visible, honest status.'}
  ],
  results:[{n:'−52%',l:'booking drop-off'},{n:'−44%',l:'support tickets'},{n:'8',l:'patients tested in person'}],
  resultNote:'The clinic director now books her own parents in through the site — which she previously called “a favor to ask of no one.”',
  gallery:['db-pulse-g1','db-pulse-g2']
},
{
  slug:'meridian-bank', name:'Meridian', cat:'Landing · Marketing', f:['landing'],
  year:'2022', role:'Frontend Developer', client:'Meridian Bank — Singapore', duration:'3 months',
  img:'db-meridian', tags:['Next.js','TypeScript','SCSS','GSAP','Cloudflare'],
  blurb:'Marketing site and onboarding flow for a digital bank — a perfect Lighthouse score, four locales, and organic traffic that doubled in five months.',
  result:'Organic traffic +112% · LCP 0.9s',
  demo:'https://meridian.delinb.dev', gh:'https://github.com/delinb/meridian',
  overview:'A digital bank with a genuinely good product and a website that hid it: slow, untranslatable, and invisible to search. Three months, one static export, and a content model built for growth.',
  challenge:'A CMS-driven monolith where every page shipped the full site’s JavaScript, in one language, with no metadata strategy at all.',
  objective:'Perfect Core Web Vitals, four locales, and a page one position for the brand’s three money keywords.',
  process:[
    {t:'Research', x:'A keyword and SERP audit revealed the bank’s comparison pages were the ranking opportunity nobody had built.'},
    {t:'Design', x:'A restrained system: editorial type, live rate tables, and locale-aware layouts that survive translation length swings of ±40%.'},
    {t:'Development', x:'Static export on a CDN edge, localized routes with hreflang, and structured data for products, FAQs and organization.'}
  ],
  features:[
    {t:'Live rate tables', x:'Edge-cached JSON with graceful stale-while-revalidate — always current, never blocking render.', img:'db-meridian-f1'},
    {t:'Localized structure', x:'Four locales with hreflang and length-tolerant layouts; translation swaps never break a page.', img:'db-meridian-f2'}
  ],
  responsive:['Desktop 1440 art-directed hero crops.','Tablet and mobile use dedicated crops — not shrunk desktops.','The onboarding flow is mobile-first; desktop inherits it.'],
  anim:'GSAP scroll reveals at 0.3 opacity steps and one pinned section for the rate story. The rest is typography doing the work.',
  perf:[{n:'100',l:'Lighthouse performance'},{n:'0.9s',l:'LCP · p75'},{n:'0',l:'CLS'},{n:'4',l:'locales, one codebase'}],
  tech:['Static export on edge CDN','hreflang localization','JSON-LD product + FAQ schema','Priority hero preloading'],
  seo:['Organization, Product and FAQ structured data','Canonical + hreflang matrix','Semantic heading architecture audited page by page'],
  challenges:[
    {p:'Translation length swings broke layouts in German.', s:'Min-content grid tracks and clamp() typography tuned against the longest locale, not the shortest.'}
  ],
  results:[{n:'+112%',l:'organic traffic · 5 months'},{n:'3',l:'page-one keywords'},{n:'0.9s',l:'LCP · p75'}],
  resultNote:'The SEO win compounded quietly: the comparison pages now rank first for two of the three target keywords, and they cost less to host than the old site’s image budget.',
  gallery:['db-meridian-g1','db-meridian-g2']
},
{
  slug:'atlas-design-system', name:'Atlas DS', cat:'Design System', f:['webapp'],
  year:'2022', role:'Design Engineer', client:'Lumen Digital — internal', duration:'Ongoing',
  img:'db-atlas', tags:['React','TypeScript','Storybook','Radix UI','Design Tokens'],
  blurb:'A 68-component design system with a token pipeline, accessibility baked into every primitive, and documentation that teams actually read.',
  result:'Feature delivery 2.3× faster across 12 products',
  demo:'https://atlas.delinb.dev', gh:'https://github.com/delinb/atlas',
  overview:'Twelve product teams, four design languages, and a merge conflict waiting in every repo. Atlas replaced all of it: one source of truth from Figma variables to runtime tokens.',
  challenge:'Every product had grown its own buttons, its own spacing scale and its own dark mode bugs. Designers spent their time reconciling, not designing.',
  objective:'One system with zero visual regressions on adoption, and a migration path a team could finish in a sprint — not a quarter.',
  process:[
    {t:'Research', x:'An audit of 4 products and ~300 one-off components found 22 different greys and 9 focus styles. The system’s job was subtraction.'},
    {t:'Design', x:'Tokens flow from Figma variables through a build step into CSS custom properties and TypeScript types — one change, every surface.'},
    {t:'Development', x:'Radix primitives wrapped in a strictly opinionated API: 68 components, each with a Storybook entry, axe tests and usage docs.'}
  ],
  features:[
    {t:'Token pipeline', x:'Figma variables to typed CSS custom properties in CI. A rename in design is a typed error in code the same day.', img:'db-atlas-f1'},
    {t:'Codemod migration', x:'A scripted migration path moved products to Atlas in days — three teams completed adoption inside a single sprint each.', img:'db-atlas-f2'}
  ],
  responsive:['Density tokens adapt components to pointer vs. touch surfaces.','Container queries let panels resize independently of viewport.','Print styles ship with every document component.'],
  anim:'Motion tokens — duration, easing, stagger — exported from design, consumed by CSS and GSAP alike. No component invents its own physics.',
  perf:[{n:'68',l:'components'},{n:'12',l:'products adopted'},{n:'22→4',l:'greys in production'},{n:'2.3×',l:'feature delivery speed'}],
  tech:['Figma variables → tokens build','Radix primitives','Storybook with axe checks','Codemod migration tooling'],
  seo:['ARIA patterns documented per component','Keyboard maps in every story','Contrast guaranteed at token level'],
  challenges:[
    {p:'Teams kept forking components under deadline pressure.', s:'A sanctioned escape-hatch API — styled slots with lint-enforced review — that turns forks into proposals.'}
  ],
  results:[{n:'2.3×',l:'faster feature delivery'},{n:'−70%',l:'UI-related incidents'},{n:'12',l:'teams on one system'}],
  resultNote:'The system now argues on my behalf: estimates stopped being guesses, because the components do the reasoning.',
  gallery:['db-atlas-g1','db-atlas-g2']
},
{
  slug:'loop-studio', name:'Loop', cat:'Experiment · Landing', f:['experiments','landing'],
  year:'2021', role:'Creative Developer', client:'Loop Studio — self-initiated', duration:'6 weeks',
  img:'db-loop', tags:['GSAP','Canvas','Lenis','Vite'],
  blurb:'Scroll-driven storytelling site for a motion studio — a page that behaves like a film, running 60fps on a mid-range phone.',
  result:'Avg. session 4m 12s · featured on 3 galleries',
  demo:'https://loop.delinb.dev', gh:'https://github.com/delinb/loop',
  overview:'A self-initiated collaboration with a motion studio: one product, one scroll, one continuous timeline. The constraint was the point — everything you feel is one choreography.',
  challenge:'Scroll-jacking is cheap and common. Making scroll feel authored — frame-accurate, reversible, and calm — is the hard version.',
  objective:'A scroll experience that reads as film on desktop and stays 60fps on a Pixel 6, with a complete reduced-motion fallback.',
  process:[
    {t:'Design', x:'Storyboarded like an edit: 14 beats, each with in/out states, then choreographed onto one GSAP timeline scrubbed by scroll.'},
    {t:'Development', x:'Canvas layers for imagery, DOM for type, Lenis for scroll smoothing, and a frame budget measured on-device every evening of the build.'}
  ],
  features:[
    {t:'One scrubbed timeline', x:'Fourteen beats on a single GSAP timeline — reversing scroll plays the film backwards, perfectly.', img:'db-loop-f1'},
    {t:'Reduced-motion cut', x:'A complete editorial fallback: same content, same narrative, no motion — deliberately designed, not just “off”.', img:'db-loop-f2'}
  ],
  responsive:['Desktop runs the full canvas choreography.','Tablet trims to 9 beats with identical pacing.','Mobile swaps canvas-heavy beats for CSS-transformed stills at the same rhythm.'],
  anim:'This is the animation case study: scrub, pin, stagger — used deliberately, once each, in service of one narrative rather than as garnish.',
  perf:[{n:'60fps',l:'on mid-range mobile'},{n:'180KB',l:'total JS'},{n:'3',l:'gallery features'},{n:'4:12',l:'avg. session'}],
  tech:['One scrubbed GSAP master timeline','Canvas compositing for imagery','Lenis scroll smoothing','Reduced-motion editorial cut'],
  seo:['The reduced-motion cut is fully crawlable and indexable','All narrative text in DOM, never in canvas','Per-beat headings for structure'],
  challenges:[
    {p:'Canvas imagery janked on mobile GPUs.', s:'Pre-scaled offscreen buffers and will-change budgeting per layer — one composited layer at a time.'}
  ],
  results:[{n:'4:12',l:'average session'},{n:'60fps',l:'sustained on mobile'},{n:'3',l:'design gallery features'}],
  resultNote:'The project that taught me restraint: every effect I removed made the remaining ones stronger.',
  gallery:['db-loop-g1','db-loop-g2']
}
];
