import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd, profilePageJsonLd } from '@/lib/schema';
import { STACK, CAREER } from '@/data/content';
import { PageHero, SectionHead, Band } from '@/components/sections/shared';
import { VtTimeline } from '@/components/sections/vt-timeline';
import { SeedImage } from '@/components/ui/seed-image';
import { JsonLd } from '@/components/seo/json-ld';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'About — Delin B',
  description: 'The story, philosophy, stack and career timeline of Delin B — frontend developer.',
  path: '/about',
});

const STORY = [
  ['(01)', '2016 — The view-source moment', 'A badly-built school website, a right-click, and the discovery that pages were just text I could write. Everything after was momentum.'],
  ['(02)', '2017 — Learning in public', 'MDN, freeCodeCamp, and side projects that broke beautifully. Six sites for local businesses — real users, real deadlines, real invoices.'],
  ['(03)', '2019 — First job, real lessons', 'Brightside Agency: campaign pages to unforgiving specs, and a jQuery-to-React migration that taught me more than any tutorial ever had.'],
  ['(04)', '2021 — The craft years', 'Vertexwave Studio: twenty launches, three migrations, and the discovery that performance is a design decision.'],
  ['(05)', '2023 — Product depth', 'Lumen Digital: leading product frontends, building Atlas, and mentoring the developers I used to be.'],
  ['(06)', 'Now — Current focus', 'Interfaces that stay fast under feature pressure, motion with intent, and accessibility that never ships as an afterthought.'],
];

const PHILOSOPHY = [
  ['(01)', 'Performance first', 'A fast page is a respectful page. Budgets are set in the first meeting, not the last sprint.'],
  ['(02)', 'Accessibility by default', "If it only works for some users, it doesn't work. Semantics and keyboard paths ship with the first commit."],
  ['(03)', 'Clean architecture', 'The code you write in month one determines the speed of month twelve. Structure is a kindness to your future team.'],
  ['(04)', 'Design meets engineering', 'I push back with a better idea, not a shrug — and implement it better than the spec pictured.'],
  ['(05)', 'User-focused development', 'Every decision ends with the same question: what does the person using this feel?'],
];

const CAPABILITIES = [
  ['(01)', 'Frontend architecture', 'App structure, rendering strategy, state boundaries — the decisions that are expensive to reverse.'],
  ['(02)', 'React / Next.js applications', 'From greenfield products to careful migrations out of legacy codebases.'],
  ['(03)', 'Design systems', 'Tokens, primitives, documentation and the codemods that make adoption painless.'],
  ['(04)', 'Interactive experiences', 'GSAP and canvas work with a frame budget — motion that serves narrative.'],
  ['(05)', 'API integration', 'Typed clients, caching layers, optimistic UI, and failure states that tell the truth.'],
  ['(06)', 'Performance optimization', 'Profiling, budgets and Core Web Vitals rescue — measured in the field, not the lab.'],
];

const BEYOND = [
  ['01', 'Photography', 'Street and architecture — same obsession as UI: light, structure, timing.'],
  ['02', 'Mechanical keyboards', 'Built one. Tuned it. Regret nothing, hear everything.'],
  ['03', 'Long-distance running', 'Where the hard performance problems get solved, at 6 a.m.'],
  ['04', 'Chess, badly', '1300-rated optimism, endgame realism.'],
];

function LineRows({ rows }: { rows: string[][] }) {
  return (
    <div className="l-rows" data-reveal>
      {rows.map((r) => (
        <div className="l-row" key={r[1]}>
          <span className="no">{r[0]}</span>
          <h3>{r[1]}</h3>
          <p>{r[2]}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/about', 'About — Delin B', 'The story, philosophy, stack and career timeline of Delin B — frontend developer.')} />
      <JsonLd data={profilePageJsonLd()} />

      <PageHero
        eyebrow="ABOUT"
        title="A little about me."
        sub="A frontend developer in Chennai who believes the web works best when it's fast, kind and precisely made — in that order."
        meta="SIX YEARS · FOUR TEAMS · CHENNAI → EVERYWHERE"
      />

      <section className="sec first">
        <div className="wrap">
          <div className="split" data-reveal>
            <figure className="gsc">
              <SeedImage seed="db-portrait" w={900} h={680} alt="Portrait of Delin B" sizes="(max-width: 900px) 100vw, 560px" />
              <figcaption>Probably mid code-review</figcaption>
            </figure>
            <div>
              <h2 className="big">
                I got here by being
                <br />
                <span className="muted">stubborn about details.</span>
              </h2>
              <p className="body">
                I&apos;m Delin — a frontend developer who treats performance budgets like promises
                and semantics like load-bearing walls. I lead three product frontends at Lumen
                Digital and built the design system they all sit on.
              </p>
              <p className="body">
                Before that, an agency taught me speed, a studio taught me craft, and freelance
                clients taught me that &quot;it works on my machine&quot; is a confession, not a
                defense.
              </p>
              <p className="fact-line">DEVELOPER · DESIGNER · PROBLEM SOLVER · LEARNER · BUILDER</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="MY STORY"
            title={
              <>
                From view-source
                <br />
                to design systems.
              </>
            }
          />
          <LineRows rows={STORY} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="PHILOSOPHY" title="How I work, in five lines." />
          <LineRows rows={PHILOSOPHY} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="WHAT I DO"
            title="Capabilities, detailed."
            desc="Frontend architecture, React/Next.js applications, design systems, interactive experiences, API integration and performance optimization."
            link={['/services', 'As services']}
          />
          <LineRows rows={CAPABILITIES} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="TECH STACK" title="What I reach for." />
          <LineRows rows={STACK.map((s) => ['—', s[0], s[1]])} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="CAREER TIMELINE" title="Click an entry to expand it." />
          <VtTimeline list={CAREER} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="BEYOND CODE" title="The rest of the hard drive." />
          <div className="b-grid">
            {BEYOND.map((c, i) => (
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

      <Band eyebrow="NEXT STEP" title={<>Let&apos;s work <span className="muted">together.</span></>}>
        <div className="hero-ctas">
          <Link className="btn" href="/contact">
            Start a conversation
          </Link>
          <Link className="btn ghost" href="/projects">
            See the work first
          </Link>
        </div>
      </Band>
    </>
  );
}
