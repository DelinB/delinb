'use client';

import { useState } from 'react';
import type { PlaygroundItem } from '@/data/content';
import { Demo, ExperimentOverlay } from './demos';

interface ActiveExperiment {
  id: string;
  title: string;
  hint: string;
  tags: string[];
  index: number;
}

/** Playground grid: eight live demos, each openable in an enlarged modal. */
export function PlaygroundGrid({ items }: { items: PlaygroundItem[] }) {
  const [experiment, setExperiment] = useState<ActiveExperiment | null>(null);
  const [returnFocus, setReturnFocus] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <div className="pg-grid">
        {items.map((g, i) => (
          <article
            key={g.id}
            className="pg-card"
            data-reveal
            style={{ '--d': `${(i % 2) * 60}ms` } as React.CSSProperties}
          >
            <div className="pg-demo">
              <Demo id={g.id} />
              <span className="pg-hint">{g.hint}</span>
            </div>
            <div className="pg-info">
              <p className="eyebrow">EXP 0{i + 1}</p>
              <h2>{g.t}</h2>
              <p>{g.x}</p>
              <div className="tag-row" style={{ margin: 'auto 0 0', paddingTop: '12px' }}>
                {g.tags.map((t) => (
                  <span key={t} className="tag sm">
                    {t}
                  </span>
                ))}
              </div>
              <button
                className="pg-view"
                type="button"
                onClick={(e) => {
                  setReturnFocus(e.currentTarget);
                  setExperiment({ id: g.id, title: g.t, hint: g.hint, tags: g.tags, index: i + 1 });
                }}
              >
                View Experiment →
              </button>
            </div>
          </article>
        ))}
      </div>

      <ExperimentOverlay
        experiment={experiment}
        onClose={() => {
          setExperiment(null);
          returnFocus?.focus();
        }}
      />
    </>
  );
}
