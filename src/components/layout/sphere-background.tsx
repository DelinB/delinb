'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/* ============================================================
   Sphere background — the scroll-driven particle globe.
   Faithful port of the original canvas engine: ~14.7k particles
   on a lat/lon sphere, keyframed position/rotation/scale driven
   by smooth scroll progress, drag-to-rotate with inertia,
   theme-aware color ramp LUT, DPR-capped rendering, visibility
   pause, and a reduced-motion static frame.

   Living-planet layer (all inside the existing particle loop):
   - Sun lighting: color keyed to a fixed sun direction, so the
     terminator sweeps across the surface as the globe spins.
   - City lights: a sparse subset of particles glows warm on the
     night side, twinkling like settlements past the terminator.
   - Click waves: pointerdown sends a wave across the sphere's
     surface — around the limb toward the far side — pinned to
     the terrain, not the screen.
   - Shimmer, cursor lens (swell + brighten under the pointer),
     breathing radius, and text-safe capped alpha.
   ============================================================ */

type KF = { t: number; v: number };

const POS_X: KF[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: 1.4 * 60 },
  { t: 0.45, v: -0.4 * 60 },
  { t: 0.6, v: 1.2 * 60 },
  { t: 0.7, v: -1.7 * 60 },
  { t: 0.85, v: -1.7 * 60 },
  { t: 1, v: 0 },
];
const POS_Y: KF[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: -0.2 * 40 },
  { t: 0.45, v: 0.1 * 40 },
  { t: 0.6, v: -0.1 * 40 },
  { t: 0.7, v: 0.05 * 40 },
  { t: 0.85, v: 0.05 * 40 },
  { t: 1, v: 0.2 * 40 },
];
const ROT_Y: KF[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: Math.PI * 0.55 },
  { t: 0.45, v: Math.PI * 1.05 },
  { t: 0.6, v: Math.PI * 1.3 },
  { t: 0.85, v: Math.PI * 1.3 },
  { t: 1, v: Math.PI * 1.6 },
];
const ROT_X: KF[] = [
  { t: 0, v: 0 },
  { t: 0.22, v: 0.3 },
  { t: 0.45, v: 0.1 },
  { t: 0.6, v: 0 },
  { t: 0.85, v: 0 },
  { t: 1, v: 0.1 },
];
const SCALE: KF[] = [
  { t: 0, v: 1 },
  { t: 0.22, v: 0.92 },
  { t: 0.45, v: 0.95 },
  { t: 0.6, v: 1.05 },
  { t: 0.85, v: 1.05 },
  { t: 1, v: 0.55 },
];

