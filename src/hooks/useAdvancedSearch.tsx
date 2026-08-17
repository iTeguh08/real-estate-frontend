import { createContext, useContext } from 'react';

export interface AdvancedSearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/** Provided by `@/components/providers/AdvancedSearchProvider`. */
export const AdvancedSearchContext = createContext<AdvancedSearchContextValue | null>(null);

export function useAdvancedSearch(): AdvancedSearchContextValue {
  const ctx = useContext(AdvancedSearchContext);
  if (!ctx) {
    throw new Error('useAdvancedSearch must be used within AdvancedSearchProvider');
  }
  return ctx;
}
