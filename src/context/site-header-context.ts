import { createContext, type RefObject } from 'react';

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
