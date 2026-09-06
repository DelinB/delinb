import Link from 'next/link';
import { SplitText } from '@/components/interactive/split-text';

interface VarStyle extends React.CSSProperties {
  '--d'?: string;
}

/** Eyebrow + split-text title + optional side description/link — the `secHead` partial. */
export function SectionHead({
  eyebrow,
  title,
  desc,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  link?: [string, string];
}) {
  return (
    <div className="sec-head">
      <div>
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h2 className="sec-title">
          <SplitText mode="words">{title}</SplitText>
        </h2>
      </div>
      <div className="sec-side" data-reveal style={{ '--d': '140ms' } as VarStyle}>
        {desc ? <p className="sec-desc">{desc}</p> : null}
        {link ? (
          <Link className="sec-link" href={link[0]}>
            {link[1]} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  meta?: string;
  /** Custom split parameters (contact page uses letters). */
  split?: 'words' | 'letters';
}

/** Page hero — the `pageHero` partial with the word-rise split title. */
export function PageHero({ eyebrow, title, sub, meta, split = 'words' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h1 className="ph-title">
          {split === 'letters' ? (
            <SplitText mode="letters" shift={13} blur={4} dur={0.45} stagger={0.012}>
              {title}
            </SplitText>
          ) : (
            <SplitText mode="words" shift={34} blur={10} dur={0.8} stagger={0.08}>
              {title}
            </SplitText>
          )}
        </h1>
        {sub ? (
          <p className="ph-sub" data-reveal style={{ '--d': '260ms' } as VarStyle}>
            {sub}
          </p>
        ) : null}
        {meta ? (
          <p className="ph-meta mono" data-reveal style={{ '--d': '340ms' } as VarStyle}>
            {meta}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/** Dark full-width CTA band closing most pages. */
export function Band({
  eyebrow,
  title,
  children,
  letters = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  letters?: boolean;
}) {
  return (
    <section className="band">
      <div className="wrap">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h2 className="band-title">
          {letters ? (
            <SplitText mode="letters" shift={12} blur={3} dur={0.4} stagger={0.012}>
              {title}
            </SplitText>
          ) : (
            <SplitText mode="words" shift={30} blur={10}>
              {title}
            </SplitText>
          )}
        </h2>
        <div data-reveal style={{ '--d': '160ms' } as VarStyle}>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Row of small tags. */
export function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="tag-row">
      {tags.map((t) => (
        <span key={t} className="tag sm">
          {t}
        </span>
      ))}
    </div>
  );
}

/** Counting stat number — renders the final value server-side, counts up when JS runs. */
export function StatNum({
  count,
  suffix = '',
  label,
}: {
  count: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="stat-block">
      <div className="stat-num" data-count={String(count)} data-suffix={suffix}>
        {count}
        {suffix}
      </div>
      <div className="stat-text">{label}</div>
    </div>
  );
}

/** sb-block stat used on experience / testimonials pages. */
export function SbStat({
  value,
  suffix = '',
  text,
  animate = false,
}: {
  value: string;
  suffix?: string;
  text: string;
  animate?: boolean;
}) {
  return (
    <div className="sb-block">
      <div
        className="sb-num"
        {...(animate ? { 'data-count': value, 'data-suffix': suffix } : {})}
      >
        {value}
        {suffix ? <span className="suf">{suffix}</span> : null}
      </div>
      <div className="sb-text">{text}</div>
    </div>
  );
}
