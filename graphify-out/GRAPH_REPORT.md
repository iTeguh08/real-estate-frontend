# Graph Report - real-estate-frontend  (2026-08-19)

## Corpus Check
- 308 files · ~163,446 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1646 nodes · 5046 edges · 97 communities (80 shown, 17 thin omitted)
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
- src/pages/contact.tsx
- useTheme
- PropertyDetailDialog.tsx
- SiteHeader.tsx
- LocationPicker.tsx
- SubmitPropertyPage.tsx
- api-client.ts
- cn
- compilerOptions
- App.tsx
- PropertyDetail
- components.json
- absoluteUrl
- PropertyTypeGrid.tsx
- queries.ts
- withSsgFallback
- pages.service.ts
- compilerOptions
- routes.d.ts
- useTheme.tsx
- types/index.ts
- navigation.ts
- SiteFooter.tsx
- SectionAtmosphere.tsx
- MyListingsPage.tsx
- PropertyDetailHero.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- useAuth.tsx
- ListingsView.tsx
- isMockDataEnabled
- app-router.ts
- WhatPeopleSaySection.tsx
- ComparePage.tsx
- ContactUsPage.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- listing-agent.ts
- routes.ts
- PropertyShowcaseView.tsx
- LocationSection.tsx
- eslint-plugin-react-refresh
- next.config.mjs
- media-image.tsx
- AppShell.tsx
- useAdvancedSearch.tsx
- scripts
- kill-dev.mjs
- next-env.d.ts
- @tailwindcss/postcss
- optimize-bg.mjs
- vite
- postcss.config.mjs
- package.json
- dev-guard.mjs
- PropertyCard.tsx
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- query-keys.ts
- AboutUsPage.tsx
- jsdom
- ArticleDetailView.tsx
- Article
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- PropertyVillaCtaBanner.tsx
- vitest
- properties-slug.ts
- validator.ts
- @vitest/coverage-v8
- graphql-client.ts
- HeroSection.tsx
- tabs.tsx
- listing-filter-params.ts
- FormSelect.tsx
- utils.ts
- eslint-plugin-react-hooks
- globals
- cms-merge.ts
- AboutPageSkeleton.tsx
- @types/leaflet

