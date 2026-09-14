'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECTS, POSTS } from '@/data/content';
import { SITE, ALL_PAGES } from '@/lib/site';
import { useToast } from '@/components/system/toast-provider';
import { useDelayedUnmount, trapTabKey } from '@/components/system/dialog-utils';

interface PaletteItem {
  g: string;
  t: string;
  s: string;
  go?: string;
  act?: 'copy' | 'print' | 'theme';
}

interface CommandPaletteProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggleTheme: () => void;
}

function buildIndex(): PaletteItem[] {
  const items: PaletteItem[] = [];
  ALL_PAGES.forEach((p) => items.push({ g: 'Pages', t: p.label, s: 'page', go: p.href }));
  PROJECTS.forEach((p) =>
    items.push({ g: 'Projects', t: p.name, s: p.cat.toLowerCase(), go: `/projects/${p.slug}` })
  );
  POSTS.forEach((p) =>
    items.push({ g: 'Writing', t: p.title, s: p.cat.toLowerCase(), go: `/blog/${p.slug}` })
  );
  items.push({ g: 'Actions', t: 'Copy email address', s: 'delinb23@gmail.com', act: 'copy' });
  items.push({ g: 'Actions', t: 'Download résumé (PDF)', s: 'print', go: '/resume', act: 'print' });
  items.push({ g: 'Actions', t: 'Toggle dark mode', s: 'theme', act: 'theme' });
  return items;
}

/**
 * ⌘K command palette — searches pages, projects, posts and actions.
 * Fully keyboard operable (↑↓ Enter Esc) with focus management.
 */
export function CommandPalette({ open, onClose, onToggleTheme }: CommandPaletteProps) {
  const mounted = useDelayedUnmount(open, 260);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  const all = useMemo(() => buildIndex(), []);
  const hits = useMemo(() => {
    const q = query.toLowerCase();
    return q ? all.filter((i) => `${i.t} ${i.s}`.toLowerCase().includes(q)) : all;
  }, [query, all]);

  const runItem = useCallback(
    (item: PaletteItem) => {
      onClose();
      if (item.act === 'copy') {
        navigator.clipboard
          ?.writeText(SITE.email)
          .then(() => toast('Email copied — talk soon.'))
          .catch(() => toast(SITE.email));
        return;
      }
      if (item.act === 'theme') {
        onToggleTheme();
        return;
      }
      if (item.go) {
        router.push(item.go);
        if (item.act === 'print') window.setTimeout(() => window.print(), 450);
      }
    },
    [onClose, onToggleTheme, router, toast]
  );

  // Reset search state when the palette opens or the query changes
  // (state adjusted during render — React's endorsed pattern).
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setSel(0);
    }
  }
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSel(0);
  }

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = 'hidden';
      return () => window.clearTimeout(t);
    }
    document.body.style.overflow = '';
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSel((s) => (hits.length ? (s + 1) % hits.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSel((s) => (hits.length ? (s - 1 + hits.length) % hits.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (hits[sel]) runItem(hits[sel]);
      } else if (e.key === 'Tab' && panelRef.current) {
        trapTabKey(panelRef.current, e);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    const active = document.getElementById(`cp-item-${sel}`);
    active?.scrollIntoView({ block: 'nearest' });
  }, [sel, hits]);

  if (!mounted) return null;

  let lastGroup = '';
  return (
    <div
      className={`ovl${open ? ' on' : ''}`}
      id="cmdk"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      ref={panelRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cp">
        <div className="cp-in">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" />
          </svg>
          <input
            id="cp-q"
            ref={inputRef}
            placeholder="Search pages, projects, posts…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            aria-label="Search pages, projects and posts"
            aria-activedescendant={hits[sel] ? `cp-item-${sel}` : undefined}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="cp-list" role="listbox" aria-label="Results">
          {hits.length === 0 ? (
            <p style={{ padding: '22px', fontSize: '12px', color: 'var(--ink-faint)' }}>
              No matches — try “project”, “blog”, “resume”…
            </p>
          ) : (
            hits.map((it, i) => {
              const groupHeader =
                it.g !== lastGroup ? (
                  <p className="cp-group" key={`g-${it.g}`}>
                    {it.g}
                  </p>
                ) : null;
              lastGroup = it.g;
              return (
                <div key={`${it.g}-${it.t}`}>
                  {groupHeader}
                  <button
                    type="button"
                    id={`cp-item-${i}`}
                    className={`cp-item${i === sel ? ' on' : ''}`}
                    role="option"
                    aria-selected={i === sel}
                    onMouseEnter={() => setSel(i)}
                    onClick={() => runItem(it)}
                  >
                    <b>{it.t}</b>
                    <span>{it.s}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="cp-foot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
