'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

export default function SlideDeck({ children, labels = [] }) {
  const deckRef = useRef(null);
  const [active, setActive] = useState(0);
  const slides = (Array.isArray(children) ? children : [children]).flat();

  // track which slide is in view
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const els = [...deck.querySelectorAll('.deck-slide')];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(els.indexOf(entry.target));
        }
      },
      { root: deck, threshold: 0.55 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides.length]);

  const goTo = useCallback((i) => {
    const els = deckRef.current?.querySelectorAll('.deck-slide');
    els?.[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // arrow / page keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      const last = slides.length - 1;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goTo(Math.min(active + 1, last));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo, slides.length]);

  return (
    <div className="deck" ref={deckRef}>
      <nav className="hero-index deck-index" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="rule" aria-hidden="true" />}
            <button
              type="button"
              className={i === active ? 'is-active' : ''}
              aria-current={i === active ? 'true' : undefined}
              aria-label={labels[i] ?? `Slide ${i + 1}`}
              onClick={() => goTo(i)}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          </Fragment>
        ))}
      </nav>

      {slides.map((slide, i) => (
        <div key={i} className={`deck-slide${i === active ? ' is-active' : ''}`}>
          {slide}
        </div>
      ))}
    </div>
  );
}