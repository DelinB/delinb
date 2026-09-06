'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Route-scoped reveal engine — the React equivalent of the source site's
 * `bindReveals()` / `bindCounters()` / `initSplitAuto()`:
 * - [data-reveal] elements fade/rise in once at 10% visibility
 * - [data-split] headings animate their split tokens once at 86% viewport
 * - [data-count] numbers count up once at 40% visibility
 * Re-runs whenever the route changes.
 */
export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.getElementById('app') ?? document;

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    const splitObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            splitObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 14% 0px' }
    );

    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target as HTMLElement);
            countObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    root.querySelectorAll?.('[data-reveal]').forEach((el) => revealObs.observe(el));
    root
      .querySelectorAll?.('[data-split]:not([data-split-manual])')
      .forEach((el) => splitObs.observe(el));
    root.querySelectorAll?.('[data-count]').forEach((el) => countObs.observe(el));

    return () => {
      revealObs.disconnect();
      splitObs.disconnect();
      countObs.disconnect();
    };
  }, [pathname]);

  return null;
}

function countUp(el: HTMLElement) {
  const end = parseFloat(el.dataset.count ?? '0');
  const suf = el.dataset.suffix ?? '';
  const t0 = performance.now();
  const dur = 900;
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(end * e) + suf;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
