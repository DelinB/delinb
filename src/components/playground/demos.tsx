'use client';

import { useEffect, useRef, useState } from 'react';
import { GlyphSpotlight } from './glyph-field';
import { trapTabKey, useDelayedUnmount } from '@/components/system/dialog-utils';
import { useToast } from '@/components/system/toast-provider';

/* ============================================================
   The eight playground experiments, ported from the source.
   Each demo manages its own listeners / rAF and cleans up.
   ============================================================ */

/** 02 — Magnetic button with elastic release. */
export function MagneticButton() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const b = btnRef.current;
    if (!zone || !b) return;

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      const cx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      const cy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
      b.style.transition = 'none';
      b.style.transform = `translate(${cx * 26}px,${cy * 15}px)`;
    };
    const onLeave = () => {
      b.style.transition = 'transform .65s cubic-bezier(.34,1.56,.64,1)';
      b.style.transform = 'translate(0,0)';
    };
    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerleave', onLeave);
    return () => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={zoneRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <button className="demo-btn" type="button" ref={btnRef}>
        Magnetic
      </button>
    </div>
  );
}

/** 03 — Text scramble decode on hover. */
export function ScrambleText() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = '!<>-_\\/[]{}—=+*^?#';
    const target = 'DESIGN, DECODED';
    let iv: number | undefined;

    const start = () => {
      let f = 0;
      window.clearInterval(iv);
      iv = window.setInterval(() => {
        f++;
        el!.textContent = target
          .split('')
          .map((ch, i) => (i < f * 2 ? ch : chars[(Math.random() * chars.length) | 0]))
          .join('');
        if (f * 2 >= target.length) {
          window.clearInterval(iv);
          el!.textContent = target;
        }
      }, 34);
    };
    el.addEventListener('pointerenter', start);
    return () => {
      el.removeEventListener('pointerenter', start);
      window.clearInterval(iv);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="demo-scramble mono"
      data-text="DESIGN, DECODED"
      style={{ textAlign: 'center' }}
    >
      DESIGN, DECODED
    </div>
  );
}

/** 04 — Perspective tilt card tracking the pointer. */
export function PerspectiveTilt() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const card = cardRef.current;
    if (!zone || !card) return;
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${-py * 12}deg) rotateY(${px * 14}deg)`;
    };
    const onLeave = () => {
      card.style.transform = '';
    };
    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerleave', onLeave);
    return () => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={zoneRef} className="demo-tilt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div className="dt-card" ref={cardRef}>
        <i />
        <b>LOOP / 001</b>
        <span>GSAP · CANVAS · 60FPS</span>
      </div>
    </div>
  );
}

/** 05 — Ripple field: dot grid carrying click ripples. */
export function RippleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const rctx = c.getContext('2d');
    if (!rctx) return;

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: { x: number; y: number }[] = [];
    let rip: { x: number; y: number; t: number }[] = [];
    let run = true;
    let w = 0;
    let h = 0;

    function build() {
      w = c!.clientWidth;
      h = c!.clientHeight;
      if (!w || !h) return;
      c!.width = w * dpr;
      c!.height = h * dpr;
      rctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = 16; y < h; y += 24) for (let x = 16; x < w; x += 24) pts.push({ x, y });
    }

    function col() {
      return document.documentElement.dataset.theme === 'dark' ? '236,237,240' : '20,20,25';
    }

    const draw = () => {
      const now = performance.now();
      rctx!.clearRect(0, 0, w, h);
      rip = rip.filter((r) => now - r.t < 1100);
      for (const p of pts) {
        let dy = 0;
        let a = 0.2;
        let rr = 1.4;
        for (const rp of rip) {
          const age = (now - rp.t) / 1100;
          const rad = age * 280;
          const d = Math.hypot(p.x - rp.x, p.y - rp.y);
          if (Math.abs(d - rad) < 42) {
            const f = (1 - Math.abs(d - rad) / 42) * (1 - age);
            dy -= f * 7;
            a += f * 0.7;
            rr += f * 1.3;
          }
        }
        rctx!.fillStyle = `rgba(${col()},${Math.min(a, 1).toFixed(3)})`;
        rctx!.beginPath();
        rctx!.arc(p.x, p.y + dy, rr, 0, 6.283);
        rctx!.fill();
      }
    };

    const loop = () => {
      if (!run) return;
      draw();
      requestAnimationFrame(loop);
    };

    build();
    const onR = () => build();
    window.addEventListener('resize', onR);
    const onDown = (e: PointerEvent) => {
      const r = c!.getBoundingClientRect();
      rip.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    };
    c.addEventListener('pointerdown', onDown);
    const auto = window.setTimeout(() => {
      if (run) rip.push({ x: w / 2, y: h / 2, t: performance.now() });
    }, 400);
    if (RM) draw();
    else requestAnimationFrame(loop);

    return () => {
      run = false;
      window.clearTimeout(auto);
      window.removeEventListener('resize', onR);
      c.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}

/** 06 — Velocity marquee reacting to scroll speed and direction. */
export function VelocityMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tr = trackRef.current;
    if (!tr) return;
    let pos = 0;
    let last = window.scrollY;
    let lastT = performance.now();
    let vSm = 0;
    let run = true;
    let raf = 0;

    const loop = (t: number) => {
      if (!run) return;
      const dt = Math.min(50, t - lastT);
      lastT = t;
      const dy = window.scrollY - last;
      last = window.scrollY;
      vSm += (dy - vSm) * 0.12;
      const dir = vSm >= 0 ? 1 : -1;
      pos -= dir * (dt / 1000) * (36 + Math.min(Math.abs(vSm) * 9, 520));
      const half = tr.scrollWidth / 2;
      pos = ((pos % half) + half) % half;
      tr.style.transform = `translate3d(${-pos}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      run = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="vm-wrap">
      <div className="vm-track" ref={trackRef}>
        {'SCROLL — VELOCITY — FEEDBACK — REPEAT — '.repeat(12)}
      </div>
    </div>
  );
}

