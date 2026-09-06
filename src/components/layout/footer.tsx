import Link from 'next/link';
import { SITE } from '@/lib/site';

/** Site footer — content and structure ported 1:1 from the source. */
export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <p className="ft-word">DELIN B</p>
        <div className="ft-cols">
          <div className="ft-col">
            <b>Delin B</b>
            <p>
              Frontend developer building fast, accessible, precisely-crafted interfaces —
              currently in Chennai, working with teams everywhere.
            </p>
            <span className="ft-status">
              <i className="dot" aria-hidden="true" />
              Open to new projects
            </span>
          </div>
          <nav className="ft-col" aria-label="Footer navigation">
            <b>Navigation</b>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <nav className="ft-col" aria-label="Footer projects">
            <b>Projects</b>
            <Link href="/projects/aurora-analytics">Aurora Analytics</Link>
            <Link href="/projects/kessel-commerce">Kessel</Link>
            <Link href="/projects/pulse-health">Pulse Health</Link>
            <Link href="/projects/meridian-bank">Meridian</Link>
            <Link href="/projects">All projects</Link>
            <Link href="/playground">Playground</Link>
          </nav>
          <div className="ft-col">
            <b>Elsewhere</b>
            <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <Link href="/resume">Resume</Link>
          </div>
        </div>
        <div className="ft-bar">
          <span>© 2025 Delin B · Designed &amp; developed by Delin B</span>
          <span>Chennai, India · IST (UTC+5:30)</span>
          <span>Last updated Jul 2025 · ⌘K to search</span>
        </div>
      </div>
    </footer>
  );
}
