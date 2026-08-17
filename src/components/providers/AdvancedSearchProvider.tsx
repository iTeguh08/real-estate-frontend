import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AdvancedSearchContext } from '@/hooks/useAdvancedSearch';

/**
 * Isolated from ListingFilters so opening/closing the sheet does not
 * re-render hero, listings grid, or other filter consumers mid-animation.
 */
export function AdvancedSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const setOpen = useCallback((next: boolean) => {
    setOpenState(next);
  }, []);

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <AdvancedSearchContext.Provider value={value}>{children}</AdvancedSearchContext.Provider>
  );
}
