export const SITE = {
  name: 'Delin B',
  title: 'Delin B — Frontend Developer',
  description:
    'Delin B — frontend developer in Chennai building fast, accessible, precisely-crafted interfaces with React, Next.js, TypeScript and GSAP.',
  url: 'https://delinb.dev',
  email: 'delinb23@gmail.com',
  location: 'Chennai, India',
  timezone: 'IST (UTC+5:30)',
  socials: {
    github: 'https://github.com/delinb',
    linkedin: 'https://www.linkedin.com/in/delinb',
    x: 'https://x.com/delinb_dev',
  },
} as const;

/** Primary navigation shown in the header. */
export const PRIMARY_NAV = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Full site map used by the mobile drawer, footer, sitemap and command palette. */
export const ALL_PAGES = [
  { href: '/', label: 'Home', title: 'Delin B — Frontend Developer', description: 'Frontend developer in Chennai — fast, accessible, precisely-crafted interfaces with React, Next.js and TypeScript.' },
  { href: '/about', label: 'About', title: 'About — Delin B', description: 'The story, philosophy, stack and career timeline of Delin B — frontend developer.' },
  { href: '/projects', label: 'Projects', title: 'Projects — Delin B', description: 'Selected work: six projects with full case studies — SaaS, e-commerce, web apps and experiments.' },
  { href: '/skills', label: 'Skills', title: 'Skills — Delin B', description: 'Technical and engineering skills, mapped on a four-step matrix from beginner to expert.' },
  { href: '/experience', label: 'Experience', title: 'Experience — Delin B', description: 'Six years, four teams — responsibilities and measurable outcomes for every role.' },
  { href: '/services', label: 'Services', title: 'Services — Delin B', description: 'Frontend development services and the six-step process behind them.' },
  { href: '/resume', label: 'Résumé', title: 'Résumé — Delin B', description: 'Print-ready résumé of Delin B, frontend developer — experience, skills, projects and certifications.' },
  { href: '/blog', label: 'Blog', title: 'Blog — Delin B', description: "Thoughts, experiments and things I've learned — React performance, Next.js SEO, GSAP patterns and more." },
  { href: '/playground', label: 'Playground', title: 'Playground — Delin B', description: 'Live experiments: canvas, GSAP, cursor effects, scroll physics and CSS — all running in the page.' },
  { href: '/uses', label: 'Uses', title: 'Uses — Delin B', description: 'The hardware, software, stack and habits behind the output.' },
  { href: '/testimonials', label: 'Testimonials', title: 'Testimonials — Delin B', description: 'What PMs, founders and designers say about working with Delin B.' },
  { href: '/contact', label: 'Contact', title: 'Contact — Delin B', description: 'Start a project with Delin B — freelance and selective full-time availability, replies within 24 hours.' },
] as const;

/** Routes whose hero starts dark (transparent header until scroll) — mirrors `dark` flag in the source ROUTES table. */
export const DARK_HERO_ROUTES = ['/', '/404'] as const;
