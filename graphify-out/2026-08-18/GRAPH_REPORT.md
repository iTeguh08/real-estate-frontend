# Graph Report - real-estate-frontend  (2026-08-18)

## Corpus Check
- 302 files · ~162,202 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1626 nodes · 4964 edges · 94 communities (76 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4fbcb4fb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-url.ts
- dependencies
- properties.service.ts
- skeletons/index.ts
- Property
- withSsgFallback
- MyListingsPage.tsx
- image-lightbox.tsx
- SiteHeader.tsx
- LocationPicker.tsx
- SubmitPropertyPage.tsx
- types/index.ts
- cn
- compilerOptions
- App.tsx
- SiteFooter.tsx
- components.json
- absoluteUrl
- PropertyTypeGrid.tsx
- home.ts
- PropertyGalleryGrid.tsx
- pages.service.ts
- compilerOptions
- routes.d.ts
- property-details.ts
- routes.ts
- navigation.ts
- graphql-client.ts
- SectionAtmosphere.tsx
- FeaturedProperties.tsx
- PropertyDetailHero.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- src/pages/_app.tsx
- ListingsView.tsx
- EditMyListingPage.tsx
- HeroSection.tsx
- LocationSection.tsx
- isMockDataEnabled
- ContactUsPage.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- RequireAuth.tsx
- media-image.tsx
- PropertyShowcaseView.tsx
- Article
- originalImage
- next.config.mjs
- WhatPeopleSaySection.tsx
- AppShell.tsx
- globals
- scripts
- kill-dev.mjs
- next-env.d.ts
- @tailwindcss/postcss
- optimize-bg.mjs
- vite
- postcss.config.mjs
- package.json
- dev-guard.mjs
- useAdvancedSearch.tsx
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- queries.ts
- AboutUsPage.tsx
- jsdom
- ListingsPageSkeleton.tsx
- FormSelect.tsx
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- BestValuePropertyCard.tsx
- vitest
- useTheme.tsx
- badge.tsx
- @vitest/coverage-v8
- @types/node
- listing-filter-params.ts
- utils.ts
- eslint-plugin-react-hooks
- cms-merge.ts
- MeetOurAgentsSection.tsx
- AboutPageSkeleton.tsx
- @types/leaflet

## God Nodes (most connected - your core abstractions)
1. `cn()` - 210 edges
2. `isMockDataEnabled()` - 76 edges
3. `routes` - 61 edges
4. `Property` - 44 edges
5. `PropertyDetail` - 44 edges
6. `AppLink()` - 37 edges
7. `useAuth()` - 33 edges
8. `Article` - 33 edges
9. `absoluteUrl()` - 32 edges
10. `MediaImage()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `FooterLinkList()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/SiteFooter.tsx → src/lib/utils.ts
- `PropertyDetailHeroProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts
- `HeroContentPanelProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts
- `PropertyIntroductionProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyIntroduction.tsx → src/types/index.ts
- `OverviewCopy()` --calls--> `formatCount()`  [EXTRACTED]
  src/components/property/PropertyVillaEditorialSection.tsx → src/lib/format-property.ts

## Import Cycles
- None detected.

## Communities (94 total, 18 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.11
Nodes (22): coverDisplaySize(), coverRequestWidth(), GALLERY_LIGHTBOX_HEIGHT, GALLERY_LIGHTBOX_WIDTH, galleryLightboxUrl(), GRID_CARD_PREVIEW_WIDTH, HERO_PREVIEW_WIDTH, LIGHTBOX_COVER_MAX_EDGE (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "properties.service.ts"
Cohesion: 0.18
Nodes (20): mergePropertiesWithFallback(), listingFiltersQueryVars(), getStaticProps(), getServerSideProps(), queryToSearchParams(), getStaticPaths(), getStaticProps(), PropertyDetailPageProps (+12 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.09
Nodes (35): AgentCardSkeleton(), AgentCardSkeletonProps, AgentProfileSkeleton(), AgentsPageSkeleton(), ArticleCardSkeleton(), ArticleCardSkeletonProps, AuthFormSkeleton(), BestValueCardSkeleton() (+27 more)

### Community 4 - "Property"
Cohesion: 0.15
Nodes (27): AgentCardProps, BestValuePropertyCardProps, PropertyDetailDialogProps, PropertyRelatedSectionProps, BestPropertyValueSectionProps, HomepageContent, AgentProfilePageProps, HomePageProps (+19 more)

### Community 5 - "withSsgFallback"
Cohesion: 0.11
Nodes (21): __Check, __IsExpected, PagesPageConfig, __Unused, ARTICLE_PREVIEW_COUNT, ARTICLES, getStaticProps(), getStaticProps() (+13 more)

### Community 6 - "MyListingsPage.tsx"
Cohesion: 0.10
Nodes (25): useCancelPropertySubmissionMutation(), useSubmitPropertyMutation(), useMyListingsQuery(), useMyPropertySubmissionsQuery(), isAgentUser(), formatListingPrice(), formatPrice(), MyListingsPage() (+17 more)

### Community 7 - "image-lightbox.tsx"
Cohesion: 0.13
Nodes (17): Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle() (+9 more)

### Community 8 - "SiteHeader.tsx"
Cohesion: 0.18
Nodes (15): mobileNavLinkClasses(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader(), NavigationMenu(), NavigationMenuContent() (+7 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.13
Nodes (16): LocationValue, composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry(), LocationPicker() (+8 more)

### Community 10 - "SubmitPropertyPage.tsx"
Cohesion: 0.12
Nodes (23): PropertyTypeCardProps, PROPERTY_FORM, PropertyTypeItem, clearFieldError(), firstApiFieldError(), getApiFieldErrors(), SubmitPropertyPage, composeLocation() (+15 more)

### Community 11 - "types/index.ts"
Cohesion: 0.10
Nodes (25): PropertyContactStripProps, PropertyCtaSectionProps, PropertyFeaturesBlock(), PropertyFeaturesBlockProps, PropertyInquiryDialogsProps, PropertyOverviewCanvas(), PropertyOverviewCanvasProps, PropertyShowcaseSection() (+17 more)

### Community 12 - "cn"
Cohesion: 0.07
Nodes (34): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), HeroActionButtons(), ShowcaseThumbGrid(), PropertyMediaSlotField() (+26 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "App.tsx"
Cohesion: 0.06
Nodes (47): AgentProfilePage, AgentsListingPage, ArticleDetailPage, BlogPage, BootstrapLoaderComplete(), ComparePage, DashboardPage, EditMyListingPage (+39 more)

### Community 15 - "SiteFooter.tsx"
Cohesion: 0.16
Nodes (15): buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList(), FooterNavLink(), InstagramIcon(), LEGAL_LINKS (+7 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "absoluteUrl"
Cohesion: 0.23
Nodes (15): useHydrateQueryCache(), queryKeys, absoluteUrl(), AgentsView(), NewsView(), AboutRoute(), AgentsPage(), AgentProfilePage() (+7 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.13
Nodes (21): ApartmentIllustration(), CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration() (+13 more)

### Community 19 - "home.ts"
Cohesion: 0.16
Nodes (18): AGENTS, SITE_FOOTER_FALLBACK, SiteFooterContent, PAGES_NAV_GROUPS, PROPERTIES_NAV_GROUPS, PROPERTY_NAV_FILTER_MAP, SIMPLE_NAV_LINKS, BEST_VALUE_PROPERTIES (+10 more)

### Community 20 - "PropertyGalleryGrid.tsx"
Cohesion: 0.20
Nodes (11): chunkFullPages(), chunkPartialPages(), GalleryTile(), PropertyGalleryGrid(), PropertyGalleryGridProps, galleryPreviewUrl(), galleryTileMediaUrl(), PROPERTY_GALLERY_COUNT (+3 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.11
Nodes (26): ABOUT_PAGE_FALLBACK, AboutPageContent, CmsSeoMeta, CmsStat, CmsTimelineItem, CmsValue, CONTACT_PAGE_FALLBACK, ContactPageContent (+18 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "routes.d.ts"
Cohesion: 0.17
Nodes (11): AppRoutes, LayoutProps, LayoutRoutes, LayoutSlotMap, PageProps, PageRoutes, ParamMap, ParamsOf (+3 more)

### Community 24 - "property-details.ts"
Cohesion: 0.29
Nodes (9): DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery(), seedFromId(), mediaPreviewUrl(), previewRequestWidth() (+1 more)

### Community 25 - "routes.ts"
Cohesion: 0.17
Nodes (15): AgentCard(), CardVariants, PropertyCard(), PropertyCardProps, SpecPillProps, PropertyDetailDialog(), PropertyDetailDialog, PropertyDetailDialog (+7 more)

### Community 26 - "navigation.ts"
Cohesion: 0.17
Nodes (19): MobileNavGroup(), NavDropdownPanel(), AdvancedSearchSheet(), HOME_SCROLL_SECTIONS, HomeScrollSection, isNavItemActive(), NavLinkGroup, NavLinkItem (+11 more)

### Community 27 - "graphql-client.ts"
Cohesion: 0.46
Nodes (6): getGraphqlUrl(), errorText(), GraphqlError, graphqlFetch(), isNetworkFailure(), networkCauseCode()

### Community 28 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 29 - "FeaturedProperties.tsx"
Cohesion: 0.16
Nodes (16): ListingSortSelect(), ListingSortSelectProps, SearchIntentBanner(), SearchIntentBannerProps, FeaturedProperties(), FeaturedPropertiesProps, PropertyDetailDialog, ListingFiltersContext (+8 more)

### Community 30 - "PropertyDetailHero.tsx"
Cohesion: 0.14
Nodes (16): HeroActionButtonsProps, HeroContentPanel(), HeroContentPanelProps, PropertyDetailHero(), PropertyDetailHeroProps, ShowcaseThumb, ShowcaseThumbGridProps, PropertyVillaHero() (+8 more)

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.14
Nodes (15): BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS, Sheet() (+7 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "src/pages/_app.tsx"
Cohesion: 0.15
Nodes (21): App(), AuthProvider(), AuthContext, AuthContextValue, preloadCriticalFonts(), queryClientOptions, queryClient, App() (+13 more)

### Community 34 - "ListingsView.tsx"
Cohesion: 0.15
Nodes (19): BestPropertyValueSection(), useBestValuePropertiesQuery(), useFeaturedPropertiesQuery(), usePropertySearchQuery(), useAdvancedSearch(), useQuerySkeletonState(), BED_OPTIONS, clampListingPrice() (+11 more)

### Community 35 - "EditMyListingPage.tsx"
Cohesion: 0.10
Nodes (44): COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, CustomLayout, LAYOUT1_MEDIA_SLOTS, LAYOUT2_MEDIA_SLOTS, MediaSlotField, MediaSlotMeta, useClearMyListingGalleryMutation() (+36 more)

### Community 36 - "HeroSection.tsx"
Cohesion: 0.21
Nodes (9): FALLBACK_HERO_IMAGE, HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG, TABS, TYPE_OPTIONS, PROPERTY_TYPES, withCoverBox() (+1 more)

### Community 37 - "LocationSection.tsx"
Cohesion: 0.22
Nodes (12): buildLocationRows(), buildLocationSlides(), LocationCardProps, LocationCardVariant, LocationSection(), LocationSectionProps, WhatPeopleSaySection(), SQUARE_LOCATIONS (+4 more)

### Community 38 - "isMockDataEnabled"
Cohesion: 0.12
Nodes (32): EmailForm, useLiveEmailAvailability(), isMockDataEnabled(), apiFetch(), getApiBaseUrl(), LaravelErrorBody, normalizeFieldErrors(), checkEmailAvailable() (+24 more)

### Community 39 - "ContactUsPage.tsx"
Cohesion: 0.09
Nodes (46): ContactUsPage, AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps, AuthSubmitButton(), FormField(), FormFieldProps (+38 more)

### Community 40 - "cva.ts"
Cohesion: 0.12
Nodes (15): filterTab, FilterTabVariants, luxuryButton, LuxuryButtonVariants, navLink, NavLinkVariants, newBadge, NewBadgeVariants (+7 more)

### Community 41 - "Homzen Real Estate — Frontend"
Cohesion: 0.22
Nodes (8): Auth-protected routes, Deploy, Design system, Homzen Real Estate — Frontend, Important env, Local development, Scripts, Stack

### Community 42 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, @eslint/js, eslint-plugin-react-refresh, devDependencies, eslint, @eslint/js, eslint-plugin-react-refresh, sharp (+7 more)

### Community 43 - "RequireAuth.tsx"
Cohesion: 0.24
Nodes (5): defaultAuthFallback(), RequireAuth(), DashboardPage, DashboardRoute(), SubmitPropertyRoute()

### Community 44 - "media-image.tsx"
Cohesion: 0.22
Nodes (14): ArticleCard(), PropertyOverviewBackground(), PropertyOverviewBackgroundProps, MediaImage(), MediaImageProps, resolveMinSkeletonMs(), ARTICLE_CATEGORY_LABELS, getArticleCategoryLabel() (+6 more)

### Community 45 - "PropertyShowcaseView.tsx"
Cohesion: 0.10
Nodes (35): PropertyContactStrip(), PropertyCtaSection(), PropertyInquiryDialogs(), PropertyRelatedSection(), PropertyInquiryDialogs, PropertyShowcaseClassicView(), PropertyShowcaseView(), PropertyShowcaseVillaView (+27 more)

### Community 46 - "Article"
Cohesion: 0.17
Nodes (12): ArticleCardProps, HelpfulGuidesSectionProps, BlogArticlePageProps, NewsArticlePageProps, ArticleDetailViewProps, BlogViewProps, NewsViewProps, BlogPageProps (+4 more)

### Community 47 - "originalImage"
Cohesion: 0.26
Nodes (12): withCoverOriginal(), galleryOriginalUrl(), isApiImagesUrl(), isUnsplashHost(), mediaOriginalUrl(), originalImage(), productVariantUrl(), propertyOriginalUrl() (+4 more)

### Community 49 - "WhatPeopleSaySection.tsx"
Cohesion: 0.46
Nodes (5): TestimonialCard(), TestimonialCardProps, WhatPeopleSaySectionProps, TESTIMONIALS, Testimonial

### Community 50 - "AppShell.tsx"
Cohesion: 0.17
Nodes (15): CompareBar(), AppShell(), scrollToElement(), ScrollToHash(), SiteHeaderProvider(), SiteHeaderSpacer(), SiteHeaderContext, SiteHeaderContextValue (+7 more)

### Community 53 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, build, build:vite, dev, dev:fresh, dev:vite, lint, optimize:bg (+7 more)

### Community 54 - "kill-dev.mjs"
Cohesion: 0.50
Nodes (4): findRunningDevServers(), pids, projectRoot, readProc()

### Community 57 - "optimize-bg.mjs"
Cohesion: 0.32
Nodes (7): backupDir, backupOnce(), bgDir, convertRasterToWebp(), __dirname, entries, resizeWebpInPlace()

### Community 60 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 61 - "dev-guard.mjs"
Cohesion: 0.53
Nodes (5): findRunningDevServers(), projectRoot, readProc(), running, selfChain()

### Community 62 - "useAdvancedSearch.tsx"
Cohesion: 0.53
Nodes (3): AdvancedSearchProvider(), AdvancedSearchContext, AdvancedSearchContextValue

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
Cohesion: 0.30
Nodes (10): useAgentQuery(), useArticleQuery(), usePropertyQuery(), mergeAgentsWithFallback(), mergeAgentWithFallback(), ArticleDetailPage(), getAgentBySlug(), getAgents() (+2 more)

### Community 69 - "AboutUsPage.tsx"
Cohesion: 0.24
Nodes (8): AboutUsPage, AtmosphereImage, CmsService, useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages(), VALUE_ICONS

### Community 72 - "ListingsPageSkeleton.tsx"
Cohesion: 0.13
Nodes (10): BestValueCardSkeletonProps, SkeletonBadge(), ListingsGridSkeleton(), ListingsGridSkeletonProps, ListingsPageSkeleton(), ListingsPageSkeletonProps, PropertyCardSkeleton(), PropertyCardSkeletonProps (+2 more)

### Community 73 - "FormSelect.tsx"
Cohesion: 0.50
Nodes (4): FormSelect(), FormSelectOption, FormSelectProps, normalizeOptions()

### Community 78 - "BestValuePropertyCard.tsx"
Cohesion: 0.12
Nodes (26): BestValuePropertyCard(), PropertyDetailBody(), PropertyIntroduction(), PropertyIntroductionProps, LocationCard(), ImageActionButton(), ImageActionButtonProps, useToggleCompareMutation() (+18 more)

### Community 80 - "useTheme.tsx"
Cohesion: 0.29
Nodes (11): ThemeProvider(), ThemeContext, ThemeContextValue, applyTheme(), getServerTheme(), isTheme(), readStoredTheme(), subscribeToTheme() (+3 more)

### Community 89 - "listing-filter-params.ts"
Cohesion: 0.09
Nodes (32): isHomePath(), isListingsPath(), ListingFiltersProvider(), parseAppLocation(), filtersEqual(), filtersToSearchParams(), hasFilterParams(), isPropertySort() (+24 more)

### Community 91 - "utils.ts"
Cohesion: 0.21
Nodes (8): SearchableSelect(), SearchableSelectOption, SearchableSelectProps, LoaderOrbit(), LoadingOverlayProps, RouteLoadingSpinner(), PageLoader(), PageLoaderProps

### Community 95 - "cms-merge.ts"
Cohesion: 0.29
Nodes (14): ALL_PROPERTIES, coalesce(), coalesceMediaObject(), findFallbackProperty(), hasGalleryImages(), isBlank(), mergeArticlesWithFallback(), mergeArticleWithFallback() (+6 more)

### Community 96 - "MeetOurAgentsSection.tsx"
Cohesion: 0.29
Nodes (8): buildAgentSlides(), MeetOurAgentsSection(), MeetOurAgentsSectionProps, useAgentsPerSlide(), CarouselControls(), CarouselControlsProps, TONE_STYLES, useAgentsQuery()

### Community 101 - "AboutPageSkeleton.tsx"
Cohesion: 0.20
Nodes (6): AboutPageSkeleton(), SectionEyebrowTitle(), TimelineItemSkeleton(), CmsPageSkeleton(), CmsPageSkeletonProps, CmsPageSkeletonVariant

## Knowledge Gaps
- **372 isolated node(s):** `AppRoutes`, `PageRoutes`, `LayoutRoutes`, `RedirectRoutes`, `RewriteRoutes` (+367 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `skeletons/index.ts`, `MyListingsPage.tsx`, `image-lightbox.tsx`, `SiteHeader.tsx`, `LocationPicker.tsx`, `SubmitPropertyPage.tsx`, `App.tsx`, `SiteFooter.tsx`, `PropertyTypeGrid.tsx`, `PropertyGalleryGrid.tsx`, `routes.ts`, `navigation.ts`, `SectionAtmosphere.tsx`, `FeaturedProperties.tsx`, `PropertyDetailHero.tsx`, `AdvancedSearchSheet.tsx`, `src/pages/_app.tsx`, `ListingsView.tsx`, `EditMyListingPage.tsx`, `HeroSection.tsx`, `LocationSection.tsx`, `ContactUsPage.tsx`, `media-image.tsx`, `PropertyShowcaseView.tsx`, `WhatPeopleSaySection.tsx`, `AppShell.tsx`, `AboutUsPage.tsx`, `ListingsPageSkeleton.tsx`, `FormSelect.tsx`, `BestValuePropertyCard.tsx`, `badge.tsx`, `utils.ts`, `MeetOurAgentsSection.tsx`, `AboutPageSkeleton.tsx`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `src/pages/_app.tsx`, `properties.service.ts`, `EditMyListingPage.tsx`, `queries.ts`, `withSsgFallback`, `MyListingsPage.tsx`, `ContactUsPage.tsx`, `LocationPicker.tsx`, `App.tsx`, `home.ts`, `pages.service.ts`, `listing-filter-params.ts`, `graphql-client.ts`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `PropertyDetail` connect `types/index.ts` to `properties.service.ts`, `queries.ts`, `Property`, `PropertyShowcaseView.tsx`, `BestValuePropertyCard.tsx`, `property-details.ts`, `PropertyDetailHero.tsx`, `cms-merge.ts`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `AppRoutes`, `PageRoutes`, `LayoutRoutes` to the rest of the system?**
  _372 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10666666666666667 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `skeletons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09022556390977443 - nodes in this community are weakly interconnected._