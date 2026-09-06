'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { PRIMARY_NAV, SITE } from '@/lib/site';
import { MobileDrawer } from './mobile-drawer';
import { CommandPalette } from './command-palette';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useEffect : useEffect;

/** First path segment — used to mark the active nav item, as in the source. */
function activeSegment(pathname: string | null): string {
  if (!pathname) return '';
  return pathname.replace(/^\//, '').split('/')[0] ?? '';
}

/**
 * Header + mobile drawer + command palette. Mirrors the source site's
 * fixed header: transparent over dark heroes, "solid" once scrolled
 * or on light-hero routes.
 */
export function SiteChrome() {
  const [solid, setSolid] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const cmdkBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll / route dependent header state (pre-paint on hydration).
  useIsomorphicLayoutEffect(() => {
    const isDark =
      pathname === '/' || document.documentElement.dataset.darkhero === '1';
    const sync = () => setSolid(!isDark || window.scrollY > 40);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, [pathname]);

  // Close overlays on route change (state adjusted during render,
  // the React-endorsed pattern for reacting to prop/state changes).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setDrawerOpen(false);
    setPaletteOpen(false);
  }

  // ⌘K / Ctrl+K toggles the palette; Escape closes (palette first).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        setPaletteOpen((v) => {
          if (v) {
            cmdkBtnRef.current?.focus();
            return false;
          }
          return v;
        });
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const seg = activeSegment(pathname);

  return (
    <>
      <header className={`hd${solid ? ' solid' : ''}`} id="hd">
        <div className="hd-in">
          <Link href="/" className="hd-logo">
            DELIN B<small>FRONTEND · CHENNAI</small>
          </Link>
          <nav className="hd-nav" aria-label="Primary">
            {PRIMARY_NAV.map((item) => {
              const on = item.href.replace(/^\//, '') === seg;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={on ? 'on' : undefined}
                  {...(on ? { 'aria-current': 'page' } : {})}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hd-actions">
            <span className="hd-status">
              <i className="dot" aria-hidden="true" />
              Available
            </span>
            <button
              className="hd-theme"
              aria-label="Toggle dark mode"
              aria-pressed={resolvedTheme === 'dark'}
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              <svg className="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
              <svg className="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
            <button
              className="hd-cmd"
              ref={cmdkBtnRef}
              aria-label="Open command palette"
              onClick={() => setPaletteOpen(true)}
            >
              ⌘ K
            </button>
            <button
              className="burger"
              ref={burgerRef}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        segment={seg}
        onClose={() => {
          setDrawerOpen(false);
          burgerRef.current?.focus();
        }}
      />
      <CommandPalette
        open={paletteOpen}
        onOpen={() => setPaletteOpen(true)}
        onClose={() => {
          setPaletteOpen(false);
          cmdkBtnRef.current?.focus();
        }}
        onToggleTheme={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      />
      <span className="sr-only" aria-hidden="true">
        {SITE.email}
      </span>
    </>
  );
}
