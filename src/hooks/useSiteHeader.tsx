import { useContext } from 'react';
import { SiteHeaderContext, type SiteHeaderContextValue } from '@/context/site-header-context';

export type { SiteHeaderContextValue };

export function useSiteHeader(): SiteHeaderContextValue {
  const ctx = useContext(SiteHeaderContext);
  if (!ctx) {
    throw new Error('useSiteHeader must be used within SiteHeaderProvider');
  }
  return ctx;
}