function trackValue(kfs: KF[], p: number): number {
  if (p <= kfs[0].t) return kfs[0].v;
  for (let i = 1; i < kfs.length; i++) {
    if (p <= kfs[i].t) {
      const a = kfs[i - 1];
      const b = kfs[i];
      const f = (p - a.t) / (b.t - a.t);
      return a.v + (b.v - a.v) * f;
    }
  }
  return kfs[kfs.length - 1].v;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function mixC(c1: number[], c2: number[], t: number, out: number[]) {
  out[0] = c1[0] + (c2[0] - c1[0]) * t;
  out[1] = c1[1] + (c2[1] - c1[1]) * t;
  out[2] = c1[2] + (c2[2] - c1[2]) * t;
  return out;
}

export type SpherePalette = 'mono' | 'glint' | 'bronze' | 'ice';

/* 5 stops, ordered lit-cap → night-cap (the sun shader maps through
   this ramp: stop 0 = facing the sun, stop 4 = deep night). Bright
   stops stay capped below white so overlaid text keeps contrast. */
const SPHERE_PALETTES: Record<SpherePalette, { dark: number[][]; light: number[][] }> = {
  mono: {
    dark: [
      [206, 210, 218],
      [167, 171, 178],
      [108, 112, 117],
      [21, 22, 26],
      [10, 10, 10],
    ],
    light: [
      [170, 175, 183],
      [152, 157, 165],
      [108, 112, 117],
      [26, 28, 34],
      [12, 12, 14],
    ],
  },
  glint: {
    dark: [
      [236, 226, 204],
      [220, 202, 170],
      [168, 170, 176],
      [64, 68, 76],
      [16, 17, 20],
    ],
    light: [
      [192, 178, 146],
      [170, 160, 130],
      [128, 130, 136],
      [56, 58, 66],
      [20, 20, 24],
    ],
  },
  bronze: {
    dark: [
      [230, 220, 196],
      [212, 186, 144],
      [170, 138, 100],
      [104, 76, 52],
      [38, 28, 20],
    ],
    light: [
      [172, 142, 100],
      [148, 118, 80],
      [106, 80, 52],
      [68, 50, 34],
      [28, 20, 14],
    ],
  },
  ice: {
    dark: [
      [210, 226, 242],
      [170, 196, 226],
      [114, 148, 190],
      [54, 84, 126],
      [18, 30, 50],
    ],
    light: [
      [136, 168, 200],
      [106, 136, 168],
      [74, 102, 138],
      [42, 62, 94],
      [14, 26, 44],
    ],
  },
};

function rampAt(st: number[][], t: number, out: number[]) {
  if (t < 0.28) return mixC(st[0], st[1], t / 0.28, out);
  if (t < 0.55) return mixC(st[1], st[2], (t - 0.28) / 0.27, out);
  if (t < 0.8) return mixC(st[2], st[3], (t - 0.55) / 0.25, out);
  return mixC(st[3], st[4], Math.min(1, (t - 0.8) / 0.2), out);
}

const BUCKETS = 48;
const ASTEPS = 16;
const PERSPECTIVE = 3.4;
const LAT_STEPS = 108;
const LON_STEPS = 136;

/* Sun direction, fixed in view space (upper-left, toward viewer).
   The terminator sits where the dot product with this goes negative. */
const SUN_X = -0.52;
const SUN_Y = -0.34;
const SUN_Z = 0.78;

/* Life-layer tuning */
const RIPPLE_LIFE = 1100; // ms — wave front travels hit point → antipode
const RIPPLE_BAND = 0.22; // angular half-width of the wave front
const CITY_DENSITY = 0.045; // fraction of particles that are "cities"

interface Particle {
  x0: number;
  y0: number;
  z0: number;
  ph: number; // shimmer phase
  city: number; // 0 = terrain, else twinkle phase
}

/** Elements where sphere dragging must not start (identical list to the source). */
const EXCLUDE =
  'a, button, input, textarea, select, label, summary, .hd, footer, .drawer, .scrim, .ovl, .toasts, .hero-title, .hero-info, .hero-stats, .hero-ctas, .pc, .fp-media, .b-card, .j-card, .t-card, .tst-card, .svc, .proc, .code, .dg-fig, .art-table, .faq-item, .l-rows, .mx-rows, .vt, .tl, .sb-grid, .metrics, .resp, .feat-block, .chs-row, .gallery, .pfeat, .con-info, .c-panel, .sheet, .news, .toc, .author, .takeaway, .cmt, .disc, .term, .pop-rows, .pg-card, .pg-demo, .resume-actions';

export function SphereBackground({
  palette = 'glint',
  strength = 0.65,
}: {
  palette?: SpherePalette;
  /** 0.1–1. Scales every particle's opacity. Lower = text reads better. */
  strength?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isHomeRef = useRef(true);

  useEffect(() => {
    isHomeRef.current = pathname === '/' || pathname === '';
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stops = SPHERE_PALETTES[palette];
    const dim = Math.max(0.1, Math.min(1, strength));

    // Pre-build particle sphere.
    const particles: Particle[] = [];
    for (let i = 0; i < LAT_STEPS; i++) {
      const theta = -Math.PI / 2 + (i / (LAT_STEPS - 1)) * Math.PI;
      const y0 = -Math.sin(theta);
      const ring = Math.cos(theta);
      for (let j = 0; j < LON_STEPS; j++) {
        const phi = (j / LON_STEPS) * Math.PI * 2 - Math.PI;
        particles.push({
          x0: ring * Math.cos(phi),
          y0,
          z0: ring * Math.sin(phi),
          ph: Math.random() * Math.PI * 2,
          city: Math.random() < CITY_DENSITY ? 1 + Math.random() * Math.PI * 2 : 0,
        });
      }
    }
    const drawPool = Array.from({ length: particles.length }, () => ({
      px: 0,
      py: 0,
      z: 0,
      bi: 0,
      ai: 0,
      ci: 0,
      size: 0,
    }));
    const sortPool: typeof drawPool = [];

    const lut: number[][] = Array.from({ length: BUCKETS }, () => [0, 0, 0]);
    const styleCache = new Map<number, string>();
    const cityCache = new Map<number, string>();
    let cityCol: number[] = [255, 199, 110];
    let lutK = -9;
    const tmpD = [0, 0, 0];
    const tmpL = [0, 0, 0];
    function rebuildLUT(k: number) {
      for (let i = 0; i < BUCKETS; i++) {
        const t = i / (BUCKETS - 1);
        rampAt(stops.dark, t, tmpD);
        rampAt(stops.light, t, tmpL);
        const c = lut[i];
        c[0] = (tmpD[0] + (tmpL[0] - tmpD[0]) * k) | 0;
        c[1] = (tmpD[1] + (tmpL[1] - tmpD[1]) * k) | 0;
        c[2] = (tmpD[2] + (tmpL[2] - tmpD[2]) * k) | 0;
      }
      // City-light color rides the same theme crossfade.
      cityCol = [
        (255 + (186 - 255) * k) | 0,
        (199 + (118 - 199) * k) | 0,
        (110 + (28 - 110) * k) | 0,
      ];
      styleCache.clear();
      cityCache.clear();
      lutK = k;
    }

    let W = 0;
    let H = 0;
    const IDLE_SPIN = reduced ? 0 : 0.0016;
    const MAX_FLICK_SPIN = 0.05;
    let rotX = -0.3;
    let rotY = 0.62;
    let velX = 0;
    let velY: number = IDLE_SPIN;
    let dragging = false;
    let lastPX = 0;
    let lastPY = 0;
    let activePointer: number | null = null;
    let paused = false;
    let rafId = 0;
    let targetProgress = 0;
    let smoothProgress = 0;
    let kSmooth = 0;
    let lastTime = 0;

    // Life-layer state.
    let mX = -1e5;
    let mY = -1e5;
    const ripples: { t0: number; hx: number; hy: number; hz: number; wave: number; age: number }[] = [];
    // Latest sphere center/radius, so clicks can be mapped to the surface.
    let curCx = 0;
    let curCy = 0;
    let curR = 1;

    function onScroll() {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      scheduleFrame();
    }

    const resize = () => {
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.max(1, Math.round(W * DPR));
      canvas!.height = Math.max(1, Math.round(H * DPR));
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      scheduleFrame();
    };

    function pointerDown(x: number, y: number) {
      dragging = true;
      lastPX = x;
      lastPY = y;
    }
    function pointerMove(x: number, y: number) {
      if (!dragging) return;
      const dx = x - lastPX;
      const dy = y - lastPY;
      velY = Math.max(-MAX_FLICK_SPIN, Math.min(MAX_FLICK_SPIN, -dx * 0.0045));
      velX = Math.max(-MAX_FLICK_SPIN, Math.min(MAX_FLICK_SPIN, -dy * 0.0045));
      rotY += velY;
      rotX += velX;
      rotX = Math.max(-1.3, Math.min(1.3, rotX));
      lastPX = x;
      lastPY = y;
      scheduleFrame();
    }
    function pointerUp() {
      dragging = false;
    }
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(EXCLUDE)) return;
      if (activePointer !== null) return;
      activePointer = e.pointerId;
      pointerDown(e.clientX, e.clientY);
      // Click wave: ray→sphere hit (clamped to the limb if you click
      // just outside), pinned to the surface so it travels with the
      // terrain as the globe spins.
      if (!reduced) {
        if (ripples.length > 4) ripples.shift();
        const hx = (e.clientX - curCx) / curR;
        const hy = (e.clientY - curCy) / curR;
        const hl = Math.hypot(hx, hy);
        let rhx: number, rhy: number, rhz: number;
        if (hl > 1) {
          rhx = hx / hl;
          rhy = hy / hl;
          rhz = 0;
        } else {
          rhx = hx;
          rhy = hy;
          rhz = Math.sqrt(1 - hl * hl);
        }
        ripples.push({ t0: performance.now(), hx: rhx, hy: rhy, hz: rhz, wave: 1, age: 0 });
        scheduleFrame();
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      mX = e.clientX;
      mY = e.clientY;
      if (reduced) scheduleFrame(); // keep the lens live without animation
      if (e.pointerId !== activePointer) return;
      pointerMove(e.clientX, e.clientY);
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        mX = -1e5;
        mY = -1e5;
      }
    };
    const releasePointer = (e: PointerEvent) => {
      if (e.pointerId !== activePointer) return;
      activePointer = null;
      pointerUp();
    };

    const frame = (time: number) => {
      rafId = 0;
      if (paused) return;

      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 0.016;
      lastTime = time;

      if (reduced) smoothProgress = targetProgress;
      else smoothProgress += (targetProgress - smoothProgress) * (1 - Math.exp(-dt / 0.35));

      const p = smoothProgress;
      const posX = trackValue(POS_X, p);
      const posY = trackValue(POS_Y, p);
      const rotCoreY = trackValue(ROT_Y, p);
      const rotCoreX = trackValue(ROT_X, p);
      const scale = trackValue(SCALE, p);

      if (!dragging) {
        velY += (IDLE_SPIN - velY) * 0.02;
        rotY += velY;
        velX *= 0.94;
        rotX += velX;
        rotX = Math.max(-1.3, Math.min(1.3, rotX));
      }

      const siteDark = document.documentElement.dataset.theme === 'dark';
      const kT = siteDark ? 0 : isHomeRef.current ? Math.min(1, Math.max(0, (p - 0.004) / 0.11)) : 1;
      if (reduced) kSmooth = kT;
      else kSmooth += (kT - kSmooth) * (1 - Math.exp(-dt / 0.45));
      if (Math.abs(kSmooth - lutK) > 0.004) rebuildLUT(kSmooth);
      const alphaMul = lerp(1, 0.72, kSmooth);
      const sizeMul = lerp(1, 0.88, kSmooth);

      const finalRotX = rotX + rotCoreX;
      const finalRotY = rotY + rotCoreY;
      // Breathing: whole-sphere radius pulses ±0.8%.
      const breathe = reduced ? 1 : 1 + 0.008 * Math.sin(time * 0.0009);
      const R = Math.min(W, H) * 0.335 * scale * breathe;
      const cosX = Math.cos(finalRotX);
      const sinX = Math.sin(finalRotX);
      const cosY = Math.cos(finalRotY);
      const sinY = Math.sin(finalRotY);
      const cx = W * 0.5 + posX;
      const cy = H * 0.5 + posY;
      const sizeScale = W / 720;
      const lensR = Math.min(W, H) * 0.16;
      const lensR2 = lensR * lensR;

      curCx = cx;
      curCy = cy;
      curR = R;

      // Advance click waves: front travels from the hit point (+1)
      // around the sphere to the antipode (−1).
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.age = (time - rp.t0) / RIPPLE_LIFE;
        if (rp.age >= 1) ripples.splice(i, 1);
        else rp.wave = 1 - 2 * rp.age;
      }

      ctx!.clearRect(0, 0, W, H);

      let count = 0;
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        const x1 = pt.x0 * cosY - pt.z0 * sinY;
        const z1 = pt.x0 * sinY + pt.z0 * cosY;
        const y1 = pt.y0 * cosX - z1 * sinX;
        const z2 = pt.y0 * sinX + z1 * cosX;
        if (z2 < 0.02) continue;

        const factor = PERSPECTIVE / (PERSPECTIVE - z2);
        const d = drawPool[count++];
        d.px = cx + x1 * R * factor;
        d.py = cy + y1 * R * factor;
        d.z = z2;

        // Sun-fixed shading: color comes from the angle to the sun,
        // so the terminator sweeps across the surface as it spins
        // (replaces the old latitude bands).
        const L = x1 * SUN_X + y1 * SUN_Y + z2 * SUN_Z;
        const shadeT = Math.max(0, Math.min(1, 0.5 - L * 0.5));
        d.bi = Math.min(BUCKETS - 1, (shadeT * BUCKETS) | 0);

        let a = (0.2 + 0.16 * factor) * alphaMul * dim;
        let sz = 1.1 * factor * sizeScale * sizeMul;

        // Shimmer: each particle twinkles on its own phase.
        if (!reduced) a += 0.05 * (0.5 + 0.5 * Math.sin(time * 0.0012 + pt.ph));

        // Night side: flagged particles glow warm like cities past
        // the terminator. Only front-hemisphere particles reach here,
        // so back-side cities are naturally hidden.
        if (pt.city && L < -0.08) {
          const tw = reduced ? 0.7 : 0.5 + 0.5 * Math.sin(time * 0.003 + pt.city);
          a = Math.max(a, (0.32 + 0.42 * tw) * alphaMul * dim);
          d.ci = 1;
        } else {
          d.ci = 0;
        }

        // Click waves: brighten + enlarge particles as the front
        // passes over them — across the visible face and over the
        // limb toward the far side.
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const w = 1 - Math.abs(x1 * rp.hx + y1 * rp.hy + z2 * rp.hz - rp.wave) / RIPPLE_BAND;
          if (w > 0) {
            a += w * (1 - rp.age) * 0.35;
            sz *= 1 + w * 0.5;
          }
        }

        // Cursor lens: brighten, enlarge, and swell the surface
        // outward from the sphere center under the pointer.
        const ldx = d.px - mX;
        const ldy = d.py - mY;
        const ld2 = ldx * ldx + ldy * ldy;
        let lens = 0;
        if (ld2 < lensR2) {
          lens = 1 - Math.sqrt(ld2) / lensR;
          const inf = lens * lens;
          a += inf * 0.22;
          if (inf > 0.001) {
            const sx = d.px - cx;
            const sy = d.py - cy;
            const sl = Math.sqrt(sx * sx + sy * sy) || 1;
            const push = inf * 12;
            d.px += (sx / sl) * push;
            d.py += (sy / sl) * push;
          }
        }

        d.ai = Math.max(0, Math.min(ASTEPS - 1, (a * ASTEPS) | 0));
        d.size = sz * (1 + lens * 0.9);
      }

      sortPool.length = count;
      for (let i = 0; i < count; i++) sortPool[i] = drawPool[i];
      sortPool.sort((a, b) => a.z - b.z);
      for (let i = 0; i < count; i++) {
        const d = sortPool[i];
        if (d.ci) {
          let s = cityCache.get(d.ai);
          if (!s) {
            s = `rgba(${cityCol[0]},${cityCol[1]},${cityCol[2]},${(d.ai / ASTEPS).toFixed(3)})`;
            cityCache.set(d.ai, s);
          }
          ctx!.fillStyle = s;
        } else {
          const key = d.bi * ASTEPS + d.ai;
          let s = styleCache.get(key);
          if (!s) {
            const c = lut[d.bi];
            s = `rgba(${c[0]},${c[1]},${c[2]},${(d.ai / ASTEPS).toFixed(3)})`;
            styleCache.set(key, s);
          }
          ctx!.fillStyle = s;
        }
        ctx!.fillRect(d.px - d.size, d.py - d.size, d.size * 2, d.size * 2);
      }
      if (!reduced) rafId = requestAnimationFrame(frame);
    };

    const scheduleFrame = () => {
      if (reduced && !rafId && !paused) rafId = requestAnimationFrame(frame);
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        paused = true;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        paused = false;
        lastTime = 0;
        if (!rafId) rafId = requestAnimationFrame(frame);
      }
    };

    resize();
    onScroll();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerout', onPointerOut);
    document.addEventListener('pointerup', releasePointer);
    document.addEventListener('pointercancel', releasePointer);
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (!rafId) rafId = requestAnimationFrame(frame);
    const raf = requestAnimationFrame(() => canvas!.classList.add('on'));

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('pointerup', releasePointer);
      document.removeEventListener('pointercancel', releasePointer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafId) cancelAnimationFrame(rafId);
      cancelAnimationFrame(raf);
    };
  }, [palette, strength]);

  return <canvas id="sphere-canvas" ref={canvasRef} aria-hidden="true" />;
}