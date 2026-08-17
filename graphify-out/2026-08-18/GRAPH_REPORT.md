# Graph Report - real-estate-frontend  (2026-08-18)

## Corpus Check
- 245 files · ~150,622 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1442 nodes · 4315 edges · 99 communities (79 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec45fb4c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-url.ts
- dependencies
- useSiteHeader.tsx
- skeletons/index.ts
- MyListingsPage.tsx
- SiteHeader.tsx
- useTheme
- utils.ts
- HomeView.tsx
- LocationPicker.tsx
- MeetOurAgentsSection.tsx
- PropertyVillaCtaBanner.tsx
- cn
- compilerOptions
- LoginPage.tsx
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
- useListingFilters.tsx
- src/pages/index.tsx
- src/pages/blog/[slug].tsx
- HeroSection.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- useAuth.tsx
- api-client.ts
- agent-listings.service.ts
- SectionAtmosphere.tsx
- ListingsView.tsx
- properties.service.ts
- app-link.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- queries.ts
- useAppLocation
- WhatPeopleSaySection.tsx
- LocationSection.tsx
- Property
- next.config.mjs
- form-schemas.ts
- PropertyType
- src/pages/_document.tsx
- globals
- scripts
- AboutUsPage.tsx
- next-env.d.ts
- @tailwindcss/postcss
- optimize-bg.mjs
- vite
- postcss.config.mjs
- package.json
- src/pages/listings/index.tsx
- runtime-env.ts
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- routes.ts
- eslint-plugin-react-refresh
- jsdom
- @types/leaflet
- @types/node
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- PropertyDetailHero.tsx
- vitest
- PropertyVillaEditorialSection.tsx
- isMockDataEnabled
- @vitest/coverage-v8
- PropertyGalleryGrid.tsx
- useSiteConfig
- AppShell.tsx
- EditMyListingPage.tsx
- ExpertiseSection.tsx
- property-details.ts
- eslint-plugin-react-hooks
- app-router.ts
- form-errors.ts
- tabs.tsx
- DashboardPage.tsx
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
- `FooterLinkList()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/SiteFooter.tsx → src/lib/utils.ts
- `PropertyDetailHeroProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts
- `HeroContentPanelProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts
- `HeroActionButtons()` --calls--> `cn()`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (99 total, 20 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.10
Nodes (30): withCoverOriginal(), coverDisplaySize(), coverRequestWidth(), galleryLightboxUrl(), galleryOriginalUrl(), GRID_CARD_PREVIEW_WIDTH, HERO_PREVIEW_WIDTH, isApiImagesUrl() (+22 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "useSiteHeader.tsx"
Cohesion: 0.23
Nodes (10): scrollToElement(), ScrollToHash(), useListingsAsideStickyTop(), DEFAULT_HEADER_HEIGHT, HEADER_SCROLL_BUFFER, SiteHeaderContext, SiteHeaderContextValue, SiteHeaderProvider() (+2 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.06
Nodes (41): ArticleDetailPage, PrivacyPolicyPage, ArticleCard(), PropertyMediaSlotField(), PropertyMediaSlotFieldProps, AgentCardSkeleton(), AgentProfileSkeleton(), ArticleCardSkeleton() (+33 more)

### Community 4 - "MyListingsPage.tsx"
Cohesion: 0.11
Nodes (26): MyListingsPage, useCancelPropertySubmissionMutation(), useDeleteMyListingMutation(), useSubmitPropertyMutation(), useMyListingsQuery(), useMyPropertySubmissionsQuery(), formatListingPrice(), formatPrice() (+18 more)

### Community 5 - "SiteHeader.tsx"
Cohesion: 0.18
Nodes (16): mobileNavLinkClasses(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader(), ThemeToggleButton(), NavigationMenu() (+8 more)

### Community 6 - "useTheme"
Cohesion: 0.20
Nodes (12): ThemedToaster(), PropertyTypeGrid(), applyTheme(), isTheme(), readStoredTheme(), Theme, THEME_STORAGE_KEY, ThemeContext (+4 more)

### Community 7 - "utils.ts"
Cohesion: 0.11
Nodes (23): PropertyDetailDialog(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+15 more)

### Community 8 - "HomeView.tsx"
Cohesion: 0.29
Nodes (12): BestValuePropertyCardProps, BestPropertyValueSection(), BestPropertyValueSectionProps, HomepageContent, useBestValuePropertiesQuery(), HomeViewProps, ListingsViewProps, HomePageProps (+4 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.13
Nodes (16): composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry(), LocationPicker(), SearchableSelect() (+8 more)

### Community 10 - "MeetOurAgentsSection.tsx"
Cohesion: 0.43
Nodes (6): buildAgentSlides(), MeetOurAgentsSection(), MeetOurAgentsSectionProps, useAgentsPerSlide(), useAgentsQuery(), useDotCarousel()

### Community 11 - "PropertyVillaCtaBanner.tsx"
Cohesion: 0.23
Nodes (13): PropertyContactStrip(), PropertyCtaSection(), PropertyInquiryDialogs(), PropertyVillaCtaBanner(), PropertyVillaHighlights(), Button(), buttonVariants, agentFirstName() (+5 more)

### Community 12 - "cn"
Cohesion: 0.11
Nodes (23): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), Card(), CardAction(), CardContent() (+15 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "LoginPage.tsx"
Cohesion: 0.17
Nodes (17): AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps, AuthSubmitButton(), FormField(), FormFieldProps, MockSubmitNotice() (+9 more)

### Community 15 - "PropertyCard.tsx"
Cohesion: 0.15
Nodes (27): BestValuePropertyCard(), PropertyCard(), SpecPillProps, PropertyDetailBody(), HeroContentPanel(), PropertyDetailHero(), PropertyVillaHero(), VillaHeroContentPanel() (+19 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "ContactUsPage.tsx"
Cohesion: 0.15
Nodes (22): HoneypotInput(), loadTurnstileScript(), TurnstileWidget(), TurnstileWidgetProps, useSecurityConfig(), Window, ContextIcon, InquiryContextBlock (+14 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.24
Nodes (13): ApartmentIllustration(), CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration() (+5 more)

### Community 19 - "App.tsx"
Cohesion: 0.13
Nodes (17): BlogPage, BootstrapLoaderComplete(), ComparePage, ContactUsPage, LoginPage, NotFoundPage, PropertyListingsPage, RegisterPage (+9 more)

### Community 20 - "PropertyShowcaseView.tsx"
Cohesion: 0.14
Nodes (20): PropertyDetailPage, PropertyShowcasePage, PropertyRelatedSection(), PropertyShowcaseClassicView(), PropertyShowcaseNotFound(), PropertyShowcaseView(), PropertyShowcaseVillaView, PropertyShowcaseVillaView() (+12 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.14
Nodes (24): ABOUT_PAGE_FALLBACK, AboutPageContent, CmsSeoMeta, CmsStat, CmsTimelineItem, CONTACT_PAGE_FALLBACK, ContactPageContent, HOMEPAGE_FALLBACK (+16 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "SubmitPropertyPage.tsx"
Cohesion: 0.14
Nodes (17): SubmitPropertyPage, LocationValue, LocationPickerProps, LocationPickerDynamic, composeLocation(), EMPTY_LOCATION, FileDropzone(), formatPreviewPrice() (+9 more)

### Community 24 - "navigation.ts"
Cohesion: 0.13
Nodes (23): MobileNavGroup(), NavDropdownPanel(), AdvancedSearchSheet(), HOME_SCROLL_SECTIONS, HomeScrollSection, isNavItemActive(), NavLinkGroup, NavLinkItem (+15 more)

### Community 25 - "PropertyDetail"
Cohesion: 0.12
Nodes (20): PropertyContactStripProps, PropertyCtaSectionProps, PropertyFeaturesBlock(), PropertyFeaturesBlockProps, PropertyInquiryDialogsProps, PropertyIntroduction(), PropertyIntroductionProps, getPropertyOverviewBackgroundImage() (+12 more)

### Community 26 - "types/index.ts"
Cohesion: 0.16
Nodes (19): ListingSortSelect(), ListingSortSelectProps, SearchIntentBanner(), SearchIntentBannerProps, FeaturedProperties(), describeSearchIntent(), hasSearchIntent(), SORT_OPTIONS (+11 more)

### Community 27 - "useListingFilters.tsx"
Cohesion: 0.25
Nodes (14): isHomePath(), isListingsPath(), ListingFiltersContext, ListingFiltersProvider(), filtersEqual(), filtersToSearchParams(), hasFilterParams(), isPropertySort() (+6 more)

### Community 28 - "src/pages/index.tsx"
Cohesion: 0.15
Nodes (20): HelpfulGuidesSectionProps, SITE_FOOTER_FALLBACK, SiteFooterContent, BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES, countByType(), PROPERTY_TYPE_ITEMS, PROPERTY_TYPES (+12 more)

### Community 29 - "src/pages/blog/[slug].tsx"
Cohesion: 0.16
Nodes (21): ArticleCardProps, ARTICLE_PREVIEW_COUNT, ARTICLES, mergeArticlesWithFallback(), mergeArticleWithFallback(), jsonSafe(), withSsgFallback(), ArticleDetailViewProps (+13 more)

### Community 30 - "HeroSection.tsx"
Cohesion: 0.24
Nodes (8): FALLBACK_HERO_IMAGE, HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG, TABS, TYPE_OPTIONS, withCoverBox(), preloadImage()

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.14
Nodes (15): BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS, Sheet() (+7 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "useAuth.tsx"
Cohesion: 0.28
Nodes (15): AuthContext, AuthContextValue, AuthProvider(), fetchCurrentUser(), loginMember(), logoutMember(), registerMember(), UserResponse (+7 more)

### Community 34 - "api-client.ts"
Cohesion: 0.18
Nodes (15): apiFetch(), FieldErrors, getApiBaseUrl(), LaravelErrorBody, normalizeFieldErrors(), ContactFormData, ContactResponse, submitContactForm() (+7 more)

### Community 35 - "agent-listings.service.ts"
Cohesion: 0.12
Nodes (24): CustomLayout, useClearMyListingMediaMutation(), usePublishMyListingMutation(), useUpdateMyListingMutation(), useMyListingQuery(), AgentGallerySlot, AgentListing, AgentListingUpdateInput (+16 more)

### Community 36 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 37 - "ListingsView.tsx"
Cohesion: 0.23
Nodes (13): useFeaturedPropertiesQuery(), useAdvancedSearch(), BED_OPTIONS, clampListingPrice(), formatListingPrice(), getListingsResetFilters(), hasListingsMobileFiltersActive(), hasSidebarFiltersActive() (+5 more)

### Community 38 - "properties.service.ts"
Cohesion: 0.24
Nodes (18): ALL_PROPERTIES, coalesce(), coalesceMediaObject(), findFallbackProperty(), hasGalleryImages(), isBlank(), mergeListingAgent(), mergePropertiesWithFallback() (+10 more)

### Community 39 - "app-link.tsx"
Cohesion: 0.15
Nodes (16): AgentCard(), AgentCardProps, buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList(), InstagramIcon() (+8 more)

### Community 40 - "cva.ts"
Cohesion: 0.12
Nodes (15): filterTab, FilterTabVariants, luxuryButton, LuxuryButtonVariants, navLink, NavLinkVariants, newBadge, NewBadgeVariants (+7 more)

### Community 41 - "Homzen Real Estate — Frontend"
Cohesion: 0.22
Nodes (8): Auth-protected routes, Deploy, Design system, Homzen Real Estate — Frontend, Important env, Local development, Scripts, Stack

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, @eslint/js, devDependencies, eslint, @eslint/js, sharp, tailwindcss, @tailwindcss/vite (+5 more)

### Community 43 - "queries.ts"
Cohesion: 0.13
Nodes (26): AgentProfilePage, AGENTS, useAgentQuery(), usePropertyQuery(), usePropertySearchQuery(), usePropertyTypeCountsQuery(), mergeAgentsWithFallback(), mergeAgentWithFallback() (+18 more)

### Community 44 - "useAppLocation"
Cohesion: 0.27
Nodes (7): RequireAuth(), PageLoader(), useAppLocation(), DashboardPage, DashboardRoute(), SubmitPropertyPage, SubmitPropertyRoute()

### Community 45 - "WhatPeopleSaySection.tsx"
Cohesion: 0.27
Nodes (8): TestimonialCard(), TestimonialCardProps, WhatPeopleSaySectionProps, CarouselControls(), CarouselControlsProps, TONE_STYLES, TESTIMONIALS, Testimonial

### Community 46 - "LocationSection.tsx"
Cohesion: 0.27
Nodes (9): buildLocationRows(), buildLocationSlides(), LocationCardProps, LocationCardVariant, LocationSection(), LocationSectionProps, SQUARE_LOCATIONS, WIDE_LOCATIONS (+1 more)

### Community 47 - "Property"
Cohesion: 0.19
Nodes (13): CardVariants, PropertyCardProps, PropertyDetailDialogProps, PropertyRelatedSectionProps, FeaturedPropertiesProps, PropertyDetailView(), PropertyDetailViewProps, getStaticProps() (+5 more)

### Community 49 - "form-schemas.ts"
Cohesion: 0.23
Nodes (10): contactSchema, InquiryFormValues, inquirySchema, LoginFormValues, loginSchema, NewsletterFormValues, newsletterSchema, passwordRule (+2 more)

### Community 50 - "PropertyType"
Cohesion: 0.32
Nodes (7): PropertyTypeCardProps, PROPERTY_FORM, PropertyTypeItem, ListingFiltersContextValue, PropertySubmissionData, PropertyStatus, PropertyType

### Community 53 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:vite, dev, dev:vite, lint, optimize:bg, optimize:hero (+5 more)

### Community 54 - "AboutUsPage.tsx"
Cohesion: 0.22
Nodes (9): AboutUsPage, AtmosphereImage, CmsService, CmsValue, useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages() (+1 more)

### Community 57 - "optimize-bg.mjs"
Cohesion: 0.32
Nodes (7): backupDir, backupOnce(), bgDir, convertRasterToWebp(), __dirname, entries, resizeWebpInPlace()

### Community 60 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 61 - "src/pages/listings/index.tsx"
Cohesion: 0.42
Nodes (7): normalizeListingsFilters(), buildListingsSeo(), statusLabelId(), absoluteUrl(), getServerSideProps(), ListingsPage(), queryToSearchParams()

### Community 62 - "runtime-env.ts"
Cohesion: 0.23
Nodes (13): App(), preloadCriticalFonts(), queryClient, queryClientOptions, getApiBaseUrl(), getRuntimeMode(), getSentryDsn(), getSentryEnvironment() (+5 more)

### Community 63 - "vite-env.d.ts"
Cohesion: 0.40
Nodes (4): *.css, ImportMeta, ImportMetaEnv, *.png

### Community 64 - "compilerOptions"
Cohesion: 0.06
Nodes (32): dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, pages/**/*.ts, pages/**/*.tsx, src/pages/_app.tsx (+24 more)

### Community 65 - "optimize-hero.mjs"
Cohesion: 0.50
Nodes (3): __dirname, outWebp, srcPng

### Community 68 - "routes.ts"
Cohesion: 0.16
Nodes (12): useToggleCompareMutation(), useToggleWishlistMutation(), queryKeys, AppRoute, routes, ROWS, LoginPage, LoginRoute() (+4 more)

### Community 78 - "PropertyDetailHero.tsx"
Cohesion: 0.20
Nodes (9): HeroActionButtons(), HeroActionButtonsProps, HeroContentPanelProps, PropertyDetailHeroProps, ShowcaseThumb, ShowcaseThumbGrid(), ShowcaseThumbGridProps, VILLA_SECTION_GUTTERS (+1 more)

### Community 80 - "PropertyVillaEditorialSection.tsx"
Cohesion: 0.25
Nodes (5): InteriorCopy(), OverviewCopy(), PropertyVillaEditorialSection(), PropertyVillaEditorialSectionProps, PropertyVillaUtilityAction

### Community 84 - "isMockDataEnabled"
Cohesion: 0.26
Nodes (17): isMockDataEnabled(), clearCompare(), getCompareIds(), getCompareProperties(), normalizeIds(), readLocalCompare(), toggleCompareItem(), writeLocalCompare() (+9 more)

### Community 86 - "PropertyGalleryGrid.tsx"
Cohesion: 0.20
Nodes (11): chunkFullPages(), chunkPartialPages(), GalleryTile(), PropertyGalleryGrid(), PropertyGalleryGridProps, galleryPreviewUrl(), galleryTileMediaUrl(), PROPERTY_GALLERY_COUNT (+3 more)

### Community 87 - "useSiteConfig"
Cohesion: 0.23
Nodes (10): AgentsListingPage, NewsPage, SiteBrandingEffect(), HelpfulGuidesSection(), useAgentsListQuery(), useArticlesQuery(), useSiteConfig(), AgentsView() (+2 more)

### Community 88 - "AppShell.tsx"
Cohesion: 0.27
Nodes (9): CompareBar(), AppShell(), AdvancedSearchContext, AdvancedSearchContextValue, AdvancedSearchProvider(), hasBlockingOverlay(), HIDDEN_EXACT, isHiddenPath() (+1 more)

### Community 89 - "EditMyListingPage.tsx"
Cohesion: 0.11
Nodes (24): EditMyListingPage, FormSelect(), FormSelectOption, FormSelectProps, normalizeOptions(), COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, LAYOUT1_MEDIA_SLOTS (+16 more)

### Community 90 - "ExpertiseSection.tsx"
Cohesion: 0.22
Nodes (8): ExpertiseItem, ExpertiseSection(), ExpertiseServiceCard(), KEY_DIFFERENTIATORS, SERVICE_META, WhatPeopleSaySection(), listingsHref(), useHomepageQuery()

### Community 91 - "property-details.ts"
Cohesion: 0.29
Nodes (9): DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery(), seedFromId(), mediaPreviewUrl(), previewRequestWidth() (+1 more)

### Community 93 - "app-router.ts"
Cohesion: 0.50
Nodes (5): AppTo, parseAppLocation(), useAppSearchParams(), BlogView(), BlogPage()

### Community 94 - "form-errors.ts"
Cohesion: 0.52
Nodes (4): clearFieldError(), firstApiFieldError(), getApiFieldErrors(), ApiError

### Community 95 - "tabs.tsx"
Cohesion: 0.40
Nodes (5): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 96 - "DashboardPage.tsx"
Cohesion: 0.60
Nodes (3): DashboardPage, isAgentUser(), DashboardPage()

### Community 97 - "graphql-client.ts"
Cohesion: 0.50
Nodes (3): getGraphqlUrl(), GraphqlError, graphqlFetch()

## Knowledge Gaps
- **359 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+354 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `skeletons/index.ts`, `MyListingsPage.tsx`, `SiteHeader.tsx`, `useTheme`, `utils.ts`, `HomeView.tsx`, `LocationPicker.tsx`, `PropertyVillaCtaBanner.tsx`, `LoginPage.tsx`, `PropertyCard.tsx`, `ContactUsPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `PropertyShowcaseView.tsx`, `SubmitPropertyPage.tsx`, `navigation.ts`, `types/index.ts`, `HeroSection.tsx`, `AdvancedSearchSheet.tsx`, `SectionAtmosphere.tsx`, `ListingsView.tsx`, `app-link.tsx`, `queries.ts`, `useAppLocation`, `WhatPeopleSaySection.tsx`, `LocationSection.tsx`, `AboutUsPage.tsx`, `PropertyDetailHero.tsx`, `PropertyGalleryGrid.tsx`, `AppShell.tsx`, `EditMyListingPage.tsx`, `ExpertiseSection.tsx`, `tabs.tsx`, `badge.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `useAuth.tsx`, `api-client.ts`, `agent-listings.service.ts`, `graphql-client.ts`, `skeletons/index.ts`, `properties.service.ts`, `MyListingsPage.tsx`, `LocationPicker.tsx`, `queries.ts`, `LoginPage.tsx`, `Property`, `ContactUsPage.tsx`, `PropertyShowcaseView.tsx`, `pages.service.ts`, `EditMyListingPage.tsx`, `src/pages/index.tsx`, `src/pages/blog/[slug].tsx`, `runtime-env.ts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `routes` connect `routes.ts` to `skeletons/index.ts`, `MyListingsPage.tsx`, `SiteHeader.tsx`, `utils.ts`, `HomeView.tsx`, `MeetOurAgentsSection.tsx`, `PropertyVillaCtaBanner.tsx`, `LoginPage.tsx`, `PropertyCard.tsx`, `ContactUsPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `PropertyShowcaseView.tsx`, `SubmitPropertyPage.tsx`, `navigation.ts`, `types/index.ts`, `src/pages/index.tsx`, `src/pages/blog/[slug].tsx`, `ListingsView.tsx`, `app-link.tsx`, `queries.ts`, `useAppLocation`, `Property`, `AboutUsPage.tsx`, `src/pages/listings/index.tsx`, `PropertyDetailHero.tsx`, `useSiteConfig`, `AppShell.tsx`, `EditMyListingPage.tsx`, `ExpertiseSection.tsx`, `app-router.ts`, `DashboardPage.tsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _359 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1028225806451613 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `skeletons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06490384615384616 - nodes in this community are weakly interconnected._