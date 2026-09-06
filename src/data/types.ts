/* ---- Site-wide types for the Delin B portfolio ---- */

export interface ProcessStepData {
  t: string;
  x: string;
}

export interface FeatureData {
  t: string;
  x: string;
  img: string;
}

export interface Metric {
  n: string;
  l: string;
}

export interface Challenge {
  p: string;
  s: string;
}

export interface Project {
  slug: string;
  name: string;
  cat: string;
  f: string[];
  year: string;
  role: string;
  client: string;
  duration: string;
  img: string;
  tags: string[];
  blurb: string;
  result: string;
  featured?: boolean;
  demo: string;
  gh: string;
  overview: string;
  challenge: string;
  objective: string;
  process: ProcessStepData[];
  features: FeatureData[];
  responsive: string[];
  anim: string;
  perf: Metric[];
  tech: string[];
  seo: string[];
  challenges: Challenge[];
  results: Metric[];
  resultNote: string;
  gallery: string[];
}

export type ContentBlock =
  | { t: 'h2'; h: string }
  | { t: 'p'; x: string }
  | { t: 'ul'; items: string[] }
  | { t: 'code'; lang: string; x: string }
  | { t: 'quote'; x: string; by?: string }
  | { t: 'img'; seed: string; alt: string; cap?: string }
  | { t: 'diagram'; nodes: string[]; cap: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export interface CommentData {
  n: string;
  r: string;
  x: string;
}

export interface Post {
  slug: string;
  title: string;
  cat: string;
  cats?: string[];
  date: string;
  updated?: string;
  read: string;
  seed: string;
  pop?: string;
  excerpt: string;
  takeaways?: string[];
  cmts?: CommentData[];
  blocks: ContentBlock[];
}

export interface Mini {
  t: string;
  x: string;
  d: string;
}

export interface Testimonial {
  n: string;
  r: string;
  seed: string;
  q: string;
}

export interface Experience {
  y: string;
  co: string;
  role: string;
  loc: string;
  desc: string;
  resp: string[];
  ach: string[];
  tags: string[];
}

export interface CareerEntry {
  y: string;
  t: string;
  co: string;
  sum: string;
  more: string;
}

export interface SkillCategory {
  t: string;
  items: [string, string][];
}

export type EngSkill = [string, string];
export type StackRow = [string, string];
export type Service = [string, string, string[]];
export type ProcessStep = [string, string, string];
export type Faq = [string, string];

export interface UsesGroup {
  g: string;
  items: [string, string][];
}

export interface PlaygroundItem {
  id: string;
  t: string;
  hint: string;
  x: string;
  tags: string[];
}
