# Graph Report - real-estate-frontend  (2026-08-19)

## Corpus Check
- 308 files · ~163,888 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1646 nodes · 5047 edges · 96 communities (79 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4fbcb4fb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-url.ts
- dependencies
- queries.ts
- skeletons/index.ts
- Property
- withSsgFallback
- src/pages/_app.tsx
- PropertyDetailDialog.tsx
- SiteHeader.tsx
- LocationPicker.tsx
- SubmitPropertyPage.tsx
- isMockDataEnabled
- cn
- compilerOptions
- App.tsx
- PropertyDetail
- components.json
- absoluteUrl
- PropertyTypeGrid.tsx
- home.ts
- Article
- pages.service.ts
- compilerOptions
- routes.d.ts
- useTheme.tsx
- originalImage
- navigation.ts
- useSiteConfig
- SectionAtmosphere.tsx
- MyListingsPage.tsx
- PropertyDetailHero.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- useAuth.tsx
- ListingsView.tsx
- EditMyListingPage.tsx
- ExpertiseSection.tsx
- WhatPeopleSaySection.tsx
- ComparePage.tsx
- ContactUsPage.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- PropertyVillaCtaBanner.tsx
- types/index.ts
- PropertyShowcaseView.tsx
- LocationSection.tsx
- eslint-plugin-react-refresh
- next.config.mjs
- media-image.tsx
- useAppLocation
- AppShell.tsx
- scripts
- kill-dev.mjs
- next-env.d.ts
- @tailwindcss/postcss
- optimize-bg.mjs
- vite
- postcss.config.mjs
- package.json
- dev-guard.mjs
- useWishlist.ts
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- useHydrateQueryCache
- AboutUsPage.tsx
- jsdom
- formatCount
- @types/node
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- BestValuePropertyCard.tsx
- vitest
- SiteFooter.tsx
- validator.ts
- @vitest/coverage-v8
- listings.ts
- HeroSection.tsx
- property-details.ts
- listing-filter-params.ts
- FormSelect.tsx
- utils.ts
- eslint-plugin-react-hooks
- cms-merge.ts
- AboutPageSkeleton.tsx
- @types/leaflet

## God Nodes (most connected - your core abstractions)
1. `cn()` - 210 edges
2. `isMockDataEnabled()` - 80 edges
3. `routes` - 64 edges
4. `Property` - 44 edges
5. `PropertyDetail` - 44 edges
6. `AppLink()` - 40 edges
7. `absoluteUrl()` - 36 edges
8. `useAuth()` - 33 edges
9. `Article` - 33 edges
10. `LoadingOverlay()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `ArticleCardProps` --references--> `Article`  [EXTRACTED]
  src/components/cards/ArticleCard.tsx → src/types/index.ts
- `BestValuePropertyCardProps` --references--> `PropertyWithAgent`  [EXTRACTED]
  src/components/cards/BestValuePropertyCard.tsx → src/types/index.ts
- `FooterLinkList()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/SiteFooter.tsx → src/lib/utils.ts
- `PropertyContactStripProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyContactStrip.tsx → src/types/index.ts
- `PropertyDetailHeroProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (96 total, 17 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.09
Nodes (26): PropertyDetailDialog(), coverDisplaySize(), coverRequestWidth(), GALLERY_LIGHTBOX_HEIGHT, GALLERY_LIGHTBOX_WIDTH, galleryLightboxUrl(), galleryPreviewUrl(), galleryTileMediaUrl() (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "queries.ts"
Cohesion: 0.15
Nodes (24): useAgentsQuery(), usePropertyQuery(), usePropertyTypeCountsQuery(), mergePropertiesWithFallback(), getStaticProps(), getStaticPaths(), getStaticProps(), PropertyDetailPageProps (+16 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.08
Nodes (41): AgentCardSkeleton(), AgentCardSkeletonProps, AgentProfileSkeleton(), AgentsPageSkeleton(), ArticleCardSkeleton(), ArticleCardSkeletonProps, AuthFormSkeleton(), BestValueCardSkeleton() (+33 more)

### Community 4 - "Property"
Cohesion: 0.21
Nodes (19): PropertyDetailDialogProps, PropertyRelatedSectionProps, BestPropertyValueSectionProps, FeaturedPropertiesProps, HomepageContent, HomePageProps, ListingsPageProps, HomeView() (+11 more)

### Community 5 - "withSsgFallback"
Cohesion: 0.36
Nodes (10): SITE_CONFIG, getStaticProps(), getStaticProps(), getStaticProps(), getStaticProps(), getStaticProps(), jsonSafe(), withSsgFallback() (+2 more)

### Community 6 - "src/pages/_app.tsx"
Cohesion: 0.22
Nodes (7): App(), ThemedToaster(), preloadCriticalFonts(), queryClientOptions, queryClient, App(), RouteProgressBar()

### Community 7 - "PropertyDetailDialog.tsx"
Cohesion: 0.08
Nodes (33): PropertyDetailBody(), ContextIcon, InquiryContextBlock, InquiryDialogProps, chunkFullPages(), chunkPartialPages(), GalleryTile(), PropertyGalleryGrid() (+25 more)

### Community 8 - "SiteHeader.tsx"
Cohesion: 0.30
Nodes (13): MobileNavGroup(), mobileNavLinkClasses(), NavDropdownPanel(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader() (+5 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.12
Nodes (17): LocationValue, composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry(), LocationPicker() (+9 more)

### Community 10 - "SubmitPropertyPage.tsx"
Cohesion: 0.10
Nodes (26): SubmitPropertyPage, HoneypotInput(), loadTurnstileScript(), TurnstileWidget(), TurnstileWidgetProps, Window, useSecurityConfig(), TURNSTILE_MISSING_MESSAGE (+18 more)

### Community 11 - "isMockDataEnabled"
Cohesion: 0.10
Nodes (32): useResubmitPropertySubmissionMutation(), useSubmitPropertyMutation(), EmailForm, useLiveEmailAvailability(), isMockDataEnabled(), apiFetch(), getApiBaseUrl(), LaravelErrorBody (+24 more)

### Community 12 - "cn"
Cohesion: 0.06
Nodes (42): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), PropertyMediaSlotField(), PropertyMediaSlotFieldProps, SkeletonBadge() (+34 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "App.tsx"
Cohesion: 0.09
Nodes (28): AgentProfilePage, ArticleDetailPage, BootstrapLoaderComplete(), EditMyListingPage, NotFoundPage, PrivacyPolicyPage, PropertyDetailPage, PropertyListingsPage (+20 more)

### Community 15 - "PropertyDetail"
Cohesion: 0.27
Nodes (9): PropertyCtaSectionProps, PropertyVillaCtaBannerProps, PropertyVillaHeroProps, PropertyDetailView(), PropertyDetailViewProps, metaDescription(), PropertyDetailPage(), PropertyDetailPageProps (+1 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "absoluteUrl"
Cohesion: 0.07
Nodes (35): DashboardPage, defaultAuthFallback(), RequireAuth(), DashboardSkeleton(), useAuth(), absoluteUrl(), getApiBaseUrl(), getGraphqlUrl() (+27 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.27
Nodes (12): ApartmentIllustration(), CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration() (+4 more)

### Community 19 - "home.ts"
Cohesion: 0.31
Nodes (7): BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES, PROPERTY_FORM, countByType(), PROPERTY_TYPE_ITEMS, PROPERTY_TYPES, PropertyTypeItem

### Community 20 - "Article"
Cohesion: 0.17
Nodes (15): HelpfulGuidesSectionProps, ARTICLES, mergeArticlesWithFallback(), mergeArticleWithFallback(), BlogArticlePageProps, getStaticPaths(), getStaticProps(), getStaticPaths() (+7 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.15
Nodes (21): ABOUT_PAGE_FALLBACK, CmsSeoMeta, CmsStat, CmsTimelineItem, CONTACT_PAGE_FALLBACK, HOMEPAGE_FALLBACK, HomepageExpertiseItem, PRIVACY_PAGE_FALLBACK (+13 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "routes.d.ts"
Cohesion: 0.17
Nodes (11): AppRoutes, LayoutProps, LayoutRoutes, LayoutSlotMap, PageProps, PageRoutes, ParamMap, ParamsOf (+3 more)

### Community 24 - "useTheme.tsx"
Cohesion: 0.29
Nodes (11): ThemeProvider(), ThemeContext, ThemeContextValue, applyTheme(), getServerTheme(), isTheme(), readStoredTheme(), subscribeToTheme() (+3 more)

### Community 25 - "originalImage"
Cohesion: 0.26
Nodes (12): withCoverOriginal(), galleryOriginalUrl(), isApiImagesUrl(), isUnsplashHost(), mediaOriginalUrl(), originalImage(), productVariantUrl(), propertyOriginalUrl() (+4 more)

### Community 26 - "navigation.ts"
Cohesion: 0.14
Nodes (20): ARTICLE_PREVIEW_COUNT, HOME_SCROLL_SECTIONS, HomeScrollSection, isNavItemActive(), NavLinkGroup, NavLinkItem, normalizePath(), PAGE_ROUTES (+12 more)

### Community 27 - "useSiteConfig"
Cohesion: 0.23
Nodes (10): AgentsListingPage, SiteBrandingEffect(), SITE_FOOTER_FALLBACK, SiteFooterContent, useAgentsListQuery(), useSiteConfig(), AgentsListingPage(), getSiteConfig() (+2 more)

### Community 28 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 29 - "MyListingsPage.tsx"
Cohesion: 0.18
Nodes (16): MyListingsPage, useCancelPropertySubmissionMutation(), useMyListingsQuery(), useMyPropertySubmissionsQuery(), isAgentUser(), formatListingPrice(), formatPrice(), MyListingsPage() (+8 more)

### Community 30 - "PropertyDetailHero.tsx"
Cohesion: 0.16
Nodes (18): HeroActionButtons(), HeroActionButtonsProps, HeroContentPanel(), HeroContentPanelProps, PropertyDetailHero(), PropertyDetailHeroProps, ShowcaseThumb, ShowcaseThumbGrid() (+10 more)

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.16
Nodes (14): BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS, Sheet() (+6 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "useAuth.tsx"
Cohesion: 0.26
Nodes (15): AuthProvider(), AuthContext, AuthContextValue, fetchCurrentUser(), loginMember(), logoutMember(), registerMember(), UserResponse (+7 more)

### Community 34 - "ListingsView.tsx"
Cohesion: 0.14
Nodes (24): BestValuePropertyCard(), BestPropertyValueSection(), FeaturedProperties(), useBestValuePropertiesQuery(), useFeaturedPropertiesQuery(), usePropertySearchQuery(), useAdvancedSearch(), useQuerySkeletonState() (+16 more)

### Community 35 - "EditMyListingPage.tsx"
Cohesion: 0.08
Nodes (48): COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, CustomLayout, LAYOUT1_MEDIA_SLOTS, LAYOUT2_MEDIA_SLOTS, MediaSlotField, MediaSlotMeta, useClearMyListingGalleryMutation() (+40 more)

### Community 36 - "ExpertiseSection.tsx"
Cohesion: 0.20
Nodes (10): ThemeToggleButton(), ExpertiseItem, ExpertiseSection(), ExpertiseServiceCard(), KEY_DIFFERENTIATORS, SERVICE_META, PropertyTypeGrid(), listingsHref() (+2 more)

### Community 37 - "WhatPeopleSaySection.tsx"
Cohesion: 0.33
Nodes (7): TestimonialCard(), TestimonialCardProps, WhatPeopleSaySection(), WhatPeopleSaySectionProps, TESTIMONIALS, useDotCarousel(), Testimonial

### Community 38 - "ComparePage.tsx"
Cohesion: 0.32
Nodes (11): ComparePage, ComparePage(), ROWS, clearCompare(), getCompareIds(), getCompareProperties(), MAX_COMPARE_ITEMS, normalizeIds() (+3 more)

### Community 39 - "ContactUsPage.tsx"
Cohesion: 0.10
Nodes (38): ContactUsPage, LoginPage, RegisterPage, AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps, AuthSubmitButton() (+30 more)

### Community 40 - "cva.ts"
Cohesion: 0.12
Nodes (15): filterTab, FilterTabVariants, luxuryButton, LuxuryButtonVariants, navLink, NavLinkVariants, newBadge, NewBadgeVariants (+7 more)

### Community 41 - "Homzen Real Estate — Frontend"
Cohesion: 0.22
Nodes (8): Auth-protected routes, Deploy, Design system, Homzen Real Estate — Frontend, Important env, Local development, Scripts, Stack

### Community 42 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, @eslint/js, globals, devDependencies, eslint, @eslint/js, globals, sharp (+7 more)

### Community 43 - "PropertyVillaCtaBanner.tsx"
Cohesion: 0.21
Nodes (14): PropertyContactStrip(), PropertyContactStripProps, PropertyCtaSection(), PropertyInquiryDialogs(), PropertyVillaCtaBanner(), PropertyVillaHighlights(), PropertyVillaHighlightsProps, Button() (+6 more)

### Community 44 - "types/index.ts"
Cohesion: 0.06
Nodes (63): BlogPage, NewsPage, AgentCard(), AgentCardProps, ArticleCard(), ArticleCardProps, CardVariants, PropertyCard() (+55 more)

### Community 45 - "PropertyShowcaseView.tsx"
Cohesion: 0.14
Nodes (19): PropertyFeaturesBlock(), PropertyInquiryDialogsProps, PropertyRelatedSection(), PropertyInquiryDialogs, PropertyShowcaseClassicView(), PropertyShowcaseView(), PropertyShowcaseViewProps, PropertyShowcaseVillaView (+11 more)

### Community 46 - "LocationSection.tsx"
Cohesion: 0.21
Nodes (12): buildLocationRows(), buildLocationSlides(), LocationCard(), LocationCardProps, LocationCardVariant, LocationSection(), LocationSectionProps, SQUARE_LOCATIONS (+4 more)

### Community 49 - "media-image.tsx"
Cohesion: 0.17
Nodes (11): PropertyFeaturesBlockProps, PropertyOverviewBackground(), PropertyOverviewBackgroundProps, PropertyOverviewCanvas(), PropertyOverviewCanvasProps, PropertyShowcaseSection(), PropertyShowcaseSectionProps, MediaImage() (+3 more)

### Community 50 - "useAppLocation"
Cohesion: 0.24
Nodes (11): scrollToElement(), ScrollToHash(), SiteHeaderProvider(), SiteHeaderSpacer(), SiteHeaderContext, SiteHeaderContextValue, useListingsAsideStickyTop(), useSiteHeader() (+3 more)

### Community 52 - "AppShell.tsx"
Cohesion: 0.23
Nodes (10): CompareBar(), AppShell(), AdvancedSearchProvider(), AdvancedSearchSheet(), AdvancedSearchContext, AdvancedSearchContextValue, hasBlockingOverlay(), HIDDEN_EXACT (+2 more)

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

### Community 62 - "useWishlist.ts"
Cohesion: 0.32
Nodes (11): WishlistPage, useToggleWishlistMutation(), useWishlist(), WishlistPage(), getPropertiesByIds(), getWishlistIds(), getWishlistProperties(), normalizeIds() (+3 more)

### Community 63 - "vite-env.d.ts"
Cohesion: 0.40
Nodes (4): *.css, ImportMeta, ImportMetaEnv, *.png

### Community 64 - "compilerOptions"
Cohesion: 0.06
Nodes (31): dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, pages/**/*.ts, pages/**/*.tsx, src/pages/_app.tsx (+23 more)

### Community 65 - "optimize-hero.mjs"
Cohesion: 0.50
Nodes (3): __dirname, outWebp, srcPng

### Community 68 - "useHydrateQueryCache"
Cohesion: 0.11
Nodes (18): AboutPageContent, ContactPageContent, useHydrateQueryCache(), queryKeys, AboutPageProps, AboutRoute(), AgentProfilePage(), AgentProfilePageProps (+10 more)

### Community 69 - "AboutUsPage.tsx"
Cohesion: 0.22
Nodes (9): AboutUsPage, AtmosphereImage, CmsService, CmsValue, useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages() (+1 more)

### Community 72 - "formatCount"
Cohesion: 0.18
Nodes (9): PropertyIntroduction(), PropertyIntroductionProps, InteriorCopy(), OverviewCopy(), PropertyVillaEditorialSection(), PropertyVillaEditorialSectionProps, PropertyVillaUtilityAction, PropertyTypeCard() (+1 more)

### Community 78 - "BestValuePropertyCard.tsx"
Cohesion: 0.40
Nodes (3): BestValuePropertyCardProps, ImageActionButton(), ImageActionButtonProps

### Community 80 - "SiteFooter.tsx"
Cohesion: 0.23
Nodes (11): buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList(), FooterNavLink(), InstagramIcon(), LEGAL_LINKS (+3 more)

### Community 84 - "validator.ts"
Cohesion: 0.18
Nodes (6): __Check, __IsExpected, PagesPageConfig, __Unused, AgentsPage(), NewsPage()

### Community 86 - "listings.ts"
Cohesion: 0.40
Nodes (6): normalizeListingsFilters(), buildListingsSeo(), statusLabelId(), getServerSideProps(), queryToSearchParams(), ListingsPage()

### Community 87 - "HeroSection.tsx"
Cohesion: 0.24
Nodes (8): FALLBACK_HERO_IMAGE, HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG, TABS, TYPE_OPTIONS, withCoverBox(), preloadImage()

### Community 88 - "property-details.ts"
Cohesion: 0.29
Nodes (9): DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery(), seedFromId(), mediaPreviewUrl(), previewRequestWidth() (+1 more)

### Community 89 - "listing-filter-params.ts"
Cohesion: 0.18
Nodes (21): isHomePath(), isListingsPath(), ListingFiltersProvider(), PropertyTypeCardProps, ListingFiltersContext, ListingFiltersContextValue, filtersEqual(), filtersToSearchParams() (+13 more)

### Community 90 - "FormSelect.tsx"
Cohesion: 0.50
Nodes (4): FormSelect(), FormSelectOption, FormSelectProps, normalizeOptions()

### Community 91 - "utils.ts"
Cohesion: 0.17
Nodes (9): SearchableSelect(), SearchableSelectOption, SearchableSelectProps, LoaderOrbit(), LoadingOverlayProps, PageLoader(), PageLoaderProps, Badge() (+1 more)

### Community 95 - "cms-merge.ts"
Cohesion: 0.18
Nodes (21): AGENTS, ALL_PROPERTIES, coalesce(), coalesceMediaObject(), findFallbackProperty(), hasGalleryImages(), isBlank(), mergeAgentsWithFallback() (+13 more)

### Community 101 - "AboutPageSkeleton.tsx"
Cohesion: 0.20
Nodes (6): AboutPageSkeleton(), SectionEyebrowTitle(), TimelineItemSkeleton(), CmsPageSkeleton(), CmsPageSkeletonProps, CmsPageSkeletonVariant

## Knowledge Gaps
- **372 isolated node(s):** `AppRoutes`, `PageRoutes`, `LayoutRoutes`, `RedirectRoutes`, `RewriteRoutes` (+367 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `skeletons/index.ts`, `src/pages/_app.tsx`, `PropertyDetailDialog.tsx`, `SiteHeader.tsx`, `LocationPicker.tsx`, `SubmitPropertyPage.tsx`, `App.tsx`, `PropertyTypeGrid.tsx`, `SectionAtmosphere.tsx`, `MyListingsPage.tsx`, `PropertyDetailHero.tsx`, `AdvancedSearchSheet.tsx`, `ListingsView.tsx`, `EditMyListingPage.tsx`, `ExpertiseSection.tsx`, `WhatPeopleSaySection.tsx`, `ContactUsPage.tsx`, `PropertyVillaCtaBanner.tsx`, `types/index.ts`, `PropertyShowcaseView.tsx`, `LocationSection.tsx`, `media-image.tsx`, `AppShell.tsx`, `AboutUsPage.tsx`, `formatCount`, `BestValuePropertyCard.tsx`, `SiteFooter.tsx`, `HeroSection.tsx`, `FormSelect.tsx`, `utils.ts`, `AboutPageSkeleton.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `useAuth.tsx`, `queries.ts`, `EditMyListingPage.tsx`, `withSsgFallback`, `ComparePage.tsx`, `ContactUsPage.tsx`, `PropertyDetailDialog.tsx`, `LocationPicker.tsx`, `SubmitPropertyPage.tsx`, `App.tsx`, `absoluteUrl`, `Article`, `pages.service.ts`, `useSiteConfig`, `useWishlist.ts`, `cms-merge.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `routes` connect `types/index.ts` to `Property`, `PropertyDetailDialog.tsx`, `SiteHeader.tsx`, `SubmitPropertyPage.tsx`, `App.tsx`, `PropertyDetail`, `absoluteUrl`, `PropertyTypeGrid.tsx`, `navigation.ts`, `MyListingsPage.tsx`, `PropertyDetailHero.tsx`, `ListingsView.tsx`, `EditMyListingPage.tsx`, `ExpertiseSection.tsx`, `ComparePage.tsx`, `ContactUsPage.tsx`, `PropertyVillaCtaBanner.tsx`, `PropertyShowcaseView.tsx`, `AppShell.tsx`, `useWishlist.ts`, `useHydrateQueryCache`, `AboutUsPage.tsx`, `BestValuePropertyCard.tsx`, `SiteFooter.tsx`, `listings.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `AppRoutes`, `PageRoutes`, `LayoutRoutes` to the rest of the system?**
  _372 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09359605911330049 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `skeletons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07544757033248081 - nodes in this community are weakly interconnected._