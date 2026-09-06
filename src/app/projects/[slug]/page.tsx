import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PROJECTS } from '@/data/content';
import { buildMetadata } from '@/lib/seo';
import { creativeWorkJsonLd, breadcrumbJsonLd } from '@/lib/schema';
import { SplitText } from '@/components/interactive/split-text';
import { TagRow } from '@/components/sections/shared';
import { SeedImage } from '@/components/ui/seed-image';
import { JsonLd } from '@/components/seo/json-ld';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return buildMetadata({ title: '404 — Delin B', description: 'Page not found.', path: '/404' });
  return buildMetadata({
    title: `${p.name} — Case Study — Delin B`,
    description: p.blurb,
    path: `/projects/${p.slug}`,
  });
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

const DEVICES = ['Desktop', 'Tablet', 'Mobile'];

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = PROJECTS.indexOf(p);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      {(() => {
        const ld = creativeWorkJsonLd(p.slug);
        return ld ? <JsonLd data={ld} /> : null;
      })()}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />

      <section className="cs-hero">
        <div className="wrap">
          <p className="cs-crumbs" data-reveal>
            <Link href="/projects">Projects</Link> / {p.name}
          </p>
          <h1 className="cs-title">
            <SplitText mode="words" shift={34} blur={10}>
              {p.name}
              <br />
              <span className="muted">{p.cat}</span>
            </SplitText>
          </h1>
          <dl className="cs-meta" data-reveal style={{ '--d': '200ms' } as React.CSSProperties}>
            <div>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{p.duration}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{p.cat}</dd>
            </div>
          </dl>
          <div className="cs-img" data-reveal style={{ '--d': '260ms' } as React.CSSProperties}>
            <SeedImage
              seed={p.img}
              w={1400}
              h={660}
              alt={`${p.name} — hero visual`}
              priority
              sizes="(max-width: 1440px) 100vw, 1400px"
            />
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="cs-col">
          <section className="cs-sec" data-reveal>
            <h2>Overview</h2>
            <p>{p.overview}</p>
          </section>

          <section className="cs-sec" data-reveal>
            <div className="duo">
              <div>
                <h3>The Challenge</h3>
                <p>{p.challenge}</p>
              </div>
              <div>
                <h3>The Objective</h3>
                <p>{p.objective}</p>
              </div>
            </div>
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Process</h2>
            {p.process.map((s, i) => (
              <div className="l-row" key={s.t}>
                <span className="no">(0{i + 1})</span>
                <h3>{s.t}</h3>
                <p>{s.x}</p>
              </div>
            ))}
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Tech Stack</h2>
            <div className="l-rows">
              {p.tech.map((t) => (
                <div className="l-row" key={t}>
                  <span className="no">—</span>
                  <h3>{t.split(' ').slice(0, 3).join(' ')}</h3>
                  <p>{t}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '22px' }}>
              <TagRow tags={p.tags} />
            </div>
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Key Features</h2>
            {p.features.map((f, i) => (
              <div className={`feat-block${i % 2 ? ' rev' : ''}`} key={f.t}>
                <div className="fb-img">
                  <SeedImage seed={f.img} w={800} h={500} alt={f.t} sizes="(max-width: 900px) 100vw, 520px" />
                </div>
                <div>
                  <h3>{f.t}</h3>
                  <p>{f.x}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Responsive Design</h2>
            <div className="resp">
              {p.responsive.map((r, i) => (
                <div className="resp-card" key={DEVICES[i]}>
                  <b>{DEVICES[i]}</b>
                  <SeedImage
                    seed={`${p.img}-r${i}`}
                    w={420}
                    h={i === 0 ? 280 : 540}
                    alt={`${DEVICES[i]} layout`}
                    className={i === 0 ? 'resp-desktop' : 'resp-mobile'}
                  />
                  <p>{r}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Animation &amp; Interaction</h2>
            <p>{p.anim}</p>
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Performance</h2>
            <div className="metrics" style={{ marginBottom: '26px' }}>
              {p.perf.map((m) => (
                <div className="mt-card" key={m.l}>
                  <div className="mt-num">{m.n}</div>
                  <div className="mt-lab">{m.l}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-sec" data-reveal>
            <h2>SEO &amp; Accessibility</h2>
            {p.seo.map((s) => (
              <p className="chk" key={s}>
                {CHECK}
                <span>{s}</span>
              </p>
            ))}
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Challenges &amp; Solutions</h2>
            {p.challenges.map((c) => (
              <div className="chs-row" key={c.p}>
                <div className="prob">
                  <h3>Problem</h3>
                  <p>{c.p}</p>
                </div>
                <div>
                  <h3>Solution</h3>
                  <p>{c.s}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Results</h2>
            <div className="metrics" style={{ marginBottom: '26px' }}>
              {p.results.map((m) => (
                <div className="mt-card" key={m.l}>
                  <div className="mt-num">{m.n}</div>
                  <div className="mt-lab">{m.l}</div>
                </div>
              ))}
            </div>
            <p>{p.resultNote}</p>
          </section>

          <section className="cs-sec" data-reveal>
            <h2>Final Screens</h2>
            <div className="gallery">
              {p.gallery.map((g) => (
                <SeedImage key={g} seed={g} w={900} h={560} alt={`${p.name} — final screen`} sizes="(max-width: 900px) 100vw, 640px" />
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="wrap">
        <Link className="next-proj" href={`/projects/${next.slug}`} data-reveal>
          <p className="eyebrow">NEXT CASE STUDY</p>
          <h3>
            {next.name} <span>→</span>
          </h3>
          <p>
            {next.cat} · {next.year} — {next.result}
          </p>
        </Link>
      </div>
    </>
  );
}
