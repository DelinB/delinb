import { SITE, ALL_PAGES } from './site';
import { PROJECTS, POSTS, FAQS } from '@/data/content';

type Json = Record<string, unknown>;

const person = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Delin B',
  jobTitle: 'Frontend Developer',
  url: SITE.url,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressCountry: 'IN',
  },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'GSAP', 'Web Performance', 'Accessibility'],
  sameAs: [SITE.socials.github, SITE.socials.linkedin],
});

const website = (): Json => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  author: { '@type': 'Person', name: 'Delin B' },
});

export function personJsonLd() {
  return person();
}

export function websiteJsonLd() {
  return website();
}

export function webPageJsonLd(path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE.url}${path === '/' ? '' : path}`,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function articleJsonLd(slug: string) {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Person', name: 'Delin B', url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    articleSection: post.cat,
    keywords: (post.cats ?? [post.cat]).join(', '),
  };
}

export function creativeWorkJsonLd(slug: string) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.blurb,
    dateCreated: project.year,
    url: `${SITE.url}/projects/${project.slug}`,
    author: { '@type': 'Person', name: 'Delin B', url: SITE.url },
    keywords: project.tags.join(', '),
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: person(),
  };
}

export const PAGE_COUNT = ALL_PAGES.length;
