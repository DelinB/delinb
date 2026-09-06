'use client';

import { useEffect, useState } from 'react';

/** Article table of contents with scrollspy, mirroring the source behavior. */
export function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const links = document.querySelectorAll<HTMLButtonElement>('[data-toc]');
    if (!links.length) return;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [headings]);

  return (
    <nav className="toc" aria-label="Table of contents" data-reveal>
      <b>On this page</b>
      {headings.map((h) => (
        <button
          key={h.id}
          data-toc={h.id}
          className={active === h.id ? 'on' : undefined}
          aria-current={active === h.id ? 'true' : undefined}
          onClick={() => {
            const el = document.getElementById(h.id);
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {h.text}
        </button>
      ))}
    </nav>
  );
}
