import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ScrollToHash } from '@/components/layout/ScrollToHash';
import { AdvancedSearchSheet } from '@/components/search/AdvancedSearchSheet';
import { CompareBar } from '@/components/compare/CompareBar';
import { useCompare } from '@/hooks/useCompare';
import { cn } from '@/lib/utils';

export function AppShell() {
  const { compareCount, lastLimited } = useCompare();
  const showCompareBar = compareCount > 0 || lastLimited;

  return (
    <div className="min-h-screen bg-[--color-luxury-cream]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-hz focus:bg-hz-primary focus:px-4 focus:py-2 focus:font-poppins focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <ScrollToHash />
      <SiteHeader />
      <div className={cn(showCompareBar && 'pb-[72px]')}>
        <Outlet />
      </div>
      <SiteFooter />
      <CompareBar />
      <AdvancedSearchSheet />
    </div>
  );
}
