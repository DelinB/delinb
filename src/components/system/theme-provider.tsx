'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Theme provider matching the original site:
 * - `data-theme` attribute on <html> ("light" | "dark")
 * - persisted in localStorage under the same key the source used ("db-theme")
 * - default light, respects system preference when no stored value
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      storageKey="db-theme"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
