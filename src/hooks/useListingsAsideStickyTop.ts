import { useLayoutEffect, useState, type RefObject } from 'react';

const HEADER_OFFSET_PX = 92;
const BOTTOM_GAP_PX = 16;
const LG_BREAKPOINT = 1024;

/**
 * Sticky top for the listings left column (Search + Latest).
 * Uses measured sidebar height so sticky waits until the full left
 * column is revealed — `top: calc(100% - …)` is wrong because `%` is
 * the grid row (right listings), not the aside itself.
 */
export function useListingsAsideStickyTop(
  asideRef: RefObject<HTMLElement | null>,
  /** Remeasure when listings change height (loading, pagination, etc.). */
  measureKey?: unknown,
): number | undefined {
  const [stickyTop, setStickyTop] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const asideEl = asideRef.current;
    if (!asideEl) return;

    const update = () => {
      if (window.innerWidth < LG_BREAKPOINT) {
        setStickyTop(undefined);
        return;
      }

      const leftHeight = asideEl.offsetHeight;
      if (leftHeight <= 0) {
        setStickyTop(undefined);
        return;
      }

      // Bottom-aligned when taller than viewport: delays stick until Latest is visible.
      // Header-capped when shorter: sits under the site header.
      const bottomAligned = window.innerHeight - leftHeight - BOTTOM_GAP_PX;
      setStickyTop(Math.min(HEADER_OFFSET_PX, bottomAligned));
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(asideEl);
    window.addEventListener('resize', update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [asideRef, measureKey]);

  return stickyTop;
}
