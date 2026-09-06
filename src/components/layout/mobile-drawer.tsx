'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/site';
import { useDelayedUnmount, trapTabKey } from '@/components/system/dialog-utils';

interface MobileDrawerProps {
  open: boolean;
  segment: string;
  onClose: () => void;
}

const DRAWER_NAV = [
  { href: '/', label: 'Home', seg: '' },
  { href: '/about', label: 'About', seg: 'about' },
  { href: '/projects', label: 'Projects', seg: 'projects' },
  { href: '/skills', label: 'Skills', seg: 'skills' },
  { href: '/experience', label: 'Experience', seg: 'experience' },
  { href: '/services', label: 'Services', seg: 'services' },
  { href: '/resume', label: 'Resume', seg: 'resume' },
  { href: '/blog', label: 'Blog', seg: 'blog' },
  { href: '/playground', label: 'Playground', seg: 'playground' },
  { href: '/uses', label: 'Uses', seg: 'uses' },
  { href: '/testimonials', label: 'Testimonials', seg: 'testimonials' },
  { href: '/contact', label: 'Contact', seg: 'contact' },
];

/** Mobile drawer + scrim, with focus management and Escape-to-close. */
export function MobileDrawer({ open, segment, onClose }: MobileDrawerProps) {
  const mounted = useDelayedUnmount(open, 360);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) trapTabKey(panelRef.current, e);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <>
      <div className={`scrim${open ? ' on' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`drawer${open ? ' open' : ''}`}
        ref={panelRef}
        aria-label="Menu"
        {...(!open ? { inert: true } : {})}
      >
        <div className="dr-head">
          <Link href="/" className="hd-logo">
            DELIN B<small>FRONTEND · CHENNAI</small>
          </Link>
          <button className="dr-close" ref={closeBtnRef} aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>
        <nav>
          {DRAWER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.seg === segment ? 'on' : undefined}
              {...(item.seg === segment ? { 'aria-current': 'page' } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="dr-cta">
          <Link className="btn dark" href="/contact">
            Let&apos;s Work Together
          </Link>
        </div>
        <div className="dr-social">
          <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56C20.22 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.9v15.5H.5V8zm7.5 0h4.7v2.1h.1c.7-1.2 2.3-2.5 4.7-2.5 5 0 5.9 3.3 5.9 7.5v8.4h-4.9v-7.5c0-1.8 0-4-2.5-4s-2.8 1.9-2.8 3.9v7.6H8V8z" />
            </svg>
          </a>
          <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23z" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}
