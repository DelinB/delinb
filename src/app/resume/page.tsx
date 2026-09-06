import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd, personJsonLd } from '@/lib/schema';
import { EXP, STACK, PROJECTS } from '@/data/content';
import { SITE } from '@/lib/site';
import { PageHero } from '@/components/sections/shared';
import { PrintButton } from '@/components/interactive/cv-button';
import { CopyButton } from '@/components/ui/copy-button';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Résumé — Delin B',
  description:
    'Print-ready résumé of Delin B, frontend developer — experience, skills, projects and certifications.',
  path: '/resume',
});

export default function ResumePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/resume', 'Résumé — Delin B', 'Print-ready résumé of Delin B, frontend developer — experience, skills, projects and certifications.')} />
      <JsonLd data={personJsonLd()} />

      <PageHero
        eyebrow="RÉSUMÉ"
        title="The formal version."
        sub='One page, print-ready. Use "Save as PDF" in the print dialog for a clean copy.'
        meta="DELIN B · FRONTEND DEVELOPER · CHENNAI"
      />

      <section className="sec first" style={{ paddingBottom: '110px' }}>
        <div className="wrap">
          <div className="resume-actions" data-reveal>
            <PrintButton />
            <CopyButton className="tag" text={SITE.email} message="Email copied — talk soon.">
              Copy email
            </CopyButton>
            <p className="resume-note">
              Tip: choose &quot;Save as PDF&quot; as the destination in the print dialog.
            </p>
          </div>

          <div className="sheet" data-reveal>
            <div className="r-head">
              <p className="r-name">DELIN B</p>
              <p className="r-role">Frontend Developer</p>
              <p className="r-contact">
                Chennai, India (IST · UTC+5:30) · {SITE.email} · delinb.dev
                <br />
                github.com/delinb · linkedin.com/in/delinb
              </p>
            </div>

            <div className="r-sec">
              <h2>Summary</h2>
              <p>
                Frontend developer with six years across product, studio and agency work. Leads
                frontend architecture, design systems and performance programs. Ships interfaces
                that are fast, accessible and maintainable — and proves all three with numbers.
              </p>
            </div>

            <div className="r-sec">
              <h2>Experience</h2>
              {EXP.map((e) => (
                <div className="r-job" key={e.co}>
                  <b>
                    {e.role} — {e.co}
                  </b>
                  <p className="r-meta">
                    {e.y} · {e.loc}
                  </p>
                  <ul>
                    {e.resp.slice(0, 3).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                    <li>
                      <b>Key results:</b> {e.ach.join(' · ')}
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="r-sec">
              <h2>Education</h2>
              <div className="r-job">
                <b>B.E. Computer Science</b>
                <p className="r-meta">Anna University · 2015 — 2019</p>
              </div>
            </div>

            <div className="r-sec">
              <h2>Technical Skills</h2>
              <p>
                {STACK.map((s) => (
                  <span key={s[0]}>
                    {s[0]}: {s[1]}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            <div className="r-sec">
              <h2>Selected Projects</h2>
              {PROJECTS.slice(0, 3).map((p) => (
                <div className="r-job" key={p.slug}>
                  <b>{p.name}</b>
                  <p className="r-meta">
                    {p.cat} · {p.year} — {p.result}
                  </p>
                  <ul>
                    <li>{p.blurb}</li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="r-sec">
              <h2>Certifications</h2>
              <ul>
                <li>Meta Frontend Developer Professional Certificate — 2022</li>
                <li>Google Mobile Web Specialist — 2021</li>
              </ul>
            </div>

            <div className="r-sec" style={{ marginBottom: '0' }}>
              <h2>Achievements</h2>
              <ul>
                <li>100 Lighthouse performance on nine launches</li>
                <li>Median LCP 3.1s → 1.2s across three Lumen products</li>
                <li>Atlas design system: 68 components, 12 teams, 2.3× faster delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
