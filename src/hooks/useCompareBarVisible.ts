import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCompare } from '@/hooks/useCompare';
import { routes } from '@/lib/routes';

/** Routes where the sticky compare bar has no job. */
const HIDDEN_EXACT = new Set<string>([
  routes.compare,
  routes.login,
  routes.register,
  routes.submitProperty,
  routes.privacy,
]);

function isHiddenPath(pathname: string): boolean {
  if (HIDDEN_EXACT.has(pathname)) return true;
  if (pathname === routes.dashboard || pathname.startsWith(`${routes.dashboard}/`)) {
    return true;
  }
  return false;
}

/**
 * True when a Radix dialog/sheet overlay is mounted (portals unmount when closed).
 */
function hasBlockingOverlay(): boolean {
  return Boolean(
    document.querySelector(
      '[data-slot="dialog-overlay"], [data-slot="sheet-overlay"]'
    )
  );
}

/**
 * Shared visibility for CompareBar + AppShell bottom padding (below footer).
 * Hides on auth/dashboard/etc. and whenever a modal/sheet is open.
 */
export function useCompareBarVisible(): boolean {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { compareCount, limitNotice } = useCompare();
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOverlayOpen(hasBlockingOverlay());
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state', 'data-open', 'data-closed'],
    });

    return () => observer.disconnect();
  }, []);

  if (!isAuthenticated) return false;
  if (isHiddenPath(pathname)) return false;
  if (overlayOpen) return false;
  return compareCount > 0 || Boolean(limitNotice);
}
