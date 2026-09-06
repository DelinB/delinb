'use client';

import { useState } from 'react';
import type { Post } from '@/data/content';
import { PostCard } from '@/components/projects/project-card';
import { CATS } from '@/data/content';

/** Category filter for the blog grid — instant client-side filtering as in the source. */
export function BlogGrid({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState('All');
  const [pulse, setPulse] = useState(false);

  const list =
    filter === 'All' ? posts : posts.filter((p) => (p.cats ?? [p.cat]).includes(filter));

  const apply = (v: string) => {
    setFilter(v);
    setPulse(false);
    requestAnimationFrame(() => setPulse(true));
  };

  return (
    <>
      <div className="filters" data-reveal>
        {CATS.map((c) => (
          <button
            key={c}
            className={`tag${filter === c ? ' on' : ''}`}
            aria-pressed={filter === c}
            onClick={() => apply(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className={`j-grid${pulse ? ' fadein' : ''}`} id="bgrid" aria-live="polite">
        {list.length ? (
          list.map((p, i) => <PostCard key={p.slug} p={p} delay={i * 60} />)
        ) : (
          <p className="sec-desc" style={{ maxWidth: 'none' }}>
            No posts in this category yet — subscribe below and you&apos;ll get the first one.
          </p>
        )}
      </div>
    </>
  );
}
