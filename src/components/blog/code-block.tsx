'use client';

import { Fragment, useState } from 'react';

/* ============================================================
   Syntax-highlighted code block with a copy button.
   Port of the source's tiny tokenizer — rendered as React
   elements (no dangerouslySetInnerHTML), same token classes.
   ============================================================ */

const TOKEN_RE =
  /(\/\/[^\n]*)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|\b(const|let|var|function|return|import|from|export|default|if|else|for|while|new|class|extends|async|await|try|catch|typeof|interface|type|of|in|null|true|false)\b|\b(\d+(?:\.\d+)?)\b/g;

function highlight(src: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(src))) {
    if (m.index > last) out.push(<Fragment key={k++}>{src.slice(last, m.index)}</Fragment>);
    const cls = m[1] ? 'tok-c' : m[2] ? 'tok-s' : m[3] ? 'tok-k' : 'tok-n';
    out.push(
      <span className={cls} key={k++}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(<Fragment key={k++}>{src.slice(last)}</Fragment>);
  return out;
}

export function CodeBlock({ lang, src }: { lang: string; src: string }) {
  const [copied, setCopied] = useState(false);
  const code = src.trim();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {
        /* clipboard unavailable */
      }
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <figure className="code" data-reveal>
      <figcaption>
        <span>{lang}</span>
        <button className="code-copy" type="button" onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre>
        <code>{highlight(code)}</code>
      </pre>
    </figure>
  );
}