/** 07 — Letter stagger wave (pure CSS delays, one custom property). */
export function LetterStagger() {
  return (
    <div className="demo-letters mono" data-text="PLAYGROUND">
      {'PLAYGROUND'.split('').map((ch, i) => (
        <span key={i} style={{ '--i': i } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </div>
  );
}

/** 08 — Odometer: rolling counter settling on a random number. */
export function Odometer() {
  const [display, setDisplay] = useState('042');
  const ivRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(ivRef.current), []);

  const roll = () => {
    const target = 100 + ((Math.random() * 899) | 0);
    let n = 0;
    window.clearInterval(ivRef.current);
    ivRef.current = window.setInterval(() => {
      n++;
      setDisplay(n < 14 ? String(100 + ((Math.random() * 899) | 0)) : String(target));
      if (n >= 14) {
        window.clearInterval(ivRef.current);
        setDisplay(String(target));
      }
    }, 55);
  };

  return (
    <div className="demo-odo">
      <span className="odo-out mono">{display}</span>
      <button className="demo-btn sm" type="button" onClick={roll}>
        Roll
      </button>
    </div>
  );
}

/** Renders the demo identified by id (used in cards and the overlay). */
export function Demo({ id }: { id: string }) {
  switch (id) {
    case 'spotlight':
      return <GlyphSpotlight dense />;
    case 'magnet':
      return <MagneticButton />;
    case 'scramble':
      return <ScrambleText />;
    case 'tilt':
      return <PerspectiveTilt />;
    case 'ripple':
      return <RippleField />;
    case 'velocity':
      return <VelocityMarquee />;
    case 'letters':
      return <LetterStagger />;
    case 'odometer':
      return <Odometer />;
    default:
      return null;
  }
}

/* ============================================================
   Experiment overlay — enlarged demo in a modal dialog.
   ============================================================ */

interface ExperimentOverlayProps {
  experiment: { id: string; title: string; hint: string; tags: string[]; index: number } | null;
  onClose: () => void;
}

export function ExperimentOverlay({ experiment, onClose }: ExperimentOverlayProps) {
  const mounted = useDelayedUnmount(experiment !== null, 260);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const toastShown = useRef(false);

  useEffect(() => {
    if (experiment) {
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
      if (!toastShown.current && experiment.hint) {
        toastShown.current = true;
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [experiment]);

  useEffect(() => {
    if (!experiment) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) trapTabKey(modalRef.current, e);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [experiment, onClose]);

  if (!mounted || !experiment) return null;
  const open = experiment !== null;

  return (
    <div
      className={`ovl pgx${open ? ' on' : ''}`}
      id="pg-ovl"
      role="dialog"
      aria-modal="true"
      aria-label="Experiment view"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pg-modal" ref={modalRef}>
        <div className="pgm-head">
          <div>
            <p className="eyebrow">EXPERIMENT 0{experiment.index} — LIVE</p>
            <h3>{experiment.title}</h3>
          </div>
          <button className="pgm-close" ref={closeRef} aria-label="Close experiment" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="pg-stage">
          <div className="pg-demo">
            <Demo id={experiment.id} />
            <span className="pg-hint">{experiment.hint}</span>
          </div>
        </div>
        <div className="pgm-foot">
          <div className="tag-row">
            {experiment.tags.map((t) => (
              <span key={t} className="tag sm">
                {t}
              </span>
            ))}
          </div>
          <span className="pgm-esc">ESC — close</span>
        </div>
      </div>
    </div>
  );
}
