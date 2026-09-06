import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-aware className combiner (kept for the scaffold's ui helpers). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Seeded placeholder image URL, matching the source site's image strategy. */
export const seedImg = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}.jpg`;

/** Format an ISO date (YYYY-MM-DD) as e.g. "Jun 18, 2025". */
export function fmtDate(d: string): string {
  return new Date(`${d}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export const pad2 = (n: number) => String(n).padStart(2, '0');
