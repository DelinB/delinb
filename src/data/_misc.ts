import type {
  Mini, Testimonial, Experience, CareerEntry, SkillCategory, EngSkill,
  StackRow, Service, ProcessStep, UsesGroup, Faq, PlaygroundItem,
} from './types';

export const MINIS: Mini[] = [
  {t:'Velocity Marquee', x:'A text track whose speed reacts to scroll velocity — calm when you are.', d:'GSAP'},
  {t:'Elastic Cursor', x:'A cursor with lag and stretch, applied where it earns its keep.', d:'JS · rAF'},
  {t:'Grid Spotlight', x:'The particle field, distilled into a component.', d:'Canvas'},
  {t:'Split-Text Waves', x:'Letter-level hover choreography with pure CSS delays.', d:'CSS'}
];

export const TESTIMONIALS: Testimonial[] = [
  {n:'Sarah Lindqvist', r:'Product Manager · Aurora', seed:'db-t1', q:'Delin treats performance and accessibility as product features, not chores. Our dashboard rebuild shipped faster than scoped, and our slowest boards became our fastest.'},
  {n:'Mikkel Hartmann', r:'Founder · Kessel', seed:'db-t2', q:'He rebuilt our store and checkout conversion went up 28% in the first month. He also taught our content team to build pages — I still don’t know which mattered more.'},
  {n:'Dr. Priya Raghavan', r:'Director · Pulse Clinics', seed:'db-t3', q:'Our patients are 55 and older, many first-time internet users. Delin’s booking flow halved drop-off and halved our support calls. He tested with real patients, unprompted.'},
  {n:'Jonas Weber', r:'Tech Lead · Lumen Digital', seed:'db-t4', q:'The cleanest component APIs I have worked against. Six months of Atlas and our estimates stopped being guesses — the system does the arguing for us.'},
  {n:'Ananya Iyer', r:'UX Designer · Lumen Digital', seed:'db-t5', q:'Delin is the engineer who pushes back with a better idea, then implements it better than you pictured it. Figma-to-code fidelity with judgment layered on top.'}
];

export const EXP: Experience[] = [
  {y:'2023 — Present', co:'Lumen Digital', role:'Senior Frontend Developer', loc:'Remote · Chennai',
   desc:'Technical lead for three product frontends and the design system underneath them.',
   resp:['Lead architecture, review standards and performance budgets across three products','Built and maintain Atlas — a 68-component design system used by 12 product teams','Mentor four developers; introduced RFCs and pairing to the frontend group','Own Core Web Vitals — every product page in the “good” band for 14 consecutive months'],
   ach:['Median LCP across products: 3.1s → 1.2s','Design system cut feature delivery time 2.3×','Frontend incidents down 70% year over year'],
   tags:['React','Next.js','TypeScript','Design System','Storybook']},
  {y:'2021 — 2023', co:'Vertexwave Studio', role:'Frontend Developer', loc:'Chennai',
   desc:'Client work at volume — 20+ launches across e-commerce, publishing and SaaS marketing.',
   resp:['Shipped 20+ client sites and applications end to end','Led three WordPress-to-Next.js migrations with zero content downtime','Introduced TypeScript and component testing to the studio workflow','Ran a monthly performance clinic on client projects'],
   ach:['Median client Lighthouse score: 74 → 96','Checkout conversion for a retail client: +28%','Maintenance retainer revenue up 35% on fewer regressions'],
   tags:['Next.js','TypeScript','Tailwind','GSAP','Stripe']},
  {y:'2019 — 2021', co:'Brightside Agency', role:'Junior Frontend Developer', loc:'Chennai',
   desc:'Landing pages by day, jQuery-to-React migration by night — where production React clicked.',
   resp:['Built landing pages and campaign sites to unforgiving design specs','Migrated a legacy jQuery codebase screen by screen into React','Owned email templates and analytics tag hygiene'],
   ach:['First 100 Lighthouse score on a campaign page','Fourteen screens migrated to React with zero downtime'],
   tags:['JavaScript','React','SCSS']},
  {y:'2018 — 2019', co:'Freelance', role:'Self-taught → first clients', loc:'Chennai',
   desc:'MDN, freeCodeCamp and 2 a.m. side projects — the year the trade became real.',
   resp:['Learned the fundamentals properly: HTML, CSS, JavaScript, accessibility','Built six small-business sites for local clients','First experience with real requirements, deadlines and users'],
   ach:['Six clients, zero unpaid invoices'],
   tags:['HTML','CSS','JavaScript']}
];

