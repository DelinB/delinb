import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { SERVICES, PROCESS } from '@/data/content';
import { PageHero, SectionHead, Band } from '@/components/sections/shared';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Services — Delin B',
  description: 'Frontend development services and the six-step process behind them.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/services', 'Services — Delin B', 'Frontend development services and the six-step process behind them.')} />

      <PageHero
        eyebrow="SERVICES"
        title={
          <>
            What I can
            <br />
            do for you.
          </>
        }
        sub="Nine ways to hire the same skillset — from a one-week audit to a product frontend built end to end."
        meta="ONE ENGAGEMENT AT A TIME · FULL ATTENTION"
      />

      <section className="sec first">
        <div className="wrap">
          <SectionHead eyebrow="SERVICES" title="Pick the shape of the work." />
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <div
                key={s[0]}
                className="svc"
                data-reveal
                style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}
              >
                <span className="num">(0{i + 1})</span>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
                <ul>
                  {s[2].map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="PROCESS" title="How it goes, in six steps." />
          <div className="proc-grid">
            {PROCESS.map((p, i) => (
              <div
                key={p[1]}
                className="proc"
                data-reveal
                style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}
              >
                <span className="num">{p[0]}</span>
                <h3>{p[1]}</h3>
                <p>{p[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Band
        eyebrow="READY WHEN YOU ARE"
        title={
          <>
            Step one is
            <br />
            a <span className="muted">conversation.</span>
          </>
        }
      >
        <Link className="btn" href="/contact">
          Start the brief
        </Link>
      </Band>
    </>
  );
}
