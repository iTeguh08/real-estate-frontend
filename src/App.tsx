import { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyTypeGrid } from '@/components/sections/PropertyTypeGrid';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { BestPropertyValueSection } from '@/components/sections/BestPropertyValueSection';
import { MeetOurAgentsSection } from '@/components/sections/MeetOurAgentsSection';
import { WhatPeopleSaySection } from '@/components/sections/WhatPeopleSaySection';
import { HelpfulGuidesSection } from '@/components/sections/HelpfulGuidesSection';
import type { PropertyType } from '@/types';

export default function App() {
  const [activePropertyType, setActivePropertyType] = useState<PropertyType | undefined>(
    undefined
  );

  return (
    <div className="min-h-screen bg-[--color-luxury-cream]">
      <SiteHeader />

      <main id="main-content">
        <HeroSection />
        <PropertyTypeGrid
          activeType={activePropertyType}
          onTypeChange={setActivePropertyType}
        />
        <FeaturedProperties />
        <ExpertiseSection />
        <LocationSection />
        <BestPropertyValueSection />
        <MeetOurAgentsSection />
        <WhatPeopleSaySection />
        <HelpfulGuidesSection />
      </main>

      <SiteFooter />
    </div>
  );
}