export const CAREER: CareerEntry[] = [
  {y:'2015 — 19', t:'B.E. Computer Science', co:'Anna University · Chennai', sum:'The fundamentals — plus a right-click on a badly-built department site that turned curiosity into a career plan.', more:'Four years of data structures, networks and databases, and one unofficial project: rebuilding the department website because I couldn’t stand it. It shipped, students used it, and the habit of shipping stuck.'},
  {y:'2018', t:'Engineering Internship', co:'Product startup · Chennai', sum:'Three months inside a real codebase — code review, staging deploys, and my first production bug.', more:'I fixed a CSS regression that shipped to production an hour after I caused it, then wrote the postmortem. Learning what “real users” means, at the exact speed of a Friday deploy.'},
  {y:'2018 — 19', t:'Freelance Developer', co:'Six local businesses', sum:'Learned HTML by being paid for it. Real clients, real deadlines, real invoices — six sites, zero unpaid.', more:'Restaurants, a tuition center, a gym. Requirements arrived as phone calls; revisions arrived as relatives’ opinions. It taught me scoping, expectation-setting and the art of the second draft.'},
  {y:'2019 — 21', t:'Junior Frontend Developer', co:'Brightside Agency', sum:'Campaign pages to unforgiving specs, plus a screen-by-screen jQuery-to-React migration.', more:'The migration was my real education: fourteen screens moved with zero downtime, and my first 100 Lighthouse score on a campaign page that ran on a real ad budget.'},
  {y:'2021 — 23', t:'Frontend Developer', co:'Vertexwave Studio', sum:'Twenty-plus client launches, three platform migrations, and the discovery that performance is a design decision.', more:'I started the studio’s monthly performance clinic and turned it into a retainer line. Median client Lighthouse went 74 → 96 across my tenure — the number that got Lumen’s attention.'},
  {y:'2023 — Now', t:'Senior Frontend Developer', co:'Lumen Digital · Remote', sum:'Leading three product frontends and the Atlas design system, with four developers I mentor weekly.', more:'Median LCP across the products: 3.1s → 1.2s. Atlas: 68 components, 12 teams. The job now is mostly judgment — making the expensive-to-reverse decisions correctly, and teaching others to make them too.'}
];

export const SKILL_CATS: SkillCategory[] = [
  {t:'Frontend', items:[['React','expert'],['Next.js','advanced'],['TypeScript','expert'],['JavaScript','expert']]},
  {t:'Styling', items:[['CSS','expert'],['Tailwind CSS','expert'],['SCSS / CSS Modules','advanced'],['Responsive design','expert']]},
  {t:'State & Data', items:[['Redux Toolkit','advanced'],['RTK Query','advanced'],['Zustand','advanced'],['React Query','advanced']]},
  {t:'Animation', items:[['GSAP','expert'],['Framer Motion','advanced'],['CSS / WAAPI','expert']]},
  {t:'Tools', items:[['Git / GitHub','advanced'],['Figma','advanced'],['VS Code','expert'],['Postman','advanced']]}
];

