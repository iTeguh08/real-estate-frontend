import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteBrandingEffect } from '@/components/layout/SiteBrandingEffect';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ScrollToHash } from '@/components/layout/ScrollToHash';
import { useCompareBarVisible } from '@/hooks/useCompareBarVisible';
import { AdvancedSearchProvider } from '@/components/providers/AdvancedSearchProvider';
import {
  SiteHeaderProvider,
  SiteHeaderSpacer,
} from '@/components/providers/SiteHeaderProvider';
import { cn } from '@/lib/utils';

/** Sheet/compare chrome — keep out of the homepage critical JS path. */
const AdvancedSearchSheet = dynamic(
  () =>
    import('@/components/search/AdvancedSearchSheet').then((m) => ({
      default: m.AdvancedSearchSheet,
    })),
  { ssr: false },
);
const CompareBar = dynamic(
  () =>
    import('@/components/compare/CompareBar').then((m) => ({
      default: m.CompareBar,
    })),
  { ssr: false },
);

export function AppShell({ children }: { children: ReactNode }) {
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
        {children}
        <SiteFooter />
      </div>
      <CompareBar />
      <AdvancedSearchSheet />
    </div>
    </AdvancedSearchProvider>
    </SiteHeaderProvider>
  );
}
