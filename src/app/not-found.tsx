import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { NotFoundTerminal, TermChip } from '@/components/sections/not-found-terminal';
import { SplitText } from '@/components/interactive/split-text';

export const metadata: Metadata = {
  ...buildMetadata({ title: '404 — Delin B', description: 'Page not found.', path: '/404' }),
  robots: { index: false, follow: true },
};

/**
 * 404 — dark terminal page. The inline script flags the dark hero
 * pre-paint so the header stays transparent over it, as in the source.
 */
export default function NotFound() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: 'document.documentElement.dataset.darkhero="1";',
        }}
      />
      <section className="nf">
        <div className="wrap">
          <p className="eyebrow" data-reveal>
            ERROR 404 — ROUTE NOT RESOLVED
          </p>
          <h1 className="nf-title">
            <SplitText mode="words" shift={30} blur={8}>
              Looks like this component
              <br />
              wasn&apos;t found.
            </SplitText>
          </h1>
          <NotFoundTerminal />
          <div className="term-chips" data-reveal style={{ '--d': '220ms' } as React.CSSProperties}>
            <TermChip label="home" />
            <TermChip label="projects" />
            <TermChip label="blog" />
            <TermChip label="help" />
          </div>
          <div className="nf-links" data-reveal style={{ '--d': '280ms' } as React.CSSProperties}>
            <Link className="btn" href="/">
              Back Home
            </Link>
            <Link className="btn ghost" href="/projects">
              View Projects
            </Link>
            <Link className="btn ghost" href="/blog">
              Read Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
