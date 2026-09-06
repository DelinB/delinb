'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const COMMANDS: Record<string, string> = {
  home: '/',
  start: '/',
  about: '/about',
  projects: '/projects',
  experience: '/experience',
  blog: '/blog',
  resume: '/resume',
  contact: '/contact',
  skills: '/skills',
  services: '/services',
  uses: '/uses',
  playground: '/playground',
  testimonials: '/testimonials',
};

interface Line {
  text: string;
  cls: 'cmd' | 'err' | 'out';
}

/**
 * The 404 terminal: types out the failed route resolution, then accepts
 * commands (help / clear / route names). Port of initTerminal.
 */
export function NotFoundTerminal({ path = '' }: { path?: string }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const resolvedPath = path || window.location.pathname;
    const queue: Line[] = [
      { text: `route --resolve '${resolvedPath}'`, cls: 'cmd' },
      { text: '404 — component not found', cls: 'err' },
      { text: "the page you requested isn't part of this build.", cls: 'out' },
      { text: 'no cached fallback. no redirect. just this shell.', cls: 'out' },
      { text: "type 'help' for routes that exist.", cls: 'out' },
    ];

    let qi = 0;
    let ci = 0;
    let current: Line | null = null;

    const step = () => {
      if (qi >= queue.length) {
        setTyping(false);
        setShowInput(true);
        return;
      }
      const item = queue[qi];
      if (!current) {
        current = { text: '', cls: item.cls };
        setLines((prev) => [...prev, current!]);
        ci = 0;
      }
      if (ci < item.text.length) {
        const ch = item.text[ci++];
        setLines((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last) next[next.length - 1] = { ...last, text: last.text + ch };
          return next;
        });
        timers.current.push(window.setTimeout(step, 13));
      } else {
        current = null;
        qi++;
        timers.current.push(window.setTimeout(step, 200));
      }
    };
    timers.current.push(window.setTimeout(step, 350));

    return () => timers.current.forEach(window.clearTimeout);
  }, [path]);

  useEffect(() => {
    if (showInput) inputRef.current?.focus();
  }, [showInput]);

  // term-run events from the quick-navigation chips.
  useEffect(() => {
    const onTermRun = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setShowInput(true);
      run(detail);
    };
    document.addEventListener('term-run', onTermRun as EventListener);
    return () => document.removeEventListener('term-run', onTermRun as EventListener);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const v = (raw || '').trim().toLowerCase();
    if (!v) return;
    setLines((prev) => [...prev, { text: v, cls: 'cmd' }]);
    if (v === 'clear') {
      setLines([]);
      return;
    }
    if (v === 'help') {
      setLines((prev) => [
        ...prev,
        { text: 'available commands:', cls: 'out' },
        { text: '  home · projects · blog · about · experience', cls: 'out' },
        { text: '  skills · services · resume · uses · contact', cls: 'out' },
        { text: '  clear — wipe this shell', cls: 'out' },
      ]);
      return;
    }
    if (COMMANDS[v]) {
      setLines((prev) => [...prev, { text: `→ resolving ${COMMANDS[v]} …`, cls: 'out' }]);
      window.setTimeout(() => router.push(COMMANDS[v]), 420);
      return;
    }
    setLines((prev) => [...prev, { text: `command not found: ${v} — try 'help'`, cls: 'err' }]);
  };

  return (
    <div className="term" data-reveal style={{ '--d': '160ms' } as React.CSSProperties}>
      <div className="term-bar">
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <span>delin@portfolio: ~</span>
      </div>
      <div className="term-body" id="term-body" ref={bodyRef} aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={`t-line ${l.cls}`}>
            {l.cls === 'cmd' ? <span className="t-p">$</span> : null}
            {l.text}
          </div>
        ))}
        {typing ? <span className="t-cursor" aria-hidden="true" /> : null}
      </div>
      <div className="t-in" id="t-in" style={{ display: showInput ? 'flex' : 'none' }}>
        <span className="t-p">$</span>
        <label htmlFor="t-in-input" className="sr-only">
          Terminal command input
        </label>
        <input
          id="t-in-input"
          ref={inputRef}
          autoComplete="off"
          spellCheck={false}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              run(input);
              setInput('');
            }
          }}
        />
      </div>
    </div>
  );
}

/** Quick-navigation chips that feed commands into the terminal. */
export function TermChip({ label }: { label: string }) {
  return (
    <button
      className="tag"
      data-term={label}
      onClick={() => {
        document.dispatchEvent(new CustomEvent('term-run', { detail: label }));
      }}
    >
      {label}
    </button>
  );
}