export const SKILL_ENG: EngSkill[] = [
  ['Component architecture','Designing component APIs that stay small, composable and predictable as products grow.'],
  ['API integration','Typed clients, caching layers, optimistic UI and failure states that tell the truth.'],
  ['Performance optimization','Profiling before optimizing. Budgets, metrics, and the discipline to keep both.'],
  ['Accessibility','Semantics first, ARIA second. Keyboard paths and screen-reader flows as default deliverables.'],
  ['SEO / AEO','Metadata, structured data and semantic markup — content machines can parse and answer engines cite.'],
  ['Testing','Vitest and Testing Library: the 20% of tests that catch 80% of regressions.'],
  ['Responsive development','Fluid layouts, container queries, and interfaces that survive zoom and rotation.']
];

export const STACK: StackRow[] = [
  ['Languages','TypeScript · JavaScript (ES2023) · HTML · CSS · SQL (conversational)'],
  ['Frameworks','React 18 · Next.js 14 · Astro · Remix (maintained)'],
  ['Styling','Tailwind CSS · SCSS · CSS Modules · Styled Components · Vanilla CSS, happily'],
  ['State','Redux Toolkit · RTK Query · Zustand · React Query'],
  ['Animation','GSAP (ScrollTrigger) · Framer Motion · CSS / Web Animations API'],
  ['Backend / API','Node.js · Express · REST · GraphQL · tRPC'],
  ['Database','PostgreSQL · MongoDB · Supabase · Firebase'],
  ['Tools','Git · GitHub · Figma · VS Code · Postman · Vite · Storybook · Vitest'],
  ['Deployment','Vercel · Netlify · AWS (S3 + CloudFront) · Docker (conversational)']
];

export const SERVICES: Service[] = [
  ['Frontend Development','End-to-end product UI: architecture, components, state and tests.',['Production codebase','Architecture doc','Handover session']],
  ['Next.js Development','Server rendering, ISR, metadata, image pipelines and edge caching — done properly.',['App Router build','SEO baseline','CWV budget']],
  ['React Development','SPA architecture with hooks discipline, or a careful migration out of legacy.', ['Feature build','Migration plan','Component library']],
  ['UI Implementation','Figma to code with judgment — pixel-faithful where it matters, improved where it doesn’t.',['Design audit','Interactive build','Spec sheet']],
  ['Landing Pages','Fast, conversion-minded pages ready for A/B sections and analytics.',['Page build','Experiments','Analytics wiring']],
  ['SaaS Development','Dashboards, onboarding, billing UI and empty states that teach.',['App UI','Onboarding flow','Design system tap-in']],
  ['E-commerce Development','Headless storefronts with a checkout that earns trust.',['Storefront build','Checkout flow','CMS setup']],
  ['Performance Optimization','Audits, budgets and Core Web Vitals rescue missions.',['Full audit','Fix PRs','Field monitoring']],
  ['Website Redesign','Redesign without replatform trauma — content model first.',['Content model','New design system','Migration']]
];

export const PROCESS: ProcessStep[] = [
  ['01','Discover','Understand requirements, constraints and the numbers that define success.'],
  ['02','Plan','Architecture and technical planning — the decisions that are expensive to reverse.'],
  ['03','Design','UI/UX direction with the engineering reality priced in from day one.'],
  ['04','Build','Development and integration, shipped in reviewable increments.'],
  ['05','Test','Responsive, accessibility and performance verification against the plan.'],
  ['06','Launch','Deployment, monitoring and the handover that makes it stick.']
];