## God Nodes (most connected - your core abstractions)
1. `cn()` - 210 edges
2. `isMockDataEnabled()` - 79 edges
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
- `PropertyCtaSectionProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyCtaSection.tsx → src/types/index.ts
- `PropertyDetailHeroProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (97 total, 17 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.07
Nodes (50): PropertyDetailDialog(), LocationCard(), withCoverOriginal(), DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery() (+42 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "properties.service.ts"
Cohesion: 0.20
Nodes (21): BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES, countByType(), PROPERTY_TYPE_ITEMS, usePropertyTypeCountsQuery(), mergePropertiesWithFallback(), listingFiltersQueryVars(), getStaticProps() (+13 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.07
Nodes (43): AgentCardSkeleton(), AgentCardSkeletonProps, AgentProfileSkeleton(), AgentsPageSkeleton(), ArticleCardSkeleton(), ArticleCardSkeletonProps, AuthFormSkeleton(), BestValueCardSkeleton() (+35 more)

### Community 4 - "Property"
Cohesion: 0.17
Nodes (22): PropertyDetailDialogProps, PropertyRelatedSectionProps, BestPropertyValueSectionProps, FeaturedPropertiesProps, HomepageContent, useHydrateQueryCache(), HomePageProps, ListingsPageProps (+14 more)

### Community 5 - "src/pages/contact.tsx"
Cohesion: 0.29
Nodes (6): ContactPageContent, getStaticProps(), ContactPageProps, ContactRoute(), getContactPage(), toPhoneHref()

### Community 6 - "useTheme"
Cohesion: 0.18
Nodes (10): App(), ThemeToggleButton(), ThemedToaster(), PropertyTypeGrid(), useTheme(), preloadCriticalFonts(), queryClientOptions, queryClient (+2 more)

### Community 7 - "PropertyDetailDialog.tsx"
Cohesion: 0.10
Nodes (28): ContextIcon, InquiryContextBlock, InquiryDialogProps, chunkFullPages(), chunkPartialPages(), PropertyGalleryGrid(), PropertyGalleryGridProps, PropertyDetailDialog (+20 more)

### Community 8 - "SiteHeader.tsx"
Cohesion: 0.29
Nodes (11): MobileNavGroup(), mobileNavLinkClasses(), NavDropdownPanel(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader() (+3 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.09
Nodes (26): LocationValue, composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry(), LocationPicker() (+18 more)

### Community 10 - "SubmitPropertyPage.tsx"
Cohesion: 0.12
Nodes (23): SubmitPropertyPage, useResubmitPropertySubmissionMutation(), useSubmitPropertyMutation(), TURNSTILE_MISSING_MESSAGE, clearFieldError(), firstApiFieldError(), getApiFieldErrors(), composeLocation() (+15 more)

### Community 11 - "api-client.ts"
Cohesion: 0.14
Nodes (19): loadTurnstileScript(), TurnstileWidget(), TurnstileWidgetProps, Window, useSecurityConfig(), useTurnstileGate(), apiFetch(), FieldErrors (+11 more)

### Community 12 - "cn"
Cohesion: 0.06
Nodes (40): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), ShowcaseThumbGrid(), GalleryTile(), PropertyMediaSlotField() (+32 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "App.tsx"
Cohesion: 0.09
Nodes (28): AgentProfilePage, ArticleDetailPage, BootstrapLoaderComplete(), EditMyListingPage, NotFoundPage, PrivacyPolicyPage, PropertyDetailPage, PropertyListingsPage (+20 more)

### Community 15 - "PropertyDetail"
Cohesion: 0.13
Nodes (19): PropertyContactStripProps, PropertyIntroduction(), PropertyIntroductionProps, PropertyOverviewCanvas(), PropertyOverviewCanvasProps, PropertyShowcaseSection(), PropertyShowcaseSectionProps, PropertyShowcaseVillaViewProps (+11 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "absoluteUrl"
Cohesion: 0.08
Nodes (28): DashboardPage, defaultAuthFallback(), RequireAuth(), DashboardSkeleton(), useAuth(), absoluteUrl(), getApiBaseUrl(), getRuntimeMode() (+20 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.15
Nodes (18): ApartmentIllustration(), CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration() (+10 more)

### Community 19 - "queries.ts"
Cohesion: 0.19
Nodes (15): AGENTS, useAgentQuery(), useAgentsQuery(), usePropertyQuery(), usePropertySearchQuery(), mergeAgentsWithFallback(), mergeAgentWithFallback(), AgentProfilePageProps (+7 more)

### Community 20 - "withSsgFallback"
Cohesion: 0.29
Nodes (11): ARTICLES, getStaticProps(), getStaticPaths(), getStaticProps(), getStaticProps(), getStaticPaths(), getStaticProps(), jsonSafe() (+3 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.13
Nodes (24): ABOUT_PAGE_FALLBACK, AboutPageContent, CmsSeoMeta, CmsStat, CmsTimelineItem, CONTACT_PAGE_FALLBACK, HOMEPAGE_FALLBACK, HomepageExpertiseItem (+16 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "routes.d.ts"
Cohesion: 0.17
Nodes (11): AppRoutes, LayoutProps, LayoutRoutes, LayoutSlotMap, PageProps, PageRoutes, ParamMap, ParamsOf (+3 more)

### Community 24 - "useTheme.tsx"
Cohesion: 0.29
Nodes (11): ThemeProvider(), ThemeContext, ThemeContextValue, applyTheme(), getServerTheme(), isTheme(), readStoredTheme(), subscribeToTheme() (+3 more)

### Community 25 - "types/index.ts"
Cohesion: 0.20
Nodes (15): ListingSortSelect(), ListingSortSelectProps, SearchIntentBanner(), SearchIntentBannerProps, describeSearchIntent(), hasSearchIntent(), SORT_OPTIONS, sortLabel() (+7 more)

### Community 26 - "navigation.ts"
Cohesion: 0.15
Nodes (20): ARTICLE_PREVIEW_COUNT, HOME_SCROLL_SECTIONS, HomeScrollSection, isNavItemActive(), NavLinkItem, normalizePath(), PAGE_ROUTES, PAGE_SCROLL_SECTIONS (+12 more)

### Community 27 - "SiteFooter.tsx"
Cohesion: 0.12
Nodes (22): AgentsListingPage, SiteBrandingEffect(), buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList(), FooterNavLink() (+14 more)

### Community 28 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 29 - "MyListingsPage.tsx"
Cohesion: 0.13
Nodes (19): MyListingsPage, useMyListingsQuery(), useMyPropertySubmissionsQuery(), MyListingsPage, formatListingPrice(), formatPrice(), MyListingsPage(), statusBadgeClass() (+11 more)

### Community 30 - "PropertyDetailHero.tsx"
Cohesion: 0.13
Nodes (21): PropertyDetailBody(), HeroActionButtons(), HeroActionButtonsProps, HeroContentPanel(), HeroContentPanelProps, PropertyDetailHero(), PropertyDetailHeroProps, ShowcaseThumb (+13 more)

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.16
Nodes (14): BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS, Sheet() (+6 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "useAuth.tsx"
Cohesion: 0.20
Nodes (18): AuthProvider(), AuthContext, AuthContextValue, EmailForm, useLiveEmailAvailability(), checkEmailAvailable(), fetchCurrentUser(), loginMember() (+10 more)

### Community 34 - "ListingsView.tsx"
Cohesion: 0.14
Nodes (22): BestValuePropertyCard(), BestPropertyValueSection(), FeaturedProperties(), useBestValuePropertiesQuery(), useFeaturedPropertiesQuery(), useAdvancedSearch(), useQuerySkeletonState(), formatPerSqftPrice() (+14 more)

### Community 35 - "isMockDataEnabled"
Cohesion: 0.08
Nodes (57): COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, CustomLayout, LAYOUT1_MEDIA_SLOTS, LAYOUT2_MEDIA_SLOTS, MediaSlotField, MediaSlotMeta, useCancelPropertySubmissionMutation() (+49 more)

### Community 36 - "app-router.ts"
Cohesion: 0.22
Nodes (12): BlogPage, NewsPage, HelpfulGuidesSection(), useArticlesQuery(), AppTo, parseAppLocation(), useAppSearchParams(), BlogView() (+4 more)

### Community 37 - "WhatPeopleSaySection.tsx"
Cohesion: 0.46
Nodes (5): TestimonialCard(), TestimonialCardProps, WhatPeopleSaySectionProps, TESTIMONIALS, Testimonial

### Community 38 - "ComparePage.tsx"
Cohesion: 0.21
Nodes (19): ComparePage, CompareBar(), useToggleCompareMutation(), useCompare(), hasBlockingOverlay(), HIDDEN_EXACT, isHiddenPath(), useCompareBarVisible() (+11 more)

### Community 39 - "ContactUsPage.tsx"
Cohesion: 0.09
Nodes (39): ContactUsPage, LoginPage, RegisterPage, AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps, AuthSubmitButton() (+31 more)

### Community 40 - "cva.ts"
Cohesion: 0.12
Nodes (15): filterTab, FilterTabVariants, luxuryButton, LuxuryButtonVariants, navLink, NavLinkVariants, newBadge, NewBadgeVariants (+7 more)

### Community 41 - "Homzen Real Estate — Frontend"
Cohesion: 0.22
Nodes (8): Auth-protected routes, Deploy, Design system, Homzen Real Estate — Frontend, Important env, Local development, Scripts, Stack

### Community 42 - "devDependencies"
Cohesion: 0.13
Nodes (15): eslint, @eslint/js, devDependencies, eslint, @eslint/js, sharp, tailwindcss, @tailwindcss/vite (+7 more)

### Community 43 - "listing-agent.ts"
Cohesion: 0.27
Nodes (10): PropertyContactStrip(), PropertyInquiryDialogs(), PropertyInquiryDialogsProps, PropertyInquiryDialogs, PropertyInquiryDialogs, PropertyVillaHighlights(), agentFirstName(), askAgentLabel() (+2 more)

### Community 44 - "routes.ts"
Cohesion: 0.15
Nodes (20): AgentCard(), AgentCardProps, buildAgentSlides(), MeetOurAgentsSection(), MeetOurAgentsSectionProps, useAgentsPerSlide(), LoadingOverlay(), useArticleQuery() (+12 more)

### Community 45 - "PropertyShowcaseView.tsx"
Cohesion: 0.14
Nodes (16): PropertyRelatedSection(), PropertyShowcaseClassicView(), PropertyShowcaseView(), PropertyShowcaseViewProps, PropertyShowcaseVillaView, PropertyShowcaseVillaView(), AmenityItem, buildAmenityItems() (+8 more)

### Community 46 - "LocationSection.tsx"
Cohesion: 0.22
Nodes (12): buildLocationRows(), buildLocationSlides(), LocationCardProps, LocationCardVariant, LocationSection(), LocationSectionProps, WhatPeopleSaySection(), SQUARE_LOCATIONS (+4 more)

### Community 49 - "media-image.tsx"
Cohesion: 0.24
Nodes (7): PropertyFeaturesBlock(), PropertyFeaturesBlockProps, PropertyOverviewBackground(), PropertyOverviewBackgroundProps, MediaImage(), MediaImageProps, resolveMinSkeletonMs()

### Community 50 - "AppShell.tsx"
Cohesion: 0.20
Nodes (12): AppShell(), scrollToElement(), ScrollToHash(), SiteHeaderProvider(), SiteHeaderSpacer(), AdvancedSearchSheet(), SiteHeaderContext, SiteHeaderContextValue (+4 more)

### Community 52 - "useAdvancedSearch.tsx"
Cohesion: 0.53
Nodes (3): AdvancedSearchProvider(), AdvancedSearchContext, AdvancedSearchContextValue

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

### Community 62 - "PropertyCard.tsx"
Cohesion: 0.15
Nodes (18): WishlistPage, BestValuePropertyCardProps, CardVariants, PropertyCard(), PropertyCardProps, SpecPillProps, ImageActionButton(), ImageActionButtonProps (+10 more)

### Community 63 - "vite-env.d.ts"
Cohesion: 0.40
Nodes (4): *.css, ImportMeta, ImportMetaEnv, *.png

### Community 64 - "compilerOptions"
Cohesion: 0.06
Nodes (31): dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, pages/**/*.ts, pages/**/*.tsx, src/pages/_app.tsx (+23 more)

### Community 65 - "optimize-hero.mjs"
Cohesion: 0.50
Nodes (3): __dirname, outWebp, srcPng

### Community 68 - "query-keys.ts"
Cohesion: 0.23
Nodes (8): queryKeys, BlogArticlePage(), BlogArticlePageProps, metaDescription(), metaDescription(), NewsArticlePage(), NewsArticlePageProps, ArticleCategory

### Community 69 - "AboutUsPage.tsx"
Cohesion: 0.22
Nodes (9): AboutUsPage, AtmosphereImage, CmsService, CmsValue, useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages() (+1 more)

### Community 72 - "ArticleDetailView.tsx"
Cohesion: 0.33
Nodes (10): ArticleCard(), ArticleCardProps, ARTICLE_CATEGORY_LABELS, getArticleCategoryLabel(), getArticlePath(), getArticlesListPath(), getArticleTagPath(), ArticleDetailView() (+2 more)

### Community 73 - "Article"
Cohesion: 0.22
Nodes (8): HelpfulGuidesSectionProps, BlogArticlePageProps, NewsArticlePageProps, NewsViewProps, BlogPage(), BlogPageProps, NewsPageProps, Article

### Community 78 - "PropertyVillaCtaBanner.tsx"
Cohesion: 0.31
Nodes (7): PropertyCtaSection(), PropertyCtaSectionProps, PropertyVillaCtaBanner(), PropertyVillaCtaBannerProps, Button(), buttonVariants, contactAgentLabel()

### Community 80 - "properties-slug.ts"
Cohesion: 0.33
Nodes (6): getStaticPaths(), getStaticProps(), PropertyDetailPageProps, getPropertyById(), getPropertyDetailBySlug(), getRelatedProperties()

### Community 84 - "validator.ts"
Cohesion: 0.17
Nodes (7): __Check, __IsExpected, PagesPageConfig, __Unused, getStaticProps(), AgentsPage(), NewsPage()

### Community 86 - "graphql-client.ts"
Cohesion: 0.46
Nodes (6): getGraphqlUrl(), errorText(), GraphqlError, graphqlFetch(), isNetworkFailure(), networkCauseCode()

### Community 87 - "HeroSection.tsx"
Cohesion: 0.24
Nodes (8): FALLBACK_HERO_IMAGE, HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG, TABS, TYPE_OPTIONS, withCoverBox(), preloadImage()

### Community 88 - "tabs.tsx"
Cohesion: 0.38
Nodes (5): Tabs(), TabsContent(), TabsList(), TabsTrigger(), tabsListVariants

### Community 89 - "listing-filter-params.ts"
Cohesion: 0.17
Nodes (20): isHomePath(), isListingsPath(), ListingFiltersProvider(), filtersEqual(), filtersToSearchParams(), hasFilterParams(), isPropertySort(), isPropertyStatus() (+12 more)

### Community 90 - "FormSelect.tsx"
Cohesion: 0.50
Nodes (4): FormSelect(), FormSelectOption, FormSelectProps, normalizeOptions()

### Community 91 - "utils.ts"
Cohesion: 0.17
Nodes (9): SearchableSelect(), SearchableSelectOption, SearchableSelectProps, LoaderOrbit(), LoadingOverlayProps, PageLoader(), PageLoaderProps, Badge() (+1 more)

### Community 95 - "cms-merge.ts"
Cohesion: 0.26
Nodes (15): ALL_PROPERTIES, coalesce(), coalesceMediaObject(), findFallbackProperty(), hasGalleryImages(), isBlank(), mergeArticlesWithFallback(), mergeArticleWithFallback() (+7 more)

### Community 101 - "AboutPageSkeleton.tsx"
Cohesion: 0.20
Nodes (6): AboutPageSkeleton(), SectionEyebrowTitle(), TimelineItemSkeleton(), CmsPageSkeleton(), CmsPageSkeletonProps, CmsPageSkeletonVariant

## Knowledge Gaps
- **372 isolated node(s):** `AppRoutes`, `PageRoutes`, `LayoutRoutes`, `RedirectRoutes`, `RewriteRoutes` (+367 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `image-url.ts`, `skeletons/index.ts`, `useTheme`, `PropertyDetailDialog.tsx`, `SiteHeader.tsx`, `LocationPicker.tsx`, `SubmitPropertyPage.tsx`, `App.tsx`, `PropertyDetail`, `PropertyTypeGrid.tsx`, `types/index.ts`, `SiteFooter.tsx`, `SectionAtmosphere.tsx`, `MyListingsPage.tsx`, `PropertyDetailHero.tsx`, `AdvancedSearchSheet.tsx`, `ListingsView.tsx`, `isMockDataEnabled`, `WhatPeopleSaySection.tsx`, `ComparePage.tsx`, `ContactUsPage.tsx`, `routes.ts`, `PropertyShowcaseView.tsx`, `LocationSection.tsx`, `media-image.tsx`, `AppShell.tsx`, `PropertyCard.tsx`, `AboutUsPage.tsx`, `ArticleDetailView.tsx`, `PropertyVillaCtaBanner.tsx`, `HeroSection.tsx`, `tabs.tsx`, `FormSelect.tsx`, `utils.ts`, `AboutPageSkeleton.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `properties.service.ts`, `src/pages/contact.tsx`, `PropertyDetailDialog.tsx`, `LocationPicker.tsx`, `SubmitPropertyPage.tsx`, `api-client.ts`, `App.tsx`, `absoluteUrl`, `queries.ts`, `withSsgFallback`, `pages.service.ts`, `SiteFooter.tsx`, `MyListingsPage.tsx`, `useAuth.tsx`, `ComparePage.tsx`, `ContactUsPage.tsx`, `PropertyCard.tsx`, `properties-slug.ts`, `graphql-client.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `routes` connect `routes.ts` to `Property`, `src/pages/contact.tsx`, `PropertyDetailDialog.tsx`, `SiteHeader.tsx`, `SubmitPropertyPage.tsx`, `App.tsx`, `PropertyDetail`, `absoluteUrl`, `PropertyTypeGrid.tsx`, `pages.service.ts`, `types/index.ts`, `navigation.ts`, `SiteFooter.tsx`, `MyListingsPage.tsx`, `PropertyDetailHero.tsx`, `ListingsView.tsx`, `isMockDataEnabled`, `app-router.ts`, `ComparePage.tsx`, `ContactUsPage.tsx`, `PropertyShowcaseView.tsx`, `PropertyCard.tsx`, `query-keys.ts`, `AboutUsPage.tsx`, `ArticleDetailView.tsx`, `Article`, `PropertyVillaCtaBanner.tsx`, `listing-filter-params.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `AppRoutes`, `PageRoutes`, `LayoutRoutes` to the rest of the system?**
  _372 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06708595387840671 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `skeletons/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07203219315895372 - nodes in this community are weakly interconnected._