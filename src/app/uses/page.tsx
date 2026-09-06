import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { USES } from '@/data/content';
import { PageHero, SectionHead, Band } from '@/components/sections/shared';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Uses — Delin B',
  description: 'The hardware, software, stack and habits behind the output.',
  path: '/uses',
});

export default function UsesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/uses', 'Uses — Delin B', 'The hardware, software, stack and habits behind the output.')} />

      <PageHero
        eyebrow="USES"
        title={
          <>
            The tools behind
            <br />
            the output.
          </>
        }
        sub="Everything I use daily, with the honest reasons. Swap-friendly — none of this is a personality."
        meta="#010 EDITOR · #000 TERMINAL · #FFF ETHICS"
      />

      <section className="sec first">
        <div className="wrap">
          {USES.map((g, gi) => (
            <div
              key={g.g}
              style={{ marginBottom: '70px', '--d': `${gi * 40}ms` } as React.CSSProperties}
              data-reveal
            >
              <SectionHead eyebrow={g.g.toUpperCase()} title={g.g} desc="The honest version." />
              <div className="l-rows">
                {g.items.map((it) => (
                  <div className="l-row" key={it[0]}>
                    <span className="no">—</span>
                    <h3>{it[0]}</h3>
                    <p>{it[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Band
        eyebrow="SEE THE OUTPUT"
        title={
          <>
            Tools are the easy part.
            <br />
            <span className="muted">The work is the work.</span>
          </>
        }
      >
        <Link className="btn" href="/projects">
          See the projects
        </Link>
      </Band>
    </>
  );
}
