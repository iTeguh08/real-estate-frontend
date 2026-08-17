import { createContext, useContext, type RefObject } from 'react';

export const HEADER_SCROLL_BUFFER = 12;
export const DEFAULT_HEADER_HEIGHT = 76;

export interface SiteHeaderContextValue {
  headerRef: RefObject<HTMLElement | null>;
  height: number;
  isVisible: boolean;
  reducedMotion: boolean;
  /** Sticky / scroll-spy offset — 0 when header is hidden. */
  scrollOffset: number;
  /** Anchor navigation offset — always accounts for full header height. */
  anchorOffset: number;
  setLocked: (locked: boolean) => void;
  showHeader: () => void;
}

/** Provided by `@/components/providers/SiteHeaderProvider`. */
export const SiteHeaderContext = createContext<SiteHeaderContextValue | null>(null);

export function useSiteHeader(): SiteHeaderContextValue {
  const ctx = useContext(SiteHeaderContext);
  if (!ctx) {
    throw new Error('useSiteHeader must be used within SiteHeaderProvider');
  }
  return ctx;
}
