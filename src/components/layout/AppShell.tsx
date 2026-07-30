import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteBrandingEffect } from '@/components/layout/SiteBrandingEffect';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ScrollToHash } from '@/components/layout/ScrollToHash';
import { AdvancedSearchSheet } from '@/components/search/AdvancedSearchSheet';
import { CompareBar } from '@/components/compare/CompareBar';
import { useCompare } from '@/hooks/useCompare';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

export function AppShell() {
  const { pathname } = useLocation();
  const { compareCount, limitNotice } = useCompare();
  const showCompareBar =
    pathname !== routes.compare && (compareCount > 0 || Boolean(limitNotice));

  return (
    <div className="min-h-screen bg-hz-page">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-hz focus:bg-hz-primary focus:px-4 focus:py-2 focus:font-poppins focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <ScrollToHash />
      <SiteBrandingEffect />
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
