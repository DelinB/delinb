import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { POSTS, type ContentBlock } from '@/data/content';
import { buildMetadata } from '@/lib/seo';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/schema';
import { SITE } from '@/lib/site';
import { slugify, fmtDate } from '@/lib/utils';
import { SplitText } from '@/components/interactive/split-text';
import { CodeBlock } from '@/components/blog/code-block';
import { Toc } from '@/components/blog/toc';
import { Comments } from '@/components/blog/comments';
import { ShareLinks } from '@/components/blog/share-links';
import { NewsletterForm } from '@/components/blog/newsletter-form';
import { PostCard } from '@/components/projects/project-card';
import { SeedImage } from '@/components/ui/seed-image';
import { JsonLd } from '@/components/seo/json-ld';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return buildMetadata({ title: '404 — Delin B', description: 'Page not found.', path: '/404' });
  return buildMetadata({
    title: `${p.title} — Delin B`,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    type: 'article',
    publishedTime: `${p.date}T00:00:00`,
    modifiedTime: `${p.updated ?? p.date}T00:00:00`,
    tags: p.cats ?? [p.cat],
  });
}

/** Process-flow diagram — port of the source diagramSVG generator. */
function Diagram({ nodes, cap }: { nodes: string[]; cap: string }) {
  const w = 136;
  const h = 52;
  const gap = 46;
  const total = nodes.length * w + (nodes.length - 1) * gap;
  return (
    <figure className="dg-fig" data-reveal>
      <div className="dg-scroll">
        <svg className="dg" viewBox={`0 0 ${total} ${h}`} width={total} height={h} role="img" aria-label={cap}>
          {nodes.map((label, i) => {
            const x = i * (w + gap);
            const cx = x + w / 2;
            const x1 = x + w + 10;
            const x2 = x + w + gap - 4;
            return (
              <g key={label}>
                <rect x={x} y={0} width={w} height={h} rx={4} />
                <text x={cx} y={30} textAnchor="middle">
                  {label}
                </text>
                {i < nodes.length - 1 ? (
                  <>
                    <line className="dg-a" x1={x1} y1={26} x2={x2 - 8} y2={26} />
                    <path className="dg-ah" d={`M${x2} 26 l-8 -4.5 0 9 z`} />
                  </>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>{cap}</figcaption>
    </figure>
  );
}

function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h2':
            return <h2 id={slugify(b.h)} key={i}>{b.h}</h2>;
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'code':
            return <CodeBlock lang={b.lang} src={b.x} key={i} />;
          case 'quote':
            return (
              <blockquote key={i}>
                <p>{b.x}</p>
                {b.by ? <cite>— {b.by}</cite> : null}
              </blockquote>
            );
          case 'img':
            return (
              <figure className="gsc art-cover" style={{ margin: '26px 0' }} key={i}>
                <SeedImage seed={b.seed} w={900} h={480} alt={b.alt} sizes="(max-width: 1000px) 100vw, 760px" />
                <figcaption>{b.cap ?? ''}</figcaption>
              </figure>
            );
          case 'diagram':
            return <Diagram nodes={b.nodes} cap={b.cap} key={i} />;
          case 'table':
            return (
              <table className="art-table" key={i}>
                <thead>
                  <tr>
                    {b.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((c, ci) => (
                        <td key={ci}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          default:
            return <p key={i}>{b.x}</p>;
        }
      })}
    </>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const h2s = p.blocks.filter((b): b is { t: 'h2'; h: string } => b.t === 'h2');
  const headings = h2s.map((h) => ({ id: slugify(h.h), text: h.h }));
  const related = POSTS.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      {(() => {
        const ld = articleJsonLd(p.slug);
        return ld ? <JsonLd data={ld} /> : null;
      })()}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: p.title, path: `/blog/${p.slug}` },
        ])}
      />

      <section className="art-head">
        <div className="wrap">
          <p className="art-kicker" data-reveal>
            {p.cat.toUpperCase()}
            {p.updated ? ` · UPDATED ${fmtDate(p.updated).toUpperCase()}` : ''}
          </p>
          <h1 className="art-title">
            <SplitText mode="words" shift={32} blur={10} dur={0.8}>
              {p.title}
            </SplitText>
          </h1>
          <p className="art-sub" data-reveal style={{ '--d': '220ms' } as React.CSSProperties}>
            {p.excerpt}
          </p>
          <div className="art-meta" data-reveal style={{ '--d': '280ms' } as React.CSSProperties}>
            <SeedImage seed="db-avatar" w={120} h={120} alt="Delin B" sizes="34px" />
            <span>Delin B · Frontend Developer</span>
            <span>·</span>
            <span>
              <time dateTime={p.date}>{fmtDate(p.date)}</time>
            </span>
            <span>·</span>
            <span>{p.read} read</span>
          </div>
          <div className="art-cover" data-reveal style={{ '--d': '340ms' } as React.CSSProperties}>
            <SeedImage
              seed={p.seed}
              w={1400}
              h={700}
              alt={`Cover — ${p.title}`}
              priority
              sizes="(max-width: 1440px) 100vw, 1400px"
            />
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="art">
          {headings.length ? <Toc headings={headings} /> : null}
          <div>
            <div className="art-body">
              <Blocks blocks={p.blocks} />
            </div>

            {p.takeaways ? (
              <div className="takeaway" data-reveal>
                <b>Key takeaways</b>
                <ul>
                  {p.takeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="author" data-reveal>
              <SeedImage seed="db-avatar" w={160} h={160} alt="Delin B" sizes="80px" />
              <div>
                <b>Written by Delin B</b>
                <p>
                  Frontend developer in Chennai — building fast, accessible interfaces and
                  writing down what works so it works twice.{' '}
                  <Link href="/about" style={{ color: 'var(--ink)' }}>
                    More about me →
                  </Link>
                </p>
              </div>
            </div>

            <ShareLinks title={p.title} url={`${SITE.url}/blog/${p.slug}`} />

            <Comments slug={p.slug} initial={p.cmts ?? []} />

            <div style={{ marginTop: '60px' }}>
              <p className="eyebrow" style={{ marginBottom: '20px' }}>
                RELATED READING
              </p>
              <div className="rel-grid">
                {related.map((r, i) => (
                  <PostCard key={r.slug} p={r} delay={i * 60} />
                ))}
              </div>
            </div>

            <NewsletterForm />
          </div>
        </div>
      </div>
    </>
  );
}
