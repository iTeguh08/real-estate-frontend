import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AdvancedSearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AdvancedSearchContext = createContext<AdvancedSearchContextValue | null>(null);

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

export function useAdvancedSearch(): AdvancedSearchContextValue {
  const ctx = useContext(AdvancedSearchContext);
  if (!ctx) {
    throw new Error('useAdvancedSearch must be used within AdvancedSearchProvider');
  }
  return ctx;
}
