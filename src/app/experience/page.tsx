import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { EXP, CAREER } from '@/data/content';
import { PageHero, SectionHead, Band, SbStat, TagRow } from '@/components/sections/shared';
import { VtTimeline } from '@/components/sections/vt-timeline';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Experience — Delin B',
  description: 'Six years, four teams — responsibilities and measurable outcomes for every role.',
  path: '/experience',
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/experience', 'Experience — Delin B', 'Six years, four teams — responsibilities and measurable outcomes for every role.')} />

      <PageHero
        eyebrow="EXPERIENCE"
        title={
          <>
            Six years, four teams,
            <br />
            measurable outcomes.
          </>
        }
        sub="Responsibilities tell you what I did. Achievements tell you what changed. Both are below — the numbers are the point."
        meta="2023 — NOW · SENIOR FRONTEND DEVELOPER"
      />

      <section className="sec first">
        <div className="wrap">
          <SectionHead eyebrow="PROFESSIONAL EXPERIENCE" title="Where, what, and what moved." />
          {EXP.map((e, i) => (
            <div
              className="tl"
              key={e.co}
              data-reveal
              style={{ '--d': `${i * 60}ms`, marginBottom: '14px' } as React.CSSProperties}
            >
              <div className="tl-row">
                <div className="tl-year">
                  {e.y}
                  <br />
                  <span style={{ color: 'var(--ink)' }}>{e.loc}</span>
                </div>
                <div className="tl-body">
                  <h3>
                    {e.role} — {e.co}
                  </h3>
                  <p className="tl-co">{e.loc}</p>
                  <p>{e.desc}</p>
                  <ul>
                    {e.resp.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <div className="tl-ach">
                    {e.ach.map((a) => (
                      <b key={a}>↳ {a}</b>
                    ))}
                  </div>
                  <div style={{ marginTop: '18px' }}>
                    <TagRow tags={e.tags} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="TIMELINE" title="The whole arc — click to expand." />
          <VtTimeline list={CAREER} />
        </div>
      </section>

      <section className="sec stats-band">
        <div className="wrap">
          <SectionHead eyebrow="SELECTED ACHIEVEMENTS" title="Numbers, not adjectives." />
          <div className="sb-grid" data-reveal>
            <SbStat value="100" text="Lighthouse performance, nine separate launches." />
            <SbStat value="−61" suffix="%" text="LCP at Aurora — the case study on the home page." />
            <SbStat value="68" text="Components in Atlas, adopted by 12 product teams." />
            <SbStat value="−44" suffix="%" text="Support tickets after the Pulse booking rebuild." />
          </div>
        </div>
      </section>

      <Band
        eyebrow="PAPER TRAIL"
        title={
          <>
            Prefer the formal
            <br />
            <span className="muted">version?</span>
          </>
        }
      >
        <Link className="btn" href="/resume">
          View the résumé
        </Link>
      </Band>
    </>
  );
}
