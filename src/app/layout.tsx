import { Poppins, JetBrains_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/system/theme-provider';
import { ToastProvider } from '@/components/system/toast-provider';
import { RevealInit } from '@/components/system/reveal-init';
import { SiteChrome } from '@/components/layout/site-chrome';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { SphereBackground } from '@/components/layout/sphere-background';
import { JsonLd } from '@/components/seo/json-ld';
import { personJsonLd, websiteJsonLd } from '@/lib/schema';
import { SITE } from '@/lib/site';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: '%s',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Delin B', url: SITE.url }],
  creator: 'Delin B',
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: SITE.url },
  openGraph: {
    title: SITE.title,
    description: 'Fast, accessible, precisely-crafted interfaces. React · Next.js · TypeScript · GSAP.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: SITE.title,
    description: 'Fast, accessible, precisely-crafted interfaces. React · Next.js · TypeScript · GSAP.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * Pre-paint bootstrap, identical in spirit to the source site's head script:
 * flags JS availability (drives reveal styling), restores the stored theme
 * before first paint to avoid a flash, and marks dark-hero routes.
 */
const BOOT_SCRIPT = `document.documentElement.className="js";if(location.pathname==="/")document.documentElement.dataset.darkhero="1";`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className={`${poppins.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <ToastProvider>
            <SphereBackground />
            <SkipLink />
            <SiteChrome />
            <main id="app" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <RevealInit />
            <JsonLd data={personJsonLd()} />
            <JsonLd data={websiteJsonLd()} />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
