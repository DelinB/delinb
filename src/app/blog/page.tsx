import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/schema';
import { POSTS } from '@/data/content';
import { fmtDate } from '@/lib/utils';
import { PageHero, SectionHead } from '@/components/sections/shared';
import { BlogGrid } from '@/components/blog/blog-grid';
import { NewsletterForm } from '@/components/blog/newsletter-form';
import { SeedImage } from '@/components/ui/seed-image';
import { JsonLd } from '@/components/seo/json-ld';

export const metadata = buildMetadata({
  title: 'Blog — Delin B',
  description:
    "Thoughts, experiments and things I've learned — React performance, Next.js SEO, GSAP patterns and more.",
  path: '/blog',
});

export default function BlogPage() {
  const f = POSTS[0];

  return (
    <>
      <JsonLd data={webPageJsonLd('/blog', 'Blog — Delin B', "Thoughts, experiments and things I've learned — React performance, Next.js SEO, GSAP patterns and more.")} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />

      <PageHero
        eyebrow="BLOG"
        title={
          <>
            Thoughts, experiments
            <br />
            &amp; things I&apos;ve learned.
          </>
        }
        sub="Writing is how I check whether I actually understand something. Performance, accessibility, tooling — occasionally all three at once."
        meta={`${POSTS.length} ARTICLES · ZERO HOT TAKES`}
      />

      <section className="sec first">
        <div className="wrap">
          <div className="j-feat" data-reveal>
            <Link href={`/blog/${f.slug}`}>
              <SeedImage
                seed={f.seed}
                w={1200}
                h={640}
                alt={`Cover for ${f.title}`}
                sizes="(max-width: 1000px) 100vw, 660px"
              />
            </Link>
            <div className="j-feat-body">
              <p className="j-meta" style={{ margin: '0' }}>
                FEATURED · {f.cat.toUpperCase()} · {fmtDate(f.date)} · {f.read.toUpperCase()} READ
              </p>
              <h2>
                <Link href={`/blog/${f.slug}`}>{f.title}</Link>
              </h2>
              <p className="j-exc">{f.excerpt}</p>
              <span className="j-read" style={{ margin: '14px 0 0' }}>
                Read the article →
              </span>
            </div>
          </div>

          <BlogGrid posts={POSTS.slice(1)} />

          <div style={{ marginTop: '90px' }}>
            <SectionHead eyebrow="MOST READ" title="The popular ones." />
            <div className="pop-rows" data-reveal>
              {POSTS.filter((p) => p.pop).map((p, i) => (
                <div className="pop-row" key={p.slug}>
                  <span className="no">0{i + 1}</span>
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <span className="reads">{(p.pop ?? '').toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
