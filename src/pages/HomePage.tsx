import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyTypeGrid } from '@/components/sections/PropertyTypeGrid';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { BestPropertyValueSection } from '@/components/sections/BestPropertyValueSection';
import { MeetOurAgentsSection } from '@/components/sections/MeetOurAgentsSection';
import { WhatPeopleSaySection } from '@/components/sections/WhatPeopleSaySection';
import { HelpfulGuidesSection } from '@/components/sections/HelpfulGuidesSection';

export function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <PropertyTypeGrid />
      <FeaturedProperties />
      <ExpertiseSection />
      <LocationSection />
      <BestPropertyValueSection />
      <MeetOurAgentsSection />
      <WhatPeopleSaySection />
      <HelpfulGuidesSection />
    </main>
  );
}
