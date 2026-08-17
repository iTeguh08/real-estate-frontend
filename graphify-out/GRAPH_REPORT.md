# Graph Report - real-estate-frontend  (2026-08-18)

## Corpus Check
- 254 files · ~153,218 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1460 nodes · 4383 edges · 92 communities (73 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `992741a1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-url.ts
- dependencies
- AppShell.tsx
- skeletons/index.ts
- MyListingsPage.tsx
- SiteHeader.tsx
- PropertyGalleryGrid.tsx
- InquiryDialog.tsx
- src/pages/index.tsx
- LocationPicker.tsx
- ArticleDetailView.tsx
- useAuth
- cn
- compilerOptions
- PropertyShowcaseView.tsx
- PropertyCard.tsx
- components.json
- SubmitPropertyPage.tsx
- PropertyTypeGrid.tsx
- App.tsx
- PropertyDetailPage.tsx
- pages.service.ts
- compilerOptions
- useTheme
- navigation.ts
- PropertyDetail
- types/index.ts
- ListingFiltersProvider.tsx
- image-lightbox.tsx
- src/pages/blog/[slug].tsx
- HeroSection.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- auth.service.ts
- api-client.ts
- EditMyListingPage.tsx
- SectionAtmosphere.tsx
- ListingsView.tsx
- cms-merge.ts
- main.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- src/pages/agents/[slug].tsx
- utils.ts
- WhatPeopleSaySection.tsx
- useTheme.tsx
- src/pages/properties/[slug].tsx
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
- SiteFooter.tsx
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- queries.ts
- eslint-plugin-react-refresh
- jsdom
- sharp
- LocationSection.tsx
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- FormSelect.tsx
- vitest
- PropertyVillaEditorialSection.tsx
- isMockDataEnabled
- @vitest/coverage-v8
- PageLoader.tsx
- useSiteConfig
- ExpertiseSection.tsx
- property-details.ts
- eslint-plugin-react-hooks
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
- `FooterLinkList()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/SiteFooter.tsx → src/lib/utils.ts
- `PropertyContactStripProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyContactStrip.tsx → src/types/index.ts
- `PropertyInquiryDialogsProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyInquiryDialogs.tsx → src/types/index.ts
- `PropertyShowcaseViewProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyShowcaseView.tsx → src/types/index.ts
- `PropertyShowcaseVillaViewProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyShowcaseVillaView.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (92 total, 19 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.10
Nodes (30): withCoverOriginal(), coverDisplaySize(), coverRequestWidth(), galleryLightboxUrl(), galleryOriginalUrl(), GRID_CARD_PREVIEW_WIDTH, HERO_PREVIEW_WIDTH, isApiImagesUrl() (+22 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "AppShell.tsx"
Cohesion: 0.14
Nodes (18): CompareBar(), AppShell(), scrollToElement(), ScrollToHash(), AdvancedSearchProvider(), SiteHeaderProvider(), SiteHeaderSpacer(), AdvancedSearchContext (+10 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.14
Nodes (17): AgentCardSkeleton(), AgentProfileSkeleton(), ArticleCardSkeleton(), ArticleCardSkeletonProps, BestValueCardSkeleton(), BestValueCardSkeletonProps, CmsPageSkeleton(), CmsPageSkeletonProps (+9 more)

### Community 4 - "MyListingsPage.tsx"
Cohesion: 0.13
Nodes (20): MyListingsPage, useMyPropertySubmissionsQuery(), formatListingPrice(), formatPrice(), MyListingsPage(), statusBadgeClass(), submissionBadgeClass(), SubmissionRow() (+12 more)

### Community 5 - "SiteHeader.tsx"
Cohesion: 0.19
Nodes (15): mobileNavLinkClasses(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader(), NavigationMenu(), NavigationMenuContent() (+7 more)

### Community 6 - "PropertyGalleryGrid.tsx"
Cohesion: 0.20
Nodes (11): chunkFullPages(), chunkPartialPages(), GalleryTile(), PropertyGalleryGrid(), PropertyGalleryGridProps, galleryPreviewUrl(), galleryTileMediaUrl(), PROPERTY_GALLERY_COUNT (+3 more)

### Community 7 - "InquiryDialog.tsx"
Cohesion: 0.17
Nodes (13): ContextIcon, InquiryContextBlock, InquiryDialogProps, Button(), buttonVariants, Dialog(), DialogClose(), DialogContent() (+5 more)

### Community 8 - "src/pages/index.tsx"
Cohesion: 0.16
Nodes (24): AgentCardProps, BestValuePropertyCardProps, PropertyDetailDialogProps, PropertyRelatedSectionProps, BestPropertyValueSectionProps, HomepageContent, AgentProfileViewProps, AgentsViewProps (+16 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.10
Nodes (20): LocationValue, composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry(), LocationPicker() (+12 more)

### Community 10 - "ArticleDetailView.tsx"
Cohesion: 0.29
Nodes (11): ArticleDetailPage, ArticleCard(), useArticleQuery(), ARTICLE_CATEGORY_LABELS, getArticleCategoryLabel(), getArticlePath(), getArticlesListPath(), getArticleTagPath() (+3 more)

### Community 11 - "useAuth"
Cohesion: 0.20
Nodes (14): PropertyContactStrip(), PropertyContactStripProps, PropertyCtaSection(), PropertyVillaCtaBanner(), PropertyVillaHighlights(), PropertyVillaHighlightsProps, useAuth(), formatPropertyPrice() (+6 more)

### Community 12 - "cn"
Cohesion: 0.08
Nodes (32): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), HeroActionButtons(), ShowcaseThumbGrid(), PropertyMediaSlotField() (+24 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "PropertyShowcaseView.tsx"
Cohesion: 0.18
Nodes (15): PropertyDetailHero(), PropertyInquiryDialogs(), PropertyInquiryDialogsProps, PropertyShowcaseClassicView(), PropertyShowcaseViewProps, PropertyShowcaseVillaView, PropertyShowcaseVillaView(), PropertyShowcaseVillaViewProps (+7 more)

### Community 15 - "PropertyCard.tsx"
Cohesion: 0.11
Nodes (34): BestValuePropertyCard(), CardVariants, PropertyCard(), PropertyCardProps, SpecPillProps, PropertyDetailBody(), HeroContentPanel(), PropertyVillaHero() (+26 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "SubmitPropertyPage.tsx"
Cohesion: 0.05
Nodes (63): ContactUsPage, LoginPage, RegisterPage, SubmitPropertyPage, AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps (+55 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.22
Nodes (13): CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration(), DEFAULT_HIGHLIGHT_TYPE (+5 more)

### Community 19 - "App.tsx"
Cohesion: 0.16
Nodes (14): AgentProfilePage, BootstrapLoaderComplete(), ComparePage, DashboardPage, EditMyListingPage, NotFoundPage, PropertyListingsPage, RouteFallback() (+6 more)

### Community 20 - "PropertyDetailPage.tsx"
Cohesion: 0.21
Nodes (11): PropertyDetailPage, PropertyShowcasePage, PropertyShowcaseNotFound(), PropertyShowcaseView(), PropertyShowcaseSkeleton(), usePropertyDetailByIdQuery(), usePropertyDetailQuery(), resolvePropertyCustomLayout() (+3 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.08
Nodes (44): ABOUT_PAGE_FALLBACK, AboutPageContent, CmsSeoMeta, CmsService, CmsStat, CmsTimelineItem, CmsValue, CONTACT_PAGE_FALLBACK (+36 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "useTheme"
Cohesion: 0.20
Nodes (12): ThemeToggleButton(), PropertyRelatedSection(), ExpertiseSection(), buildAgentSlides(), MeetOurAgentsSection(), MeetOurAgentsSectionProps, useAgentsPerSlide(), CarouselControls() (+4 more)

### Community 24 - "navigation.ts"
Cohesion: 0.14
Nodes (22): MobileNavGroup(), NavDropdownPanel(), HOME_SCROLL_SECTIONS, HomeScrollSection, isNavItemActive(), NavLinkGroup, NavLinkItem, normalizePath() (+14 more)

### Community 25 - "PropertyDetail"
Cohesion: 0.11
Nodes (24): PropertyCtaSectionProps, HeroActionButtonsProps, HeroContentPanelProps, PropertyDetailHeroProps, ShowcaseThumb, ShowcaseThumbGridProps, PropertyFeaturesBlock(), PropertyFeaturesBlockProps (+16 more)

### Community 26 - "types/index.ts"
Cohesion: 0.13
Nodes (27): ListingSortSelect(), ListingSortSelectProps, SearchIntentBanner(), SearchIntentBannerProps, FeaturedProperties(), FeaturedPropertiesProps, mergePropertiesWithFallback(), describeSearchIntent() (+19 more)

### Community 27 - "ListingFiltersProvider.tsx"
Cohesion: 0.31
Nodes (10): isHomePath(), isListingsPath(), ListingFiltersProvider(), filtersEqual(), hasFilterParams(), isPropertySort(), isPropertyStatus(), isPropertyType() (+2 more)

### Community 28 - "image-lightbox.tsx"
Cohesion: 0.15
Nodes (13): ImageLightboxOverlay(), ImageLightboxOverlayProps, ImageLightboxPanel(), ImageLightboxPanelProps, LightboxCloseButton, lightboxFrame(), LightboxImage(), LightboxImageProps (+5 more)

### Community 29 - "src/pages/blog/[slug].tsx"
Cohesion: 0.17
Nodes (18): ArticleCardProps, HelpfulGuidesSection(), HelpfulGuidesSectionProps, ARTICLE_PREVIEW_COUNT, ARTICLES, mergeArticlesWithFallback(), mergeArticleWithFallback(), ArticleDetailViewProps (+10 more)

### Community 30 - "HeroSection.tsx"
Cohesion: 0.24
Nodes (8): FALLBACK_HERO_IMAGE, HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG, TABS, TYPE_OPTIONS, withCoverBox(), preloadImage()

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.13
Nodes (17): AdvancedSearchSheet(), BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS (+9 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "auth.service.ts"
Cohesion: 0.28
Nodes (15): AuthProvider(), AuthContext, AuthContextValue, fetchCurrentUser(), loginMember(), logoutMember(), registerMember(), UserResponse (+7 more)

### Community 34 - "api-client.ts"
Cohesion: 0.15
Nodes (18): InquiryDialog(), useSubmitContactMutation(), useSecurityConfig(), apiFetch(), getApiBaseUrl(), LaravelErrorBody, normalizeFieldErrors(), ContactFormData (+10 more)

### Community 35 - "EditMyListingPage.tsx"
Cohesion: 0.08
Nodes (50): COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, CustomLayout, LAYOUT1_MEDIA_SLOTS, LAYOUT2_MEDIA_SLOTS, MediaSlotField, MediaSlotMeta, useCancelPropertySubmissionMutation() (+42 more)

### Community 36 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 37 - "ListingsView.tsx"
Cohesion: 0.12
Nodes (30): BestPropertyValueSection(), listingsHref(), useBestValuePropertiesQuery(), useFeaturedPropertiesQuery(), usePropertySearchQuery(), parseAppLocation(), filtersToSearchParams(), listingFiltersQueryVars() (+22 more)

### Community 38 - "cms-merge.ts"
Cohesion: 0.16
Nodes (21): AGENTS, BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES, countByType(), PROPERTY_TYPE_ITEMS, PROPERTY_TYPES, TYPE_SELECT_OPTIONS, ALL_PROPERTIES (+13 more)

### Community 39 - "main.tsx"
Cohesion: 0.24
Nodes (6): App(), ThemedToaster(), preloadCriticalFonts(), queryClient, queryClientOptions, App()

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
Cohesion: 0.22
Nodes (13): SITE_CONFIG, useHydrateQueryCache(), queryKeys, jsonSafe(), withSsgFallback(), AgentsPage(), getStaticProps(), AgentProfilePage() (+5 more)

### Community 44 - "utils.ts"
Cohesion: 0.14
Nodes (16): RequireAuth(), AgentCard(), PropertyDetailDialog(), preloadLightboxCover(), HIDDEN_EXACT, AppLink(), AppLinkProps, AppTo (+8 more)

### Community 45 - "WhatPeopleSaySection.tsx"
Cohesion: 0.23
Nodes (11): TestimonialCard(), TestimonialCardProps, buildLocationRows(), buildLocationSlides(), LocationSection(), WhatPeopleSaySection(), WhatPeopleSaySectionProps, TESTIMONIALS (+3 more)

### Community 46 - "useTheme.tsx"
Cohesion: 0.30
Nodes (11): ThemeProvider(), ThemeContext, ThemeContextValue, applyTheme(), getServerTheme(), isTheme(), readStoredTheme(), subscribeToTheme() (+3 more)

### Community 47 - "src/pages/properties/[slug].tsx"
Cohesion: 0.29
Nodes (9): PropertyDetailView(), PropertyDetailViewProps, getStaticPaths(), getStaticProps(), metaDescription(), PropertyDetailPage(), getBestValueProperties(), getPropertyDetailBySlug() (+1 more)

### Community 49 - "PrivacyPolicyPage.tsx"
Cohesion: 0.43
Nodes (5): PrivacyPolicyPage, usePrivacyPageQuery(), sanitizeHtml(), PrivacyPolicyPage(), getPrivacyPage()

### Community 50 - "PropertyType"
Cohesion: 0.33
Nodes (8): PropertyTypeCardProps, PropertyTypeItem, ListingFiltersContext, ListingFiltersContextValue, Snapshot, PropertySubmissionData, PropertyStatus, PropertyType

### Community 53 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, build, build:vite, dev, dev:vite, lint, optimize:bg, optimize:hero (+6 more)

### Community 54 - "AboutUsPage.tsx"
Cohesion: 0.24
Nodes (8): AboutUsPage, AtmosphereImage, ApartmentIllustration(), useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages(), VALUE_ICONS

### Community 57 - "optimize-bg.mjs"
Cohesion: 0.32
Nodes (7): backupDir, backupOnce(), bgDir, convertRasterToWebp(), __dirname, entries, resizeWebpInPlace()

### Community 60 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 61 - "dev-guard.mjs"
Cohesion: 0.53
Nodes (5): findRunningDevServers(), projectRoot, readProc(), running, selfChain()

### Community 62 - "SiteFooter.tsx"
Cohesion: 0.23
Nodes (11): buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList(), FooterNavLink(), InstagramIcon(), LEGAL_LINKS (+3 more)

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
Cohesion: 0.35
Nodes (9): useAgentQuery(), usePropertyQuery(), mergeAgentsWithFallback(), mergeAgentWithFallback(), AgentProfilePage(), getAgentBySlug(), getAgents(), getFeaturedAgents() (+1 more)

### Community 73 - "LocationSection.tsx"
Cohesion: 0.36
Nodes (6): LocationCardProps, LocationCardVariant, LocationSectionProps, SQUARE_LOCATIONS, WIDE_LOCATIONS, Location

### Community 78 - "FormSelect.tsx"
Cohesion: 0.50
Nodes (4): FormSelect(), FormSelectOption, FormSelectProps, normalizeOptions()

### Community 80 - "PropertyVillaEditorialSection.tsx"
Cohesion: 0.25
Nodes (5): InteriorCopy(), OverviewCopy(), PropertyVillaEditorialSection(), PropertyVillaEditorialSectionProps, PropertyVillaUtilityAction

### Community 84 - "isMockDataEnabled"
Cohesion: 0.23
Nodes (18): EmailForm, useLiveEmailAvailability(), isMockDataEnabled(), checkEmailAvailable(), clearCompare(), getCompareIds(), getCompareProperties(), normalizeIds() (+10 more)

### Community 87 - "useSiteConfig"
Cohesion: 0.20
Nodes (13): AgentsListingPage, BlogPage, NewsPage, SiteBrandingEffect(), useAgentsListQuery(), useArticlesQuery(), useSiteConfig(), useAppSearchParams() (+5 more)

### Community 90 - "ExpertiseSection.tsx"
Cohesion: 0.29
Nodes (5): VillaIllustration(), ExpertiseItem, ExpertiseServiceCard(), KEY_DIFFERENTIATORS, SERVICE_META

### Community 91 - "property-details.ts"
Cohesion: 0.29
Nodes (9): DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery(), seedFromId(), mediaPreviewUrl(), previewRequestWidth() (+1 more)

## Knowledge Gaps
- **353 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+348 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `AppShell.tsx`, `skeletons/index.ts`, `MyListingsPage.tsx`, `SiteHeader.tsx`, `PropertyGalleryGrid.tsx`, `InquiryDialog.tsx`, `LocationPicker.tsx`, `ArticleDetailView.tsx`, `PropertyCard.tsx`, `SubmitPropertyPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `useTheme`, `navigation.ts`, `PropertyDetail`, `types/index.ts`, `image-lightbox.tsx`, `HeroSection.tsx`, `AdvancedSearchSheet.tsx`, `api-client.ts`, `EditMyListingPage.tsx`, `SectionAtmosphere.tsx`, `ListingsView.tsx`, `utils.ts`, `WhatPeopleSaySection.tsx`, `PrivacyPolicyPage.tsx`, `AboutUsPage.tsx`, `SiteFooter.tsx`, `LocationSection.tsx`, `FormSelect.tsx`, `PageLoader.tsx`, `ExpertiseSection.tsx`, `badge.tsx`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `auth.service.ts`, `api-client.ts`, `EditMyListingPage.tsx`, `queries.ts`, `ListingsView.tsx`, `cms-merge.ts`, `InquiryDialog.tsx`, `src/pages/index.tsx`, `LocationPicker.tsx`, `MyListingsPage.tsx`, `src/pages/properties/[slug].tsx`, `SubmitPropertyPage.tsx`, `PrivacyPolicyPage.tsx`, `PropertyDetailPage.tsx`, `pages.service.ts`, `types/index.ts`, `src/pages/blog/[slug].tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `routes` connect `utils.ts` to `MyListingsPage.tsx`, `SiteHeader.tsx`, `src/pages/index.tsx`, `ArticleDetailView.tsx`, `useAuth`, `PropertyShowcaseView.tsx`, `PropertyCard.tsx`, `SubmitPropertyPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `useTheme`, `navigation.ts`, `PropertyDetail`, `types/index.ts`, `src/pages/blog/[slug].tsx`, `EditMyListingPage.tsx`, `ListingsView.tsx`, `src/pages/agents/[slug].tsx`, `src/pages/properties/[slug].tsx`, `AboutUsPage.tsx`, `SiteFooter.tsx`, `useSiteConfig`, `ExpertiseSection.tsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _353 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1028225806451613 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `AppShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._