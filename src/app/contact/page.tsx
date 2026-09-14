import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/schema';
import { FAQS } from '@/data/content';
import { SITE } from '@/lib/site';
import { PageHero, SectionHead } from '@/components/sections/shared';
import { ContactForm } from '@/components/contact/contact-form';
import { FaqList } from '@/components/interactive/faq-list';
import { CopyButton } from '@/components/ui/copy-button';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Contact — Delin B',
  description:
    'Start a project with Delin B — freelance and selective full-time availability, replies within 24 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd('/contact', 'Contact — Delin B', 'Start a project with Delin B — freelance and selective full-time availability, replies within 24 hours.')} />
      <JsonLd data={faqJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />

      <PageHero
        eyebrow="CONTACT"
        title={
          <>
            Let&apos;s build something
            <br />
            <span className="muted">great.</span>
          </>
        }
        sub="Tell me what you're making, when you need it, and roughly what it's worth to get right. I reply within 24 hours."
        meta="REPLIES WITHIN 24H · IST (UTC+5:30)"
        split="letters"
      />

      <section className="sec first" style={{ paddingBottom: '120px' }}>
        <div className="wrap">
          <div className="con-grid">
            <div className="con-info" data-reveal>
              <div className="ci-row">
                <b>Email</b>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <CopyButton
                  className="mini-btn !ml-3"
                  text={SITE.email}
                  message="Email copied — talk soon."
                  ariaLabel="Copy email address"
                >
                  copy
                </CopyButton>
              </div>
              <div className="ci-row">
                <b>LinkedIn</b>
                <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  https://www.linkedin.com/in/delin-webdev/  ↗
                </a>
              </div>
              <div className="ci-row">
                <b>GitHub</b>
                <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer">
                  github.com/delinb ↗
                </a>
              </div>
              <div className="ci-row">
                <b>Location</b>
                <span>Chennai, India · IST (UTC+5:30)</span>
              </div>
              <div className="ci-row">
                <b>Availability</b>
                <span>
                  <i className="dot" style={{ marginRight: '8px' }} aria-hidden="true" />
                  Open to freelance &amp; selective full-time
                </span>
              </div>
            </div>

            <div className="c-panel" data-reveal style={{ '--d': '80ms' } as React.CSSProperties}>
              <h2>Project brief</h2>
              <p className="lead">
                The more specific you are, the more specific my reply will be. Rough scope is fine
                — &quot;a landing page for X by late March&quot; is a great start.
              </p>
              <ContactForm />
            </div>
          </div>

          <div style={{ marginTop: '90px' }}>
            <SectionHead eyebrow="FAQ" title="Questions I actually get asked." />
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
