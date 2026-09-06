import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { SITE } from '@/lib/site';
import { PROJECTS, POSTS, EXP } from '@/data/content';
import { SplitText } from '@/components/interactive/split-text';
import { SocialRail } from '@/components/ui/social-links';
import { SeedImage } from '@/components/ui/seed-image';
import { CopyButton } from '@/components/ui/copy-button';
import { SectionHead, StatNum } from '@/components/sections/shared';
import { FeaturedProject } from '@/components/projects/featured-project';
import { PostCard } from '@/components/projects/project-card';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';
import { CvButton } from '@/components/interactive/cv-button';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: SITE.title,
  description:
    'Frontend developer in Chennai — fast, accessible, precisely-crafted interfaces with React, Next.js and TypeScript.',
  path: '/',
  ogTitle: 'Delin B — Frontend Developer',
  ogDescription: 'Fast, accessible, precisely-crafted interfaces. React · Next.js · TypeScript · GSAP.',
});

const TICKER_ITEMS = [
  'REACT', 'NEXT.JS', 'TYPESCRIPT', 'JAVASCRIPT', 'TAILWIND CSS', 'REDUX TOOLKIT',
  'GSAP', 'FRAMER MOTION', 'WEB WORKERS', 'STORYBOOK', 'VITE', 'ACCESSIBILITY',
  'CORE WEB VITALS', 'FIGMA', 'GIT / GITHUB',
];

const EXPERTISE = [
  ['01', 'Frontend Development', 'React, Next.js, TypeScript — architecture that stays small as it grows.'],
  ['02', 'UI Engineering', 'Component APIs, design systems, token pipelines.'],
  ['03', 'Responsive Design', 'Fluid, zoom-proof layouts with container queries.'],
  ['04', 'Performance', 'Budgets, profiling, Core Web Vitals in the field.'],
  ['05', 'Accessibility', 'WCAG 2.1 AA as the floor, not the ceiling.'],
  ['06', 'SEO / AEO', 'Markup that search and answer engines can cite.'],
  ['07', 'Animation', 'GSAP and Framer Motion — motion with a reason.'],
  ['08', 'API Integration', 'Typed clients, caching, optimistic UI.'],
];

