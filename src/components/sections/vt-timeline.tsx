'use client';

import { useState } from 'react';
import type { CareerEntry } from '@/data/content';

/**
 * Vertical career timeline — click (or Enter/Space) an entry to expand it.
 * Same markup and class-driven max-height transition as the source `.vt` partial.
 */
export function VtTimeline({ list, openLast = true }: { list: CareerEntry[]; openLast?: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(openLast ? list.length - 1 : null);

  return (
    <div className="vt" data-reveal>
      {list.map((c, i) => {
        const open = openIdx === i;
        return (
          <div
            key={c.t}
            className={`vt-item${open ? ' open' : ''}`}
            tabIndex={0}
            role="button"
            aria-expanded={open}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('.vt-more')) return;
              setOpenIdx(open ? null : i);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenIdx(open ? null : i);
              }
            }}
          >
            <span className="vt-year">{c.y}</span>
            <span className="vt-rail">
              <i />
            </span>
            <div className="vt-body">
              <h3>{c.t}</h3>
              <p className="vt-co">{c.co}</p>
              <p className="vt-sum">{c.sum}</p>
              <div className="vt-more">
                <p>{c.more}</p>
              </div>
            </div>
            <span className="vt-pm" aria-hidden="true">
              +
            </span>
          </div>
        );
      })}
    </div>
  );
}
