export const THEME_STORAGE_KEY = 'hz-theme';

export type Theme = 'light' | 'navy';

/**
 * The `<html data-theme>` attribute is the live store: `pages/_document` bootstraps it
 * from localStorage before hydration, so components can subscribe to it instead of
 * copying it into React state through an effect.
 */
const themeListeners = new Set<() => void>();

function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'navy';
}

export function readStoredTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  const fromDom = document.documentElement.dataset.theme;
  if (isTheme(fromDom)) return fromDom;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // ignore
  }
  return 'light';
}

/** SSR and the very first hydration pass always agree on the document default. */
export function getServerTheme(): Theme {
  return 'light';
}

export function subscribeToTheme(onStoreChange: () => void): () => void {
  themeListeners.add(onStoreChange);
  return () => themeListeners.delete(onStoreChange);
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  for (const listener of themeListeners) listener();
}