export default function HomePage() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={webPageJsonLd('/', 'Delin B — Frontend Developer', SITE.description)} />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <span className="rule" />
          <span>02</span>
          <span className="rule" />
          <span>03</span>
        </div>
        <SocialRail />
        <div className="hero-inner">
          <p className="hero-eyebrow">DELIN B — FRONTEND DEVELOPER · CHENNAI</p>
          <h1 className="hero-title">
            <div>Interfaces that</div>
            <div className="l2">load fast, feel</div>
            <div className="l3">
              <span className="thin">human, and</span> last.
            </div>
          </h1>
          <div className="hero-row">
            <div className="hero-info">
              <div className="avail">
                <i className="dot" aria-hidden="true" />
                Available for new projects
              </div>
              <p className="hero-quote">
                <span className="bracket">[</span>
                <span className="hq-text">
                  <SplitText mode="letters" manual>
                    I turn ambiguous designs and heavy requirements into fast, accessible,
                    maintainable frontend — React, Next.js, TypeScript.
                  </SplitText>
                </span>
                <span className="bracket">]</span>
              </p>
              <p className="drag-hint">Drag the background — it rotates</p>
            </div>
            <div className="hero-ctas">
              <Link className="btn" href="/projects">
                View Projects
              </Link>
              <CvButton />
            </div>
          </div>
          <div className="hero-stats">
            <StatNum count={6} suffix="+" label="Years building production frontend for products and clients." />
            <StatNum count={42} label="Projects shipped — landing pages to design systems." />
            <StatNum count={96} label="Median Lighthouse performance across my last ten launches." />
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <div className="ticker" aria-hidden="true">
        <div className="tk-track">
          {[0, 1].map((g) => (
            <div className="tk-g" key={g}>
              {TICKER_ITEMS.map((item) => (
                <span key={`${g}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ ABOUT — THE SHORT VERSION ============ */}
      <section className="sec first">
        <div className="wrap">
          <SectionHead
            eyebrow="ABOUT — THE SHORT VERSION"
            title={
              <>
                A developer who reads
                <br />
                the design <span className="muted">and</span> the API docs.
              </>
            }
            desc="Six years in, I still read error messages end to end. Performance, accessibility and motion are product features — I treat them that way from the first commit."
            link={['/about', 'More about me']}
          />
          <div className="split" data-reveal>
            <figure className="gsc">
              <SeedImage seed="db-portrait" w={900} h={680} alt="Delin B" sizes="(max-width: 900px) 100vw, 560px" />
              <figcaption>Chennai, India — usually near a keyboard</figcaption>
            </figure>
            <div>
              <h2 className="big">
                I build the frontend layer
                <br />
                products are <span className="muted">judged by.</span>
              </h2>
              <p className="body">
                Currently senior frontend developer at Lumen Digital, leading three product
                frontends and the Atlas design system. Before that: 20+ client launches, three
                platform migrations, and a thousand code reviews that made all of it better.
              </p>
              <p className="body">
                The throughline: shipping interfaces that load fast, work for everyone, and still
                make sense a year later — to users and to the next developer.
              </p>
              <p className="fact-line">BASED IN CHENNAI · REMOTE-FIRST · IST (UTC+5:30)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="SELECTED WORK — THREE OF SIX"
            title="Featured projects."
            desc="Each link opens a full case study: the problem, the decisions, and the numbers after launch."
            link={['/projects', 'All projects']}
          />
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* ============ EXPERTISE ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="WHAT I BRING"
            title="Expertise, in eight lines."
            desc="Not a percentage bar in sight — the details live on the skills page."
            link={['/skills', 'Full skills']}
          />
          <div className="b-grid">
            {EXPERTISE.map((c, i) => (
              <div
                key={c[1]}
                className="b-card"
                data-reveal
                style={{ '--d': `${(i % 4) * 60}ms` } as React.CSSProperties}
              >
                <span className="num">{c[0]}</span>
                <h3>{c[1]}</h3>
                <p>{c[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE — THE RECENT THIRD ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="EXPERIENCE — THE RECENT THIRD"
            title="Where I've been."
            desc="Four roles across product, studio and agency — the full history on the experience page."
            link={['/experience', 'Full history']}
          />
          <div className="tl" data-reveal>
            {EXP.slice(0, 3).map((e) => (
              <div className="tl-row" key={e.co}>
                <div className="tl-year">{e.y}</div>
                <div className="tl-body">
                  <h3>{e.role}</h3>
                  <p className="tl-co">
                    {e.co} · {e.loc}
                  </p>
                  <p>{e.desc}</p>
                  <div className="tl-ach">
                    <b>↳ {e.ach[0]}</b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASE STUDY BAND ============ */}
      <section className="band">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            SELECTED CASE STUDY
          </p>
          <h2 className="band-title">
            <SplitText mode="words" shift={30} blur={10}>
              Aurora Analytics —
              <br />
              cutting 9-second loads <span className="muted">to 1.2.</span>
            </SplitText>
          </h2>
          <div className="csb-cols" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <div>
              <b>Problem</b>
              <p>A 2.1MB bundle, 9-second first paint, and churn that tracked load time almost linearly.</p>
            </div>
            <div>
              <b>Solution</b>
              <p>
                Route- and widget-level code splitting, Web Worker aggregation, virtualized tables,
                and a streaming RTK Query cache.
              </p>
            </div>
            <div>
              <b>Result</b>
              <p>LCP 9s → 1.2s. Daily queries ×3.4. Churn on the slowest boards down 38%.</p>
            </div>
          </div>
          <div data-reveal style={{ '--d': '180ms' } as React.CSSProperties}>
            <Link className="btn" href="/projects/aurora-analytics">
              Read the full case study
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="TESTIMONIALS"
            title={
              <>
                Words from the teams
                <br />
                I&apos;ve built with.
              </>
            }
            link={['/testimonials', 'All testimonials']}
          />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ============ LATEST WRITING ============ */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="LATEST WRITING"
            title={
              <>
                Thoughts, experiments
                <br />
                &amp; things I&apos;ve learned.
              </>
            }
            link={['/blog', 'All articles']}
          />
          <div className="j-grid">
            {POSTS.slice(0, 3).map((p, i) => (
              <PostCard key={p.slug} p={p} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL BAND ============ */}
      <section className="band">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            LET&apos;S BUILD
          </p>
          <h2 className="band-title">
            <SplitText mode="letters" shift={12} blur={3} dur={0.4} stagger={0.012}>
              Have an idea?
              <br />
              Let&apos;s build something <span className="muted">exceptional.</span>
            </SplitText>
          </h2>
          <div data-reveal style={{ '--d': '180ms' } as React.CSSProperties} className="hero-ctas">
            <Link className="btn" href="/contact">
              Start a project
            </Link>
            <CopyButton
              className="btn ghost"
              text={SITE.email}
              message="Email copied — talk soon."
              ariaLabel="Copy email address"
            >
              {SITE.email}
            </CopyButton>
          </div>
        </div>
      </section>
    </>
  );
}
