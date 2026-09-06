'use client';

import { useEffect, useRef } from 'react';

/* ============================================================
   GlyphField — code-glyph particle field with cursor spotlight,
   character scrambling near the pointer and click ripples.
   Port of the source GlyphField canvas engine.
   ============================================================ */

interface GlyphOptions {
  gap?: number;
  size?: number;
  base?: number;
  near?: number;
  radius?: number;
}

const GLYPH_CHARS = '{}<>/;:=()[]#*&+—%'.split('');

export function useGlyphField(canvasRef: React.RefObject<HTMLCanvasElement | null>, o: GlyphOptions = {}) {
  const opts = { gap: 30, size: 13, base: 0.05, near: 0.9, radius: 170, ...o };

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const host = cv.parentElement ?? cv;

    let pts: { x: number; y: number; c: string; p: number }[] = [];
    let rip: { x: number; y: number; t: number }[] = [];
    let mx = -1e4;
    let my = -1e4;
    let w = 0;
    let h = 0;
    let vis = false;
    let raf = 0;
    let run = true;

    function rgb(): string {
      return document.documentElement.dataset.theme === 'dark' ? '236,237,240' : '20,20,25';
    }

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv!.clientWidth || host.clientWidth;
      h = cv!.clientHeight || host.clientHeight;
      if (!w || !h) return;
      cv!.width = w * dpr;
      cv!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = opts.gap / 2; y < h; y += opts.gap)
        for (let x = opts.gap / 2; x < w; x += opts.gap)
          pts.push({
            x,
            y,
            c: GLYPH_CHARS[(Math.random() * GLYPH_CHARS.length) | 0],
            p: Math.random() * 6.28,
          });
      if (RM) frame(0);
    }

    function frame(t: number) {
      if (!w) return;
      const col = rgb();
      const now = performance.now();
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = `400 ${opts.size}px "JetBrains Mono", monospace`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      rip = rip.filter((r) => now - r.t < 900);
      for (const p of pts) {
        let a = opts.base;
        if (!RM) a += 0.028 * (Math.sin(t * 0.0009 + p.p * 3) + 1) / 2;
        const dx = p.x - mx;
        const dy = p.y - my;
        const inf = Math.max(0, 1 - Math.hypot(dx, dy) / opts.radius);
        a += inf * inf * 0.8;
        if (inf > 0.5 && Math.random() < 0.02) p.c = GLYPH_CHARS[(Math.random() * GLYPH_CHARS.length) | 0];
        for (const r of rip) {
          const age = (now - r.t) / 900;
          const rr = age * opts.radius * 1.7;
          const band = 50;
          const dv = Math.abs(Math.hypot(p.x - r.x, p.y - r.y) - rr);
          if (dv < band) a += (1 - dv / band) * (1 - age) * 0.6;
        }
        if (a > 0.02) {
          ctx!.fillStyle = `rgba(${col},${Math.min(a, opts.near).toFixed(3)})`;
          ctx!.fillText(p.c, p.x, p.y);
        }
      }
    }

    const loop = (t: number) => {
      if (!run) return;
      if (vis !== false) frame(t);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => build();
    const onMove = (e: PointerEvent) => {
      const r = cv!.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => {
      mx = -1e4;
      my = -1e4;
    };
    const onDown = (e: PointerEvent) => {
      const r = cv!.getBoundingClientRect();
      rip.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    };

    const io = new IntersectionObserver((es) => {
      vis = es[0].isIntersecting;
    });
    io.observe(cv);

    build();
    window.addEventListener('resize', onResize);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);
    if (RM) frame(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      run = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
  }, [canvasRef, opts.gap, opts.size, opts.base, opts.near, opts.radius]);
}

/** Canvas glyph spotlight demo. */
export function GlyphSpotlight({ dense = false }: { dense?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useGlyphField(ref, dense ? { gap: 22, size: 12, radius: 130, base: 0.09 } : {});
  return <canvas ref={ref} aria-hidden="true" />;
}
