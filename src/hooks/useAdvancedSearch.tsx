import { useContext } from 'react';
import {
  AdvancedSearchContext,
  type AdvancedSearchContextValue,
} from '@/context/advanced-search-context';

export type { AdvancedSearchContextValue };

export function useAdvancedSearch(): AdvancedSearchContextValue {
  const ctx = useContext(AdvancedSearchContext);
  if (!ctx) {
    throw new Error('useAdvancedSearch must be used within AdvancedSearchProvider');
  }
  return ctx;
}
