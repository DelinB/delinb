'use client';

import { useState } from 'react';
import { TESTIMONIALS } from '@/data/content';
import { SeedImage } from '@/components/ui/seed-image';
import { pad2 } from '@/lib/utils';

/** Home testimonial carousel with swap animation and prev/next controls. */
export function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const [swap, setSwap] = useState(false);
  const t = TESTIMONIALS[i];

  const show = (d: number) => {
    setI((prev) => (prev + d + TESTIMONIALS.length) % TESTIMONIALS.length);
    setSwap(false);
    requestAnimationFrame(() => setSwap(true));
  };

  return (
    <div className={`tst-card${swap ? ' swap' : ''}`} data-reveal>
      <p className="tst-quote" aria-live="polite">
        <span className="bracket">[</span> {t.q} <span className="bracket">]</span>
      </p>
      <div className="tst-meta">
        <div className="tst-who">
          <SeedImage seed={t.seed} w={96} h={96} alt={t.n} sizes="38px" />
          <strong>{t.n}</strong>
          <span>{t.r}</span>
        </div>
        <div className="tst-nav">
          <span className="tst-count mono">
            {pad2(i + 1)} / {pad2(TESTIMONIALS.length)}
          </span>
          <button className="tst-btn" onClick={() => show(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <button className="tst-btn" onClick={() => show(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
