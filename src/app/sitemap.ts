import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { PROJECTS, POSTS } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE.url}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/skills`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/experience`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${SITE.url}/resume`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/playground`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE.url}/uses`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE.url}/testimonials`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.9 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.updated ?? p.date}T00:00:00`),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
