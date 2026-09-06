'use client';

import { useState } from 'react';
import type { Faq } from '@/data/content';

/**
 * FAQ accordion — same visuals as the source (plus/minus rotation,
 * smooth expand), animated via CSS grid-rows instead of JS-measured
 * max-height. Buttons carry aria-expanded + aria-controls.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f[0]}
            className={`faq-item${isOpen ? ' open' : ''}`}
            data-reveal
            style={{ '--d': `${i * 40}ms` } as React.CSSProperties}
          >
            <h3>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="q">{f[0]}</span>
                <span className="pm" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
              <p>{f[1]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
