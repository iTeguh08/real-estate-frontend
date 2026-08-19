import { useCallback, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import { ThemeContext } from '@/context/theme-context';
import {
  applyTheme,
  getServerTheme,
  readStoredTheme,
  subscribeToTheme,
  type Theme,
} from '@/lib/theme-store';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Subscribing to the document attribute keeps SSR output and the first client paint
  // identical while still honouring the visitor's stored theme right after hydration.
  const theme = useSyncExternalStore(subscribeToTheme, readStoredTheme, getServerTheme);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(readStoredTheme() === 'navy' ? 'light' : 'navy');
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
