'use client';

import { useState } from 'react';
import { useToast } from '@/components/system/toast-provider';
import { SeedImage } from '@/components/ui/seed-image';
import type { CommentData } from '@/data/content';

/** Local discussion thread — demo behavior identical to the source (tab-only persistence). */
export function Comments({ slug, initial }: { slug: string; initial: CommentData[] }) {
  const [comments, setComments] = useState(initial);
  const [text, setText] = useState('');
  const { toast } = useToast();
  const [warning, setWarning] = useState(false);

  const post = (e: React.FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (v.length < 4) {
      setWarning(true);
      toast('Say a little more than that.');
      return;
    }
    setWarning(false);
    setComments((prev) => [
      ...prev,
      { n: 'You', r: 'Just now', x: v },
    ]);
    setText('');
    toast('Comment posted — locally, this tab only.');
  };

  return (
    <section className="disc" data-reveal>
      <p className="eyebrow" style={{ marginBottom: '6px' }}>
        DISCUSSION ({String(comments.length).padStart(2, '0')})
      </p>
      <h2>Comments</h2>
      <p className="disc-note">Local demo — replies live in this tab only.</p>
      <div id="cmt-list">
        {comments.length ? (
          comments.map((c, i) => (
            <div className="cmt" key={`${slug}-${i}`}>
              <SeedImage seed={`db-cmt-${c.n.replace(/\W/g, '')}`} w={96} h={96} alt={c.n} sizes="44px" />
              <div>
                <b>{c.n}</b>
                <span>{c.r}</span>
                <p>{c.x}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="disc-empty">No comments yet — start the thread.</p>
        )}
      </div>
      <form className="disc-form" id="cmt-form" noValidate onSubmit={post}>
        <label htmlFor="cmt-txt" className="sr-only">
          Your comment
        </label>
        <textarea
          id="cmt-txt"
          placeholder="Add to the discussion — technical replies especially welcome."
          value={text}
          aria-invalid={warning}
          aria-describedby={warning ? 'cmt-txt-err' : undefined}
          onChange={(e) => setText(e.target.value)}
        />
        {warning ? (
          <span id="cmt-txt-err" role="alert" style={{ fontSize: '9.5px', color: 'var(--err)', marginTop: '6px' }}>
            A little more detail helps the thread.
          </span>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button className="btn dark" type="submit">
            Post comment
          </button>
        </div>
      </form>
    </section>
  );
}
