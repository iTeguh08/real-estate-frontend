import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteBrandingEffect } from '@/components/layout/SiteBrandingEffect';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ScrollToHash } from '@/components/layout/ScrollToHash';
import { AdvancedSearchSheet } from '@/components/search/AdvancedSearchSheet';
import { CompareBar } from '@/components/compare/CompareBar';
import { useCompareBarVisible } from '@/hooks/useCompareBarVisible';
import { AdvancedSearchProvider } from '@/hooks/useAdvancedSearch';
import { SiteHeaderProvider, SiteHeaderSpacer } from '@/hooks/useSiteHeader';
import { cn } from '@/lib/utils';

export function AppShell() {
  const showCompareBar = useCompareBarVisible();

  return (
    <SiteHeaderProvider>
    <AdvancedSearchProvider>
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
      <SiteHeaderSpacer />
      {/* Spacer below footer so the fixed Compare bar doesn't cover footer chrome */}
      <div className={cn(showCompareBar && 'pb-[72px]')}>
        <Outlet />
        <SiteFooter />
      </div>
      <CompareBar />
      <AdvancedSearchSheet />
    </div>
    </AdvancedSearchProvider>
    </SiteHeaderProvider>
  );
}
