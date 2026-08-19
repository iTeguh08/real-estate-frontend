import { createContext } from 'react';

export interface AdvancedSearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/** Provided by `@/components/providers/AdvancedSearchProvider`. */
export const AdvancedSearchContext = createContext<AdvancedSearchContextValue | null>(null);
