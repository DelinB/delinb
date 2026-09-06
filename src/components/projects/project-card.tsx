import Link from 'next/link';
import type { Project, Post } from '@/data/content';
import { SeedImage } from '@/components/ui/seed-image';
import { TagRow } from '@/components/sections/shared';
import { fmtDate } from '@/lib/utils';

/** Compact project card — the `.pc` partial used in the projects grid. */
export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="pc" data-reveal>
      <Link className="pc-media" href={`/projects/${p.slug}`}>
        <SeedImage seed={p.img} w={900} h={560} alt={`${p.name} — interface`} sizes="(max-width: 900px) 100vw, 640px" />
      </Link>
      <div className="pc-body">
        <p className="pc-meta">{p.cat.toUpperCase()} · {p.year}</p>
        <h2>
          <Link href={`/projects/${p.slug}`}>{p.name}</Link>
        </h2>
        <p className="pc-role">ROLE — {p.role.toUpperCase()}</p>
        <p className="pc-blurb">{p.blurb}</p>
        <p className="pc-result">↳ {p.result}</p>
        <TagRow tags={p.tags.slice(0, 4)} />
        <div className="pc-links">
          <Link href={`/projects/${p.slug}`}>Case Study</Link>
          <a href={p.demo} target="_blank" rel="noopener noreferrer">
            Live ↗
          </a>
          <a href={p.gh} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </article>
  );
}

/** Journal / post card — the `.j-card` partial. */
export function PostCard({ p, delay = 0 }: { p: Post; delay?: number }) {
  return (
    <article className="j-card" data-reveal style={{ '--d': `${delay}ms` } as React.CSSProperties}>
      <Link className="j-media" href={`/blog/${p.slug}`}>
        <SeedImage seed={p.seed} w={880} h={520} alt={`Cover for ${p.title}`} sizes="(max-width: 1000px) 100vw, 380px" />
      </Link>
      <p className="j-meta">
        {p.cat.toUpperCase()} · {fmtDate(p.date)} · {p.read.toUpperCase()} READ
      </p>
      <h3>
        <Link href={`/blog/${p.slug}`}>{p.title}</Link>
      </h3>
      <p className="j-exc">{p.excerpt}</p>
      <span className="j-read">Read article →</span>
    </article>
  );
}
