import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd } from '@/lib/schema';
import { SKILL_CATS, SKILL_ENG } from '@/data/content';
import { PageHero, SectionHead, Band } from '@/components/sections/shared';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Skills — Delin B',
  description: 'Technical and engineering skills, mapped on a four-step matrix from beginner to expert.',
  path: '/skills',
});

const LEVELS: Record<string, { n: number; label: string }> = {
  beginner: { n: 1, label: 'Beginner' },
  intermediate: { n: 2, label: 'Intermediate' },
  advanced: { n: 3, label: 'Advanced' },
  expert: { n: 4, label: 'Expert' },
};

function SkillMatrix({ name, level }: { name: string; level: string }) {
  const lv = LEVELS[level] ?? LEVELS.beginner;
  return (
    <div className="mx-row">
      <h3>{name}</h3>
      <div className="mx" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <i key={i} className={i <= lv.n ? 'f' : undefined} />
        ))}
      </div>
      <span className="mx-lvl">
        {lv.label}
        <span className="sr-only"> — {lv.n} of 4</span>
      </span>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/skills', 'Skills — Delin B', 'Technical and engineering skills, mapped on a four-step matrix from beginner to expert.')} />

      <PageHero
        eyebrow="SKILLS"
        title={
          <>
            Depth over
            <br />
            percentages.
          </>
        }
        sub='No animated 87% bars. A four-step matrix — Beginner, Intermediate, Advanced, Expert — where Expert means "I can teach it and defend it."'
        meta="EXPERT = TEACHABLE · MEASURED IN SHIPPED WORK"
      />

      <section className="sec first">
        <div className="wrap">
          <SectionHead eyebrow="TECHNICAL SKILLS" title="The toolset." />
          <div className="mx-legend" data-reveal>
            <span>— Beginner</span>
            <span>—— Intermediate</span>
            <span>——— Advanced</span>
            <span>———— Expert</span>
          </div>
          {SKILL_CATS.map((c, ci) => (
            <div
              key={c.t}
              style={{ marginBottom: '40px', '--d': `${ci * 60}ms` } as React.CSSProperties}
              data-reveal
            >
              <p className="eyebrow" style={{ marginBottom: '8px' }}>
                {c.t}
              </p>
              <div className="mx-rows">
                {c.items.map(([name, level]) => (
                  <SkillMatrix key={name} name={name} level={level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="ENGINEERING SKILLS" title="The things between the tools." />
          <div className="l-rows" data-reveal>
            {SKILL_ENG.map((s, i) => (
              <div className="l-row" key={s[0]}>
                <span className="no">(0{i + 1})</span>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Band
        eyebrow="SEE IT APPLIED"
        title={
          <>
            Skills only count
            <br />
            when they <span className="muted">ship.</span>
          </>
        }
      >
        <Link className="btn" href="/projects">
          View the projects
        </Link>
      </Band>
    </>
  );
}
