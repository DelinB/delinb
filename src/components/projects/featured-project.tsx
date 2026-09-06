import Link from 'next/link';
import type { Project } from '@/data/content';
import { SeedImage } from '@/components/ui/seed-image';
import { TagRow } from '@/components/sections/shared';

/** Featured project row — the `.fp` partial used on the home page. */
export function FeaturedProject({ p, index }: { p: Project; index: number }) {
  return (
    <article className={`fp${index % 2 ? ' rev' : ''}`} data-reveal>
      <Link className="fp-media" href={`/projects/${p.slug}`}>
        <SeedImage seed={p.img} w={1000} h={700} alt={`${p.name} — interface`} sizes="(max-width: 900px) 100vw, 840px" />
      </Link>
      <div className="fp-body">
        <p className="fp-meta">
          0{index + 1} · {p.cat.toUpperCase()} · {p.year}
        </p>
        <h3>
          <Link href={`/projects/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="fp-role">ROLE — {p.role.toUpperCase()}</p>
        <p className="fp-blurb">{p.blurb}</p>
        <p className="fp-result">↳ {p.result}</p>
        <TagRow tags={p.tags.slice(0, 4)} />
        <div className="fp-links">
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
