import { createContext } from 'react';
import type { Theme } from '@/lib/theme-store';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/** Provided by `@/components/providers/ThemeProvider`. */
export const ThemeContext = createContext<ThemeContextValue | null>(null);
