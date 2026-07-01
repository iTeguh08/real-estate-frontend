import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  isNavItemActive,
  resolveActiveNav,
  sectionToNavKey,
  type TopNavKey,
} from '@/data/navigation';
import { useListingFilters } from '@/hooks/useListingFilters';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export function useActiveNav() {
  const { pathname, hash } = useLocation();
  const { filters } = useListingFilters();
  const { onHome, activeSection } = useScrollSpy();

  const activeKey = useMemo(() => {
    if (onHome && activeSection) {
      return sectionToNavKey(activeSection);
    }
    return resolveActiveNav(pathname, hash);
  }, [onHome, activeSection, pathname, hash]);

  const isActive = (key: TopNavKey) => activeKey === key;

  const checkNavItem = (href: string, label: string) =>
    isNavItemActive(href, label, pathname, hash, filters, activeSection);

  return { pathname, hash, activeSection, onHome, activeKey, isActive, checkNavItem };
}
