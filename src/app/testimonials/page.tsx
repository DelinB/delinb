import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { TESTIMONIALS } from '@/data/content';
import { PageHero, SectionHead, Band, SbStat } from '@/components/sections/shared';
import { SeedImage } from '@/components/ui/seed-image';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Testimonials — Delin B',
  description: 'What PMs, founders and designers say about working with Delin B.',
  path: '/testimonials',
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/testimonials', 'Testimonials — Delin B', 'What PMs, founders and designers say about working with Delin B.')} />

      <PageHero
        eyebrow="TESTIMONIALS"
        title={
          <>
            Words from the people
            <br />
            I&apos;ve built with.
          </>
        }
        sub="PMs, founders, directors and designers — the five references I'd give any client, printed in full."
        meta="05 QUOTES · 0 EDITS"
      />

      <section className="sec first">
        <div className="wrap">
          <SectionHead eyebrow="COLLABORATION STATS" title="The aggregate." />
          <div
            className="sb-grid"
            data-reveal
            style={{ borderTop: '1px solid var(--line)', paddingTop: '44px' }}
          >
            <SbStat value="42" text="Projects completed and shipped to production." animate />
            <SbStat value="18" text="Clients — from two-person startups to banks." animate />
            <SbStat value="24" text="Technologies used in anger, not in tutorials." animate />
            <SbStat value="6" suffix="+" text="Years of writing frontend for actual humans." animate />
          </div>

          <div style={{ marginTop: '90px' }}>
            <SectionHead eyebrow="CLIENT TESTIMONIALS" title="The full quotes." />
            <div className="t-grid">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={t.n}
                  className="t-card"
                  data-reveal
                  style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}
                >
                  <SeedImage seed={t.seed} w={120} h={120} alt={t.n} sizes="44px" />
                  <q>{t.q}</q>
                  <figcaption className="t-who">
                    <b>{t.n}</b>
                    <span>{t.r}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Band
        eyebrow="REFERENCES AVAILABLE"
        title={
          <>
            Want to talk to them
            <br />
            <span className="muted">yourself?</span>
          </>
        }
      >
        <Link className="btn" href="/contact">
          Ask for an intro
        </Link>
      </Band>
    </>
  );
}
