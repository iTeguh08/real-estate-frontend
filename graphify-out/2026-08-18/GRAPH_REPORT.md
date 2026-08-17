# Graph Report - real-estate-frontend  (2026-08-18)

## Corpus Check
- 254 files · ~153,073 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1459 nodes · 4382 edges · 91 communities (73 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec45fb4c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-url.ts
- dependencies
- AppShell.tsx
- skeletons/index.ts
- MyListingsPage.tsx
- SiteHeader.tsx
- utils.ts
- PropertyDetailDialog.tsx
- Property
- LocationPicker.tsx
- ArticleDetailView.tsx
- resolveListingAgent
- cn
- compilerOptions
- PropertyShowcaseVillaView.tsx
- PropertyCard.tsx
- components.json
- ContactUsPage.tsx
- PropertyTypeGrid.tsx
- App.tsx
- PropertyShowcaseView.tsx
- pages.service.ts
- compilerOptions
- SubmitPropertyPage.tsx
- navigation.ts
- PropertyDetail
- types/index.ts
- runtime-env.ts
- src/pages/index.tsx
- src/pages/blog/[slug].tsx
- HeroSection.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- useAuth.tsx
- isMockDataEnabled
- EditMyListingPage.tsx
- SectionAtmosphere.tsx
- ListingsView.tsx
- cms-merge.ts
- app-link.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- src/pages/agents/[slug].tsx
- routes.ts
- WhatPeopleSaySection.tsx
- LocationSection.tsx
- BestValuePropertyCard.tsx
- next.config.mjs
- PrivacyPolicyPage.tsx
- PropertyType
- globals
- scripts
- AboutUsPage.tsx
- next-env.d.ts
- @tailwindcss/postcss
- optimize-bg.mjs
- vite
- postcss.config.mjs
- package.json
- dev-guard.mjs
- ArticleDetailPage.tsx
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- queries.ts
- eslint-plugin-react-refresh
- jsdom
- sharp
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- vitest
- PropertyVillaEditorialSection.tsx
- ComparePage.tsx
- @vitest/coverage-v8
- SiteFooter.tsx
- ExpertiseSection.tsx
- formatCount
- eslint-plugin-react-hooks
- useAuth
- graphql-client.ts
- badge.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 186 edges
2. `isMockDataEnabled()` - 76 edges
3. `routes` - 57 edges
4. `PropertyDetail` - 42 edges
5. `Property` - 36 edges
6. `AppLink()` - 34 edges
7. `useAuth()` - 33 edges
8. `MediaImage()` - 29 edges
9. `useTheme()` - 29 edges
10. `SectionAtmosphere()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `AgentCardProps` --references--> `Agent`  [EXTRACTED]
  src/components/cards/AgentCard.tsx → src/types/index.ts
- `ArticleCardProps` --references--> `Article`  [EXTRACTED]
  src/components/cards/ArticleCard.tsx → src/types/index.ts
- `BestValuePropertyCardProps` --references--> `PropertyWithAgent`  [EXTRACTED]
  src/components/cards/BestValuePropertyCard.tsx → src/types/index.ts
- `PropertyDetailDialogProps` --references--> `Property`  [EXTRACTED]
  src/components/cards/PropertyDetailDialog.tsx → src/types/index.ts
- `FooterLinkList()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/SiteFooter.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (91 total, 18 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.10
Nodes (34): LocationCard(), withCoverOriginal(), coverDisplaySize(), coverRequestWidth(), galleryOriginalUrl(), galleryPreviewUrl(), galleryTileMediaUrl(), GRID_CARD_PREVIEW_WIDTH (+26 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "AppShell.tsx"
Cohesion: 0.28
Nodes (11): AppShell(), scrollToElement(), ScrollToHash(), SiteHeaderProvider(), SiteHeaderSpacer(), DEFAULT_HEADER_HEIGHT, HEADER_SCROLL_BUFFER, SiteHeaderContext (+3 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.13
Nodes (17): AgentCardSkeleton(), AgentProfileSkeleton(), ArticleCardSkeletonProps, BestValueCardSkeleton(), BestValueCardSkeletonProps, CmsPageSkeleton(), CmsPageSkeletonProps, CmsPageSkeletonVariant (+9 more)

### Community 4 - "MyListingsPage.tsx"
Cohesion: 0.12
Nodes (23): useCancelPropertySubmissionMutation(), useMyListingsQuery(), useMyPropertySubmissionsQuery(), formatListingPrice(), formatPrice(), MyListingsPage(), statusBadgeClass(), submissionBadgeClass() (+15 more)

### Community 5 - "SiteHeader.tsx"
Cohesion: 0.20
Nodes (13): mobileNavLinkClasses(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader(), ARTICLE_PREVIEW_COUNT, PAGES_NAV_GROUPS (+5 more)

### Community 6 - "utils.ts"
Cohesion: 0.16
Nodes (12): AgentCard(), AgentCardProps, InquiryDialog(), PropertyMediaSlotField(), PropertyMediaSlotFieldProps, PropertyVillaHero(), VillaHeroContentPanelProps, Input() (+4 more)

### Community 7 - "PropertyDetailDialog.tsx"
Cohesion: 0.08
Nodes (36): PropertyDetailDialogProps, ContextIcon, InquiryContextBlock, InquiryDialogProps, chunkFullPages(), chunkPartialPages(), GalleryTile(), PropertyGalleryGrid() (+28 more)

### Community 8 - "Property"
Cohesion: 0.22
Nodes (17): FeaturedPropertiesProps, HomepageContent, AgentProfileViewProps, HomeView(), HomeViewProps, ListingsViewProps, PropertyDetailView(), PropertyDetailViewProps (+9 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.10
Nodes (20): LocationValue, composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry(), LocationPicker() (+12 more)

### Community 10 - "ArticleDetailView.tsx"
Cohesion: 0.24
Nodes (12): ArticleCard(), ArticleCardProps, HelpfulGuidesSectionProps, ArticleCardSkeleton(), ARTICLE_CATEGORY_LABELS, getArticleCategoryLabel(), getArticlePath(), getArticlesListPath() (+4 more)

### Community 11 - "resolveListingAgent"
Cohesion: 0.23
Nodes (10): PropertyContactStrip(), PropertyContactStripProps, PropertyInquiryDialogs(), PropertyInquiryDialogsProps, PropertyVillaHighlights(), PropertyVillaHighlightsProps, agentFirstName(), askAgentLabel() (+2 more)

### Community 12 - "cn"
Cohesion: 0.08
Nodes (36): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), Card(), CardAction(), CardContent() (+28 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "PropertyShowcaseVillaView.tsx"
Cohesion: 0.21
Nodes (11): PropertyRelatedSection(), PropertyShowcaseClassicView(), PropertyShowcaseVillaView, PropertyShowcaseVillaView(), PropertyShowcaseVillaViewProps, AmenityItem, buildAmenityItems(), iconForAmenity() (+3 more)

### Community 15 - "PropertyCard.tsx"
Cohesion: 0.12
Nodes (25): CardVariants, PropertyCard(), PropertyCardProps, SpecPillProps, PropertyDetailBody(), HeroActionButtons(), HeroActionButtonsProps, HeroContentPanel() (+17 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "ContactUsPage.tsx"
Cohesion: 0.07
Nodes (47): ContactUsPage, AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps, AuthSubmitButton(), FormField(), FormFieldProps (+39 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.24
Nodes (13): ApartmentIllustration(), CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration() (+5 more)

### Community 19 - "App.tsx"
Cohesion: 0.14
Nodes (15): BootstrapLoaderComplete(), ComparePage, EditMyListingPage, LoginPage, MyListingsPage, NewsPage, NotFoundPage, PropertyListingsPage (+7 more)

### Community 20 - "PropertyShowcaseView.tsx"
Cohesion: 0.15
Nodes (16): PropertyDetailPage, PropertyShowcasePage, PropertyFeaturesBlock(), PropertyFeaturesBlockProps, PropertyShowcaseNotFound(), PropertyShowcaseView(), PropertyShowcaseViewProps, PropertyShowcaseSkeleton() (+8 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.13
Nodes (25): ABOUT_PAGE_FALLBACK, AboutPageContent, CmsSeoMeta, CmsStat, CmsTimelineItem, CONTACT_PAGE_FALLBACK, ContactPageContent, HOMEPAGE_FALLBACK (+17 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "SubmitPropertyPage.tsx"
Cohesion: 0.12
Nodes (23): SubmitPropertyPage, useSubmitPropertyMutation(), isAgentUser(), clearFieldError(), firstApiFieldError(), getApiFieldErrors(), SubmitPropertyPage, composeLocation() (+15 more)

### Community 24 - "navigation.ts"
Cohesion: 0.21
Nodes (15): HOME_SCROLL_SECTIONS, HomeScrollSection, isNavItemActive(), NavLinkGroup, NavLinkItem, normalizePath(), PAGE_ROUTES, PAGE_SCROLL_SECTIONS (+7 more)

### Community 25 - "PropertyDetail"
Cohesion: 0.20
Nodes (12): PropertyIntroduction(), PropertyIntroductionProps, PropertyOverviewBackground(), PropertyOverviewBackgroundProps, PropertyOverviewCanvas(), PropertyOverviewCanvasProps, PropertyShowcaseSection(), PropertyShowcaseSectionProps (+4 more)

### Community 26 - "types/index.ts"
Cohesion: 0.15
Nodes (24): ListingSortSelect(), ListingSortSelectProps, SearchIntentBanner(), SearchIntentBannerProps, FeaturedProperties(), describeSearchIntent(), hasSearchIntent(), listingFiltersToSearchVariables() (+16 more)

### Community 27 - "runtime-env.ts"
Cohesion: 0.15
Nodes (25): isHomePath(), isListingsPath(), ListingFiltersProvider(), listingsHref(), filtersEqual(), filtersToSearchParams(), hasFilterParams(), isPropertySort() (+17 more)

### Community 28 - "src/pages/index.tsx"
Cohesion: 0.24
Nodes (11): AGENTS, BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES, countByType(), PROPERTY_TYPE_ITEMS, getStaticProps(), HomePage(), hydrateHomeQueries() (+3 more)

### Community 29 - "src/pages/blog/[slug].tsx"
Cohesion: 0.23
Nodes (15): ARTICLES, mergeArticlesWithFallback(), mergeArticleWithFallback(), absoluteUrl(), BlogPage(), BlogPageProps, getStaticProps(), BlogArticlePage() (+7 more)

### Community 30 - "HeroSection.tsx"
Cohesion: 0.13
Nodes (16): MobileNavGroup(), NavDropdownPanel(), AdvancedSearchProvider(), AdvancedSearchSheet(), FALLBACK_HERO_IMAGE, HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG (+8 more)

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.14
Nodes (15): BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS, Sheet() (+7 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "useAuth.tsx"
Cohesion: 0.26
Nodes (15): AuthProvider(), AuthContext, AuthContextValue, fetchCurrentUser(), loginMember(), logoutMember(), registerMember(), UserResponse (+7 more)

### Community 34 - "isMockDataEnabled"
Cohesion: 0.14
Nodes (24): EmailForm, useLiveEmailAvailability(), isMockDataEnabled(), apiFetch(), getApiBaseUrl(), LaravelErrorBody, normalizeFieldErrors(), checkEmailAvailable() (+16 more)

### Community 35 - "EditMyListingPage.tsx"
Cohesion: 0.09
Nodes (47): COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, CustomLayout, LAYOUT1_MEDIA_SLOTS, LAYOUT2_MEDIA_SLOTS, MediaSlotField, MediaSlotMeta, useClearMyListingGalleryMutation() (+39 more)

### Community 36 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 37 - "ListingsView.tsx"
Cohesion: 0.15
Nodes (24): useBestValuePropertiesQuery(), useFeaturedPropertiesQuery(), usePropertySearchQuery(), useListingsAsideStickyTop(), parseAppLocation(), useAppSearchParams(), listingFiltersQueryVars(), normalizeListingsFilters() (+16 more)

### Community 38 - "cms-merge.ts"
Cohesion: 0.27
Nodes (15): ALL_PROPERTIES, coalesce(), coalesceMediaObject(), findFallbackProperty(), hasGalleryImages(), isBlank(), mergeAgentsWithFallback(), mergeAgentWithFallback() (+7 more)

### Community 39 - "app-link.tsx"
Cohesion: 0.15
Nodes (13): AgentProfilePage, PropertyDetailDialog(), PropertyRelatedSectionProps, BestPropertyValueSection(), BestPropertyValueSectionProps, useAgentQuery(), AppLink(), AppLinkProps (+5 more)

### Community 40 - "cva.ts"
Cohesion: 0.12
Nodes (15): filterTab, FilterTabVariants, luxuryButton, LuxuryButtonVariants, navLink, NavLinkVariants, newBadge, NewBadgeVariants (+7 more)

### Community 41 - "Homzen Real Estate — Frontend"
Cohesion: 0.22
Nodes (8): Auth-protected routes, Deploy, Design system, Homzen Real Estate — Frontend, Important env, Local development, Scripts, Stack

### Community 42 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, @eslint/js, devDependencies, eslint, @eslint/js, tailwindcss, @tailwindcss/vite, @types/leaflet (+7 more)

### Community 43 - "src/pages/agents/[slug].tsx"
Cohesion: 0.19
Nodes (18): useHydrateQueryCache(), jsonSafe(), withSsgFallback(), AgentsPage(), getStaticProps(), AgentProfilePage(), getStaticPaths(), getStaticProps() (+10 more)

### Community 44 - "routes.ts"
Cohesion: 0.18
Nodes (10): DashboardPage, RequireAuth(), PageLoader(), AppRoute, routes, DashboardPage, DashboardRoute(), LoginRoute() (+2 more)

### Community 45 - "WhatPeopleSaySection.tsx"
Cohesion: 0.27
Nodes (8): TestimonialCard(), TestimonialCardProps, WhatPeopleSaySectionProps, CarouselControls(), CarouselControlsProps, TONE_STYLES, TESTIMONIALS, Testimonial

### Community 46 - "LocationSection.tsx"
Cohesion: 0.08
Nodes (37): App(), ThemeToggleButton(), ThemedToaster(), ThemeProvider(), ExpertiseSection(), buildLocationRows(), buildLocationSlides(), LocationCardProps (+29 more)

### Community 47 - "BestValuePropertyCard.tsx"
Cohesion: 0.28
Nodes (6): BestValuePropertyCard(), BestValuePropertyCardProps, ImageActionButton(), ImageActionButtonProps, formatPerSqftPrice(), SidebarRecentProperty()

### Community 49 - "PrivacyPolicyPage.tsx"
Cohesion: 0.43
Nodes (5): PrivacyPolicyPage, usePrivacyPageQuery(), sanitizeHtml(), PrivacyPolicyPage(), getPrivacyPage()

### Community 50 - "PropertyType"
Cohesion: 0.25
Nodes (9): PropertyTypeCardProps, PROPERTY_FORM, PROPERTY_TYPES, PropertyTypeItem, ListingFiltersContext, ListingFiltersContextValue, PropertySubmissionData, PropertyStatus (+1 more)

### Community 53 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, build:vite, dev, dev:vite, lint, optimize:bg, optimize:hero (+6 more)

### Community 54 - "AboutUsPage.tsx"
Cohesion: 0.22
Nodes (9): AboutUsPage, AtmosphereImage, CmsService, CmsValue, useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages() (+1 more)

### Community 57 - "optimize-bg.mjs"
Cohesion: 0.32
Nodes (7): backupDir, backupOnce(), bgDir, convertRasterToWebp(), __dirname, entries, resizeWebpInPlace()

### Community 60 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 61 - "dev-guard.mjs"
Cohesion: 0.53
Nodes (5): findRunningDevServers(), projectRoot, readProc(), running, selfChain()

### Community 62 - "ArticleDetailPage.tsx"
Cohesion: 0.67
Nodes (3): ArticleDetailPage, useArticleQuery(), ArticleDetailPage()

### Community 63 - "vite-env.d.ts"
Cohesion: 0.40
Nodes (4): *.css, ImportMeta, ImportMetaEnv, *.png

### Community 64 - "compilerOptions"
Cohesion: 0.06
Nodes (31): dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, pages/**/*.ts, pages/**/*.tsx, src/pages/_app.tsx (+23 more)

### Community 65 - "optimize-hero.mjs"
Cohesion: 0.50
Nodes (3): __dirname, outWebp, srcPng

### Community 68 - "queries.ts"
Cohesion: 0.33
Nodes (6): PropertyTypeGrid(), usePropertyQuery(), usePropertyTypeCountsQuery(), queryKeys, getPropertyBySlug(), ArticleCategory

### Community 80 - "PropertyVillaEditorialSection.tsx"
Cohesion: 0.25
Nodes (5): InteriorCopy(), OverviewCopy(), PropertyVillaEditorialSection(), PropertyVillaEditorialSectionProps, PropertyVillaUtilityAction

### Community 84 - "ComparePage.tsx"
Cohesion: 0.22
Nodes (17): CompareBar(), CompareTableSkeleton(), useToggleCompareMutation(), useCompare(), hasBlockingOverlay(), HIDDEN_EXACT, isHiddenPath(), useCompareBarVisible() (+9 more)

### Community 87 - "SiteFooter.tsx"
Cohesion: 0.09
Nodes (29): AgentsListingPage, BlogPage, SiteBrandingEffect(), buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList() (+21 more)

### Community 90 - "ExpertiseSection.tsx"
Cohesion: 0.33
Nodes (4): ExpertiseItem, ExpertiseServiceCard(), KEY_DIFFERENTIATORS, SERVICE_META

### Community 91 - "formatCount"
Cohesion: 0.27
Nodes (10): DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery(), seedFromId(), formatCount(), mediaPreviewUrl() (+2 more)

### Community 96 - "useAuth"
Cohesion: 0.36
Nodes (7): PropertyCtaSection(), PropertyCtaSectionProps, PropertyVillaCtaBanner(), PropertyVillaCtaBannerProps, useAuth(), contactAgentLabel(), DashboardPage()

### Community 97 - "graphql-client.ts"
Cohesion: 0.50
Nodes (3): getGraphqlUrl(), GraphqlError, graphqlFetch()

## Knowledge Gaps
- **353 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+348 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `image-url.ts`, `AppShell.tsx`, `skeletons/index.ts`, `MyListingsPage.tsx`, `SiteHeader.tsx`, `utils.ts`, `PropertyDetailDialog.tsx`, `LocationPicker.tsx`, `ArticleDetailView.tsx`, `PropertyShowcaseVillaView.tsx`, `PropertyCard.tsx`, `ContactUsPage.tsx`, `PropertyTypeGrid.tsx`, `SubmitPropertyPage.tsx`, `types/index.ts`, `HeroSection.tsx`, `AdvancedSearchSheet.tsx`, `EditMyListingPage.tsx`, `SectionAtmosphere.tsx`, `ListingsView.tsx`, `app-link.tsx`, `routes.ts`, `WhatPeopleSaySection.tsx`, `LocationSection.tsx`, `BestValuePropertyCard.tsx`, `PrivacyPolicyPage.tsx`, `AboutUsPage.tsx`, `queries.ts`, `ComparePage.tsx`, `SiteFooter.tsx`, `ExpertiseSection.tsx`, `badge.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `MyListingsPage.tsx`, `utils.ts`, `PropertyDetailDialog.tsx`, `LocationPicker.tsx`, `ContactUsPage.tsx`, `PropertyShowcaseView.tsx`, `pages.service.ts`, `SubmitPropertyPage.tsx`, `types/index.ts`, `runtime-env.ts`, `src/pages/index.tsx`, `src/pages/blog/[slug].tsx`, `useAuth.tsx`, `EditMyListingPage.tsx`, `ListingsView.tsx`, `src/pages/agents/[slug].tsx`, `PrivacyPolicyPage.tsx`, `queries.ts`, `ComparePage.tsx`, `SiteFooter.tsx`, `graphql-client.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `routes` connect `routes.ts` to `MyListingsPage.tsx`, `SiteHeader.tsx`, `utils.ts`, `PropertyDetailDialog.tsx`, `ArticleDetailView.tsx`, `PropertyCard.tsx`, `ContactUsPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `PropertyShowcaseView.tsx`, `SubmitPropertyPage.tsx`, `navigation.ts`, `types/index.ts`, `runtime-env.ts`, `src/pages/index.tsx`, `src/pages/blog/[slug].tsx`, `EditMyListingPage.tsx`, `ListingsView.tsx`, `app-link.tsx`, `src/pages/agents/[slug].tsx`, `LocationSection.tsx`, `BestValuePropertyCard.tsx`, `AboutUsPage.tsx`, `ArticleDetailPage.tsx`, `ComparePage.tsx`, `SiteFooter.tsx`, `ExpertiseSection.tsx`, `useAuth`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _353 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10317460317460317 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `skeletons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1310483870967742 - nodes in this community are weakly interconnected._