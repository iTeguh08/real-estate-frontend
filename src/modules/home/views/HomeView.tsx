import { HeroSection } from '@/components/sections/HeroSection';
import { PropertyTypeGrid } from '@/components/sections/PropertyTypeGrid';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { BestPropertyValueSection } from '@/components/sections/BestPropertyValueSection';
import { MeetOurAgentsSection } from '@/components/sections/MeetOurAgentsSection';
import { WhatPeopleSaySection } from '@/components/sections/WhatPeopleSaySection';
import { HelpfulGuidesSection } from '@/components/sections/HelpfulGuidesSection';
import type { Agent } from '@/types';
import type { Article } from '@/types';
import type { Property, PropertySearchResult, PropertyTypeCount, PropertyWithAgent } from '@/types';
import type { HomepageContent } from '@/data/cms-fallbacks';

export interface HomeViewProps {
  homepage?: HomepageContent;
  featuredProperties?: Property[];
  searchResult?: PropertySearchResult;
  propertyTypeCounts?: PropertyTypeCount[];
  articles?: Article[];
  bestValueProperties?: PropertyWithAgent[];
  agents?: Agent[];
}

export function HomeView({
  articles,
  bestValueProperties,
  agents,
}: HomeViewProps) {
  return (
    <main id="main-content">
      <HeroSection />
      <PropertyTypeGrid />
      <FeaturedProperties />
      <ExpertiseSection />
      <LocationSection />
      <BestPropertyValueSection properties={bestValueProperties} />
      <MeetOurAgentsSection agents={agents} />
      <WhatPeopleSaySection />
      <HelpfulGuidesSection articles={articles} />
    </main>
  );
}
