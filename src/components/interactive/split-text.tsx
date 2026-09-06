import { Fragment, cloneElement, isValidElement } from 'react';

type Mode = 'words' | 'letters';
type Dir = 'up' | 'down' | 'left' | 'right';

interface SplitTextProps {
  children: React.ReactNode;
  /** "words" or "letters" — mirrors the source data-split attribute. */
  mode?: Mode;
  /** Animation origin direction. */
  dir?: Dir;
  /** Pixels of travel. Defaults match the source: words 26, letters 12. */
  shift?: number;
  /** Blur start in px. Defaults match the source: words 9, letters 4. */
  blur?: number;
  /** Duration in seconds. Defaults: words .75, letters .45. */
  dur?: number;
  /** Per-token stagger in seconds. Defaults: words .07, letters .012. */
  stagger?: number;
  /** Split but driven by an external animation (hero quote letters). */
  manual?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Server-rendered split-text: wraps words (or letters) in spans carrying a
 * per-token `--i` index and animation custom properties, mirroring the
 * original GSAP split engine as a zero-runtime-at-paint CSS implementation.
 */
export function SplitText({
  children,
  mode = 'words',
  dir = 'up',
  shift,
  blur,
  dur,
  stagger,
  manual = false,
  className,
  style,
}: SplitTextProps) {
  const isLetters = mode === 'letters';
  const s = shift ?? (isLetters ? 12 : 26);
  const b = blur ?? (isLetters ? 4 : 9);
  const d = dur ?? (isLetters ? 0.45 : 0.75);
  const g = stagger ?? (isLetters ? 0.012 : 0.07);

  const axisX = dir === 'left' || dir === 'right';
  const from = dir === 'down' || dir === 'left' ? -s : s;
  const tx = axisX ? `${from}px` : '0px';
  const ty = axisX ? '0px' : `${from}px`;

  const counter = { i: 0 };
  const split = walk(children, mode, counter);

  const vars = {
    '--st-tx': tx,
    '--st-ty': ty,
    '--st-blur': `${b}px`,
    '--st-dur': `${d}s`,
    '--st-stag': `${g}s`,
    ...style,
  } as React.CSSProperties;

  return (
    <span
      data-split={mode}
      {...(manual ? { 'data-split-manual': '' } : {})}
      className={className}
      style={vars}
    >
      {split}
    </span>
  );
}

function walk(node: React.ReactNode, mode: Mode, counter: { i: number }): React.ReactNode {
  if (node == null || node === false || node === true) return node;
  if (typeof node === 'string') return splitString(node, mode, counter);
  if (typeof node === 'number') return splitString(String(node), mode, counter);
  if (Array.isArray(node)) {
    return node.map((n, idx) => <Fragment key={idx}>{walk(n, mode, counter)}</Fragment>);
  }
  if (isValidElement(node)) {
    if (node.type === 'br') return node;
    const props = node.props as { children?: React.ReactNode };
    if (props.children == null) return node;
    return cloneElement(node, {}, walk(props.children, mode, counter));
  }
  return node;
}

function splitString(text: string, mode: Mode, counter: { i: number }): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const tokens = text.split(/(\s+)/);
  tokens.forEach((tok, ti) => {
    if (!tok) return;
    if (/^\s+$/.test(tok)) {
      out.push(<Fragment key={`s${ti}`}> </Fragment>);
      return;
    }
    if (mode === 'letters') {
      const letters = Array.from(tok).map((c, li) => (
        <span key={li} className="st-letter" style={{ '--i': counter.i++ } as React.CSSProperties}>
          {c}
        </span>
      ));
      out.push(
        <span key={`w${ti}`} className="st-word">
          {letters}
        </span>
      );
    } else {
      out.push(
        <span key={`w${ti}`} className="st-word" style={{ '--i': counter.i++ } as React.CSSProperties}>
          {tok}
        </span>
      );
    }
  });
  return out;
}
