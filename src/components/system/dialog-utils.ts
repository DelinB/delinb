'use client';

import { useEffect, useState } from 'react';

/**
 * Keeps an element mounted during its close transition, then unmounts it.
 *
 * While `active` is true the hook returns true synchronously (no state
 * involved, so dialogs mount on the very render they open). When `active`
 * becomes false the previous "open" state keeps the element mounted until
 * the fade-out timer elapses.
 */
export function useDelayedUnmount(active: boolean, delay = 260): boolean {
  const [staying, setStaying] = useState(active);

  useEffect(() => {
    if (active) {
      // Remember that we were open so the closing phase keeps the element
      // mounted. (The return value ignores this while active.)
      // Deliberate: tracks "was open" for the delayed unmount; no visual state depends on it.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStaying(true);
      return;
    }
    const t = window.setTimeout(() => setStaying(false), delay);
    return () => window.clearTimeout(t);
  }, [active, delay]);

  if (active) return true;
  return staying;
}

/** Catches Tab at the edges of a container and cycles focus inside it. */
export function trapTabKey(container: HTMLElement, e: KeyboardEvent) {
  const focusables = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