export const USES: UsesGroup[] = [
  {g:'Development Setup', items:[
    ['MacBook Pro 14”','M3, 32GB — fast enough that I run out of excuses.'],
    ['Dell UltraSharp 27 4K','One screen, many containers. UI at 100%, terminal at 90%.'],
    ['Keychron K2','Tactile switches, wireless, louder than it should be.'],
    ['MX Master 3S','The scroll wheel is a lifestyle.'],
    ['Sony WH-1000XM4','Focus mode, always paired to the same Mac.']
  ]},
  {g:'Software', items:[
    ['VS Code','One settings.json, synced everywhere. 11 extensions, audited quarterly.'],
    ['Figma','Autolayout whisperer. Design tokens start here.'],
    ['Arc','One space per project — context switching without the cost.'],
    ['iTerm2 + zsh','Aliases for everything I have typed twice.'],
    ['Raycast','Quietly replaced six apps I used to open daily.']
  ]},
  {g:'Development Stack', items:[
    ['Next.js + TypeScript','The default until the problem says otherwise.'],
    ['Tailwind CSS','With a design-token layer, never raw.'],
    ['Vite + Vitest','Instant feedback loops, tests that run locally.'],
    ['Storybook','Where components earn their documentation.'],
    ['pnpm','Disk space is a renewable resource, apparently not.']
  ]},
  {g:'Extensions & Productivity', items:[
    ['ESLint + Prettier','Disagreements settle themselves.'],
    ['Tailwind IntelliSense','Muscle memory with a safety net.'],
    ['Error Lens','Problems where my eyes already are.'],
    ['GitLens','Blame, constructively.'],
    ['A plain .txt todo file','It never syncs. It never goes down.'],
    ['50-minute focus blocks','The calendar defends the code.']
  ]}
];

export const FAQS: Faq[] = [
  ['Are you available for freelance?','Yes — I take on one product UI or performance engagement at a time so it gets my full attention. Current availability is listed at the top of every page; I keep it honest.'],
  ['Are you open to full-time roles?','Selectively. Remote-first teams building design-heavy, performance-minded products are my sweet spot. If that is you, the contact form is the fastest route.'],
  ['Do you work remotely?','Fully remote, based in Chennai (IST). I keep at least four hours of overlap with EU teams and six with EST — which covers most of the working day anywhere.'],
  ['How long does a typical project take?','Landing pages: 2–3 weeks. Product UI or design system work: 6–12 weeks. Performance audits: 1–2 weeks including the writeup and fix PRs.'],
  ['What technologies do you work with?','React and Next.js with TypeScript at the core; Tailwind, GSAP and Framer Motion around it. And whatever the problem actually needs — I will tell you plainly if that is not me.']
];

export const PLAYG: PlaygroundItem[] = [
  {id:'spotlight', t:'Glyph Spotlight', hint:'move cursor', x:'A field of code glyphs that brightens and scrambles near the pointer — the particle treatment, distilled into a component.', tags:['Canvas','rAF']},
  {id:'magnet', t:'Magnetic Button', hint:'move cursor', x:'A button with a gravity well. The pull is clamped and eased, and the release is elastic — physical rather than clingy.', tags:['GSAP','Pointer']},
  {id:'scramble', t:'Text Scramble', hint:'hover', x:'Characters resolve out of noise. The classic decode effect, tuned to feel like signal finding its shape.', tags:['JavaScript']},
  {id:'tilt', t:'Perspective Tilt', hint:'move cursor', x:'A 3D-transformed card tracking the pointer with clamped rotation — the 90s CD-case feeling, tastefully rationed.', tags:['CSS 3D']},
  {id:'ripple', t:'Ripple Field', hint:'click', x:'A dot grid that carries click ripples outward with displacement and decay. Therapeutic in meetings.', tags:['Canvas']},
  {id:'velocity', t:'Velocity Marquee', hint:'scroll the page', x:'A marquee whose speed and direction answer your scroll velocity — calm drift when idle, honest physics when you move.', tags:['Scroll','rAF']},
  {id:'letters', t:'Letter Stagger', hint:'hover', x:'Per-letter transition delays turn one hover into a wave. Pure CSS timing, driven by a single custom property.', tags:['CSS','JS']},
  {id:'odometer', t:'Odometer', hint:'click roll', x:'A rolling counter that settles. Randomness as a reward for curiosity.', tags:['JavaScript','rAF']}
];

export const CATS: string[] = ['All','React','Next.js','TypeScript','CSS','Animation','Performance','SEO','Accessibility'];
