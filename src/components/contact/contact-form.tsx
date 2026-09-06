'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/system/toast-provider';
import { isEmail } from '@/lib/utils';
import { SITE } from '@/lib/site';

const PROJECT_TYPE_CHIPS = [
  'Website',
  'Web application',
  'SaaS',
  'E-commerce',
  'UI development',
  'Frontend consulting',
  'Other',
];

interface Errors {
  name?: boolean;
  email?: boolean;
  type?: boolean;
  msg?: boolean;
}

/**
 * Project brief form — client-side validation with accessible inline
 * error messages (aria-invalid + aria-describedby), matching the
 * source behavior including the success state replacement.
 */
export function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    type: '',
    budget: '',
    timeline: '',
    msg: '',
  });
  const [chips, setChips] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ name: string; scope: string[] } | null>(null);
  const { toast } = useToast();

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const toggleChip = (chip: string) => {
    setChips((prev) => (prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]));
  };

  if (done) {
    return (
      <div className="c-done">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,.5)' }}>
          BRIEF RECEIVED
        </p>
        <h3>Thanks, {done.name} — brief received.</h3>
        <p>
          I&apos;ll reply within 24 hours (IST) with questions, a rough shape and a range. If
          it&apos;s urgent, mail{' '}
          <a href={`mailto:${SITE.email}`} style={{ color: '#fff' }}>
            {SITE.email}
          </a>{' '}
          directly.
        </p>
        {done.scope.length ? (
          <p style={{ fontSize: '11px', letterSpacing: '.08em', color: 'rgba(255,255,255,.55)', margin: '-14px 0 22px' }}>
            SCOPE NOTED — {done.scope.join(' · ').toUpperCase()}
          </p>
        ) : null}
        <Link className="btn" href="/projects">
          Browse the work meanwhile
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      name: values.name.trim().length <= 1,
      email: !isEmail(values.email),
      type: !values.type,
      msg: values.msg.trim().length <= 4,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      toast('A few fields need attention.');
      return;
    }
    const name = values.name.trim().split(' ')[0];
    setDone({ name, scope: chips });
    toast('Brief sent — check your inbox within 24h.');
  };

  return (
    <form className="c-form" noValidate onSubmit={submit}>
      <div className="full">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,.5)', marginBottom: '10px' }}>
          What do you need? (select any)
        </p>
        <div className="chips" role="group" aria-label="Project types">
          {PROJECT_TYPE_CHIPS.map((t) => (
            <button
              key={t}
              type="button"
              className={`tag${chips.includes(t) ? ' on' : ''}`}
              aria-pressed={chips.includes(t)}
              onClick={() => toggleChip(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={`fld${errors.name ? ' err' : ''}`}>
        <label htmlFor="f-name">Name</label>
        <input
          id="f-name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          value={values.name}
          onChange={set('name')}
          aria-invalid={errors.name ?? false}
          aria-describedby={errors.name ? 'f-name-err' : undefined}
        />
        <span className="msg" id="f-name-err" role="alert">
          Please tell me your name.
        </span>
      </div>

      <div className={`fld${errors.email ? ' err' : ''}`}>
        <label htmlFor="f-email">Email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={values.email}
          onChange={set('email')}
          aria-invalid={errors.email ?? false}
          aria-describedby={errors.email ? 'f-email-err' : undefined}
        />
        <span className="msg" id="f-email-err" role="alert">
          That email doesn&apos;t look right.
        </span>
      </div>

      <div className="fld">
        <label htmlFor="f-company">
          Company <span style={{ opacity: '.5' }}>(optional)</span>
        </label>
        <input
          id="f-company"
          placeholder="Company or project"
          autoComplete="organization"
          value={values.company}
          onChange={set('company')}
        />
      </div>

      <div className={`fld${errors.type ? ' err' : ''}`}>
        <label htmlFor="f-type">Project type</label>
        <select
          id="f-type"
          value={values.type}
          onChange={set('type')}
          aria-invalid={errors.type ?? false}
          aria-describedby={errors.type ? 'f-type-err' : undefined}
        >
          <option value="">Select…</option>
          {PROJECT_TYPE_CHIPS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <span className="msg" id="f-type-err" role="alert">
          Pick the closest fit.
        </span>
      </div>

      <div className="fld">
        <label htmlFor="f-budget">Budget</label>
        <select id="f-budget" value={values.budget} onChange={set('budget')}>
          <option value="">Select…</option>
          <option>Under $2k</option>
          <option>$2k — $5k</option>
          <option>$5k — $10k</option>
          <option>$10k+</option>
        </select>
      </div>

      <div className="fld">
        <label htmlFor="f-timeline">Timeline</label>
        <select id="f-timeline" value={values.timeline} onChange={set('timeline')}>
          <option value="">Select…</option>
          <option>ASAP</option>
          <option>Within a month</option>
          <option>1 — 3 months</option>
          <option>Flexible</option>
        </select>
      </div>

      <div className={`fld full${errors.msg ? ' err' : ''}`}>
        <label htmlFor="f-msg">Message</label>
        <textarea
          id="f-msg"
          placeholder="What are we building, and what does success look like?"
          value={values.msg}
          onChange={set('msg')}
          aria-invalid={errors.msg ?? false}
          aria-describedby={errors.msg ? 'f-msg-err' : undefined}
        />
        <span className="msg" id="f-msg-err" role="alert">
          A sentence or two is all I need.
        </span>
      </div>

      <div className="full" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn" type="submit">
          Send the brief
        </button>
      </div>
    </form>
  );
}
