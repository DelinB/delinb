'use client';

import { useState } from 'react';
import { useToast } from '@/components/system/toast-provider';
import { isEmail } from '@/lib/utils';

/** Newsletter signup — local demo behavior matching the source (toast, no network). */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [bad, setBad] = useState(false);
  const { toast } = useToast();

  return (
    <div className="news" data-reveal>
      <div>
        <p className="eyebrow light">NEWSLETTER</p>
        <h3>One email a month. No noise.</h3>
        <p>
          Performance, accessibility, and the things I break on purpose — written for people who
          build the web.
        </p>
      </div>
      <form
        className="news-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (isEmail(email)) {
            toast('Subscribed — see you in the next issue.');
            setEmail('');
            setBad(false);
          } else {
            setBad(true);
            toast("That email doesn't look right.");
            window.setTimeout(() => setBad(false), 1200);
          }
        }}
      >
        <label htmlFor="news-email" className="sr-only">
          Email address
        </label>
        <input
          id="news-email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          className={bad ? 'bad' : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
