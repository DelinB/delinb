import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/schema';
import { PROJECTS, MINIS } from '@/data/content';
import { PageHero, SectionHead, Band } from '@/components/sections/shared';
import { ProjectsGrid } from '@/components/projects/projects-grid';
import { SeedImage } from '@/components/ui/seed-image';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Projects — Delin B',
  description: 'Selected work: six projects with full case studies — SaaS, e-commerce, web apps and experiments.',
  path: '/projects',
});

export default function ProjectsPage() {
  const kessel = PROJECTS.find((p) => p.slug === 'kessel-commerce')!;

  return (
    <>
      <JsonLd data={webPageJsonLd('/projects', 'Projects — Delin B', 'Selected work: six projects with full case studies — SaaS, e-commerce, web apps and experiments.')} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])} />

      <PageHero
        eyebrow="SELECTED WORK"
        title={
          <>
            Projects that earned
            <br />
            their case studies.
          </>
        }
        sub="Six builds, six honest writeups — what the problem was, what I shipped, and what moved after launch."
        meta="06 PROJECTS · 24+ TECHNOLOGIES · 2021 — 2025"
      />

      <section className="sec first">
        <div className="wrap">
          <ProjectsGrid projects={PROJECTS} />

          <article className="pfeat" data-reveal>
            <SeedImage
              seed={kessel.img}
              w={1400}
              h={600}
              alt={`${kessel.name} — featured project`}
              sizes="(max-width: 900px) 100vw, 1400px"
            />
            <div className="pfeat-body">
              <div>
                <p className="pc-meta">
                  FEATURED · {kessel.cat.toUpperCase()} · {kessel.year}
                </p>
                <h2>{kessel.name}</h2>
                <p className="pc-blurb" style={{ maxWidth: '560px' }}>
                  {kessel.blurb} The full story — funnel research, editorial CMS blocks, a
                  one-page checkout, and a perfect Lighthouse score on every template.
                </p>
              </div>
              <Link className="btn dark" href={`/projects/${kessel.slug}`}>
                Read case study
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="MINI PROJECTS"
            title="Small experiments."
            desc="Concepts and prototypes too small for a case study and too fun to delete — all live in the playground."
            link={['/playground', 'Open playground']}
          />
          <div className="l-rows" data-reveal>
            {MINIS.map((m, i) => (
              <Link
                key={m.t}
                className="l-row"
                style={{ textDecoration: 'none' }}
                href="/playground"
              >
                <span className="no">0{i + 1}</span>
                <h3>{m.t}</h3>
                <p>{m.x}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Band
        eyebrow="YOUR PROJECT NEXT?"
        title={
          <>
            The next case study
            <br />
            has <span className="muted">your name on it.</span>
          </>
        }
      >
        <Link className="btn" href="/contact">
          Let&apos;s talk
        </Link>
      </Band>
    </>
  );
}
