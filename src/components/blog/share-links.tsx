import { CopyButton } from '@/components/ui/copy-button';

/** Share row — LinkedIn / X share intents plus a copy-link button, using the canonical URL. */
export function ShareLinks({ title, url }: { title: string; url: string }) {
  return (
    <div className="share" data-reveal>
      <b>Share</b>
      <a
        className="tag"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn ↗
      </a>
      <a
        className="tag"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X ↗
      </a>
      <CopyButton className="tag" text={url} message="Link copied to clipboard." ariaLabel="Copy article link">
        Copy link
      </CopyButton>
    </div>
  );
}
