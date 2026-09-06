'use client';

import { useState } from 'react';
import type { Project } from '@/data/content';
import { ProjectCard } from '@/components/projects/project-card';

const FILTERS: [string, string][] = [
  ['all', 'All'],
  ['webapp', 'Web Apps'],
  ['saas', 'SaaS'],
  ['ecommerce', 'E-commerce'],
  ['dashboard', 'Dashboard'],
  ['landing', 'Landing'],
  ['experiments', 'Experiments'],
];

/** Category filter for the projects grid — instant client-side filtering as in the source. */
export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('all');
  const [pulse, setPulse] = useState(false);

  const list = filter === 'all' ? projects : projects.filter((p) => p.f.includes(filter));

  const apply = (v: string) => {
    setFilter(v);
    setPulse(false);
    requestAnimationFrame(() => setPulse(true));
  };

  return (
    <>
      <div className="filters" data-reveal>
        {FILTERS.map(([v, label], i) => (
          <button
            key={v}
            className={`tag${filter === v ? ' on' : ''}`}
            aria-pressed={filter === v}
            onClick={() => apply(v)}
            {...(i === 0 ? { 'aria-label': `Show all projects` } : {})}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className={`p-grid${pulse ? ' fadein' : ''}`}
        id="pgrid"
        aria-live="polite"
        key={filter}
      >
        {list.length ? (
          list.map((p) => <ProjectCard key={p.slug} p={p} />)
        ) : (
          <p className="sec-desc" style={{ maxWidth: 'none' }}>
            Nothing in this category yet — the playground has the fun parts.
          </p>
        )}
      </div>
    </>
  );
}
