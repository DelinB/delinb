import type { Metadata } from 'next';
import { SITE } from './site';

/** Build canonical, OG and Twitter metadata for a page. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  ogTitle?: string;
  ogDescription?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}): Metadata {
  const url = `${SITE.url}${opts.path === '/' ? '' : opts.path}`;
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.ogTitle ?? opts.title,
      description: opts.ogDescription ?? opts.description,
      url,
      siteName: SITE.name,
      type: opts.type ?? 'website',
      ...(opts.type === 'article'
        ? {
            publishedTime: opts.publishedTime,
            modifiedTime: opts.modifiedTime,
            authors: [SITE.url],
            tags: opts.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary',
      title: opts.ogTitle ?? opts.title,
      description: opts.ogDescription ?? opts.description,
    },
  };
}
