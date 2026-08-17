# Graph Report - real-estate-frontend  (2026-08-17)

## Corpus Check
- 212 files · ~146,067 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1336 nodes · 3657 edges · 83 communities (65 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec45fb4c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-url.ts
- dependencies
- routes.ts
- skeletons/index.ts
- isMockDataEnabled
- SiteHeader.tsx
- useAuth.tsx
- PropertyDetailDialog.tsx
- types/index.ts
- LocationPicker.tsx
- media-image.tsx
- resolveListingAgent
- cn
- compilerOptions
- MyListingsPage.tsx
- PropertyCard.tsx
- components.json
- ContactUsPage.tsx
- PropertyTypeGrid.tsx
- App.tsx
- PropertyShowcaseView.tsx
- pages.service.ts
- compilerOptions
- SubmitPropertyPage.tsx
- LocationSection.tsx
- PropertyDetail
- FeaturedProperties.tsx
- useListingFilters.tsx
- articles.service.ts
- SiteFooter.tsx
- HeroSection.tsx
- AdvancedSearchSheet.tsx
- 2. Section-by-section: keep / merge / kill / rewrite
- productThumbUrl
- security.service.ts
- queries.ts
- SectionAtmosphere.tsx
- PropertyListingsPage.tsx
- property-details.ts
- ArticleDetailPage.tsx
- cva.ts
- Homzen Real Estate — Frontend
- devDependencies
- ArticleCard.tsx
- PropertyVillaEditorialSection.tsx
- PropertyGalleryGrid.tsx
- ExpertiseSection.tsx
- lightboxCoverUrl
- next.config.mjs
- properties.service.ts
- property-types.ts
- globals
- scripts
- AboutUsPage.tsx
- next-env.d.ts
- @tailwindcss/postcss
- optimize-bg.mjs
- vite
- postcss.config.mjs
- package.json
- FormSelect.tsx
- runtime-env.ts
- vite-env.d.ts
- compilerOptions
- optimize-hero.mjs
- css.d.ts
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- jsdom
- @types/leaflet
- @types/node
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- vitest
- @vitest/coverage-v8

## God Nodes (most connected - your core abstractions)
1. `cn()` - 186 edges
2. `isMockDataEnabled()` - 76 edges
3. `routes` - 44 edges
4. `PropertyDetail` - 38 edges
5. `useAuth()` - 31 edges
6. `MediaImage()` - 29 edges
7. `useTheme()` - 29 edges
8. `SectionAtmosphere()` - 27 edges
9. `EditMyListingPage()` - 24 edges
10. `formatPropertyLocation()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `PropertyDetailDialogProps` --references--> `Property`  [EXTRACTED]
  src/components/cards/PropertyDetailDialog.tsx → src/types/index.ts
- `FooterLinkList()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/SiteFooter.tsx → src/lib/utils.ts
- `PropertyContactStripProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyContactStrip.tsx → src/types/index.ts
- `PropertyCtaSectionProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyCtaSection.tsx → src/types/index.ts
- `PropertyDetailHeroProps` --references--> `PropertyDetail`  [EXTRACTED]
  src/components/property/PropertyDetailHero.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (83 total, 18 thin omitted)

### Community 0 - "image-url.ts"
Cohesion: 0.11
Nodes (20): withCoverOriginal(), coverDisplaySize(), coverRequestWidth(), galleryOriginalUrl(), GRID_CARD_PREVIEW_WIDTH, HERO_PREVIEW_WIDTH, LIGHTBOX_COVER_MAX_EDGE, mediaOriginalUrl() (+12 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): class-variance-authority, clsx, @fontsource/poppins, @hookform/resolvers, isomorphic-dompurify, leaflet, lucide-react, dependencies (+37 more)

### Community 2 - "routes.ts"
Cohesion: 0.07
Nodes (48): BestValuePropertyCard(), BestValuePropertyCardProps, CompareBar(), AppShell(), scrollToElement(), ScrollToHash(), PropertyDetailHero(), PropertyVillaHero() (+40 more)

### Community 3 - "skeletons/index.ts"
Cohesion: 0.13
Nodes (19): AgentProfilePage, AgentCardSkeleton(), AgentProfileSkeleton(), ArticleCardSkeletonProps, BestValueCardSkeleton(), BestValueCardSkeletonProps, CmsPageSkeleton(), CmsPageSkeletonProps (+11 more)

### Community 4 - "isMockDataEnabled"
Cohesion: 0.09
Nodes (49): COVER_MEDIA_SLOT, CUSTOM_LAYOUT_OPTIONS, CustomLayout, LAYOUT1_MEDIA_SLOTS, LAYOUT2_MEDIA_SLOTS, MediaSlotField, MediaSlotMeta, useCancelPropertySubmissionMutation() (+41 more)

### Community 5 - "SiteHeader.tsx"
Cohesion: 0.16
Nodes (20): MobileNavGroup(), mobileNavLinkClasses(), NavDropdownPanel(), navLinkClass, navLinkClasses(), navTriggerClass, navTriggerClasses(), SiteHeader() (+12 more)

### Community 6 - "useAuth.tsx"
Cohesion: 0.17
Nodes (23): AuthContext, AuthContextValue, AuthProvider(), EmailForm, useLiveEmailAvailability(), ApiError, apiFetch(), getApiBaseUrl() (+15 more)

### Community 7 - "PropertyDetailDialog.tsx"
Cohesion: 0.11
Nodes (22): PropertyDetailDialogProps, Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+14 more)

### Community 8 - "types/index.ts"
Cohesion: 0.20
Nodes (15): AgentCardProps, MeetOurAgentsSectionProps, AGENTS, BEST_VALUE_PROPERTIES, FEATURED_PROPERTIES, ALL_PROPERTIES, Agent, ListingAgent (+7 more)

### Community 9 - "LocationPicker.tsx"
Cohesion: 0.06
Nodes (35): App(), LocationValue, composeLocationHint(), countryCodes(), CountryOption, DEFAULT_CENTER, DefaultIcon, isAllowedCountry() (+27 more)

### Community 10 - "media-image.tsx"
Cohesion: 0.25
Nodes (10): PropertyCtaSection(), PropertyCtaSectionProps, PropertyVillaCtaBanner(), PropertyVillaCtaBannerProps, Button(), buttonVariants, MediaImage(), MediaImageProps (+2 more)

### Community 11 - "resolveListingAgent"
Cohesion: 0.23
Nodes (10): PropertyContactStrip(), PropertyContactStripProps, PropertyInquiryDialogs(), PropertyInquiryDialogsProps, PropertyVillaHighlights(), PropertyVillaHighlightsProps, agentFirstName(), askAgentLabel() (+2 more)

### Community 12 - "cn"
Cohesion: 0.07
Nodes (38): base, BuyHomeIllustration(), IllustrationProps, RentHomeIllustration(), SellHomeIllustration(), HeroActionButtons(), ShowcaseThumbGrid(), PropertyMediaSlotField() (+30 more)

### Community 13 - "compilerOptions"
Cohesion: 0.08
Nodes (24): src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module (+16 more)

### Community 14 - "MyListingsPage.tsx"
Cohesion: 0.12
Nodes (21): DashboardSkeleton(), useMyListingsQuery(), useMyPropertySubmissionsQuery(), isAgentUser(), DashboardPage(), formatListingPrice(), formatPrice(), MyListingsPage() (+13 more)

### Community 15 - "PropertyCard.tsx"
Cohesion: 0.14
Nodes (21): CardVariants, PropertyCard(), PropertyCardProps, SpecPillProps, PropertyDetailBody(), HeroActionButtonsProps, HeroContentPanel(), HeroContentPanelProps (+13 more)

### Community 16 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "ContactUsPage.tsx"
Cohesion: 0.09
Nodes (46): AUTH_PANEL_IMAGE, AuthFooterLink(), AuthFormShell(), AuthFormShellProps, AuthSubmitButton(), FormField(), FormFieldProps, MockSubmitNotice() (+38 more)

### Community 18 - "PropertyTypeGrid.tsx"
Cohesion: 0.26
Nodes (13): ApartmentIllustration(), CommercialIllustration(), iconBase(), IllustrationImage(), IllustrationProps, OfficeIllustration(), StudioIllustration(), TownhouseIllustration() (+5 more)

### Community 19 - "App.tsx"
Cohesion: 0.13
Nodes (18): ArticleDetailPage, BootstrapLoaderComplete(), ComparePage, ContactUsPage, DashboardPage, EditMyListingPage, LoginPage, MyListingsPage (+10 more)

### Community 20 - "PropertyShowcaseView.tsx"
Cohesion: 0.15
Nodes (17): PropertyDetailDialog(), PropertyRelatedSection(), PropertyRelatedSectionProps, PropertyShowcaseClassicView(), PropertyShowcaseView(), PropertyShowcaseViewProps, PropertyShowcaseVillaView, PropertyShowcaseVillaView() (+9 more)

### Community 21 - "pages.service.ts"
Cohesion: 0.17
Nodes (19): ABOUT_PAGE_FALLBACK, AboutPageContent, CmsStat, CmsTimelineItem, CONTACT_PAGE_FALLBACK, ContactPageContent, HOMEPAGE_FALLBACK, HomepageContent (+11 more)

### Community 22 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 23 - "SubmitPropertyPage.tsx"
Cohesion: 0.14
Nodes (20): SubmitPropertyPage, useSubmitPropertyMutation(), clearFieldError(), firstApiFieldError(), getApiFieldErrors(), composeLocation(), EMPTY_LOCATION, FileDropzone() (+12 more)

### Community 24 - "LocationSection.tsx"
Cohesion: 0.07
Nodes (39): TestimonialCard(), TestimonialCardProps, buildLocationRows(), buildLocationSlides(), LocationCardProps, LocationCardVariant, LocationSectionProps, buildAgentSlides() (+31 more)

### Community 25 - "PropertyDetail"
Cohesion: 0.21
Nodes (12): PropertyFeaturesBlock(), PropertyFeaturesBlockProps, PropertyIntroduction(), PropertyIntroductionProps, getPropertyOverviewBackgroundImage(), PropertyOverviewBackground(), PropertyOverviewBackgroundProps, PropertyOverviewCanvas() (+4 more)

### Community 26 - "FeaturedProperties.tsx"
Cohesion: 0.22
Nodes (13): ListingSortSelect(), ListingSortSelectProps, SearchIntentBanner(), SearchIntentBannerProps, FeaturedPropertiesProps, describeSearchIntent(), hasSearchIntent(), SORT_OPTIONS (+5 more)

### Community 27 - "useListingFilters.tsx"
Cohesion: 0.24
Nodes (14): isHomePath(), isListingsPath(), ListingFiltersContext, ListingFiltersProvider(), filtersEqual(), filtersToSearchParams(), hasFilterParams(), isPropertySort() (+6 more)

### Community 28 - "articles.service.ts"
Cohesion: 0.53
Nodes (5): mergeArticlesWithFallback(), mergeArticleWithFallback(), getArticleBySlug(), getArticles(), ArticleCategory

### Community 29 - "SiteFooter.tsx"
Cohesion: 0.14
Nodes (20): SiteBrandingEffect(), buildSocialLinks(), CATEGORIES_LINKS, COMPANY_LINKS, FacebookIcon(), FooterLinkList(), FooterNavLink(), InstagramIcon() (+12 more)

### Community 30 - "HeroSection.tsx"
Cohesion: 0.14
Nodes (20): ThemeToggleButton(), BestPropertyValueSection(), ExpertiseSection(), FeaturedProperties(), HeroSection(), HeroTab, LIGHT_HERO_LEFT_BG, TABS (+12 more)

### Community 31 - "AdvancedSearchSheet.tsx"
Cohesion: 0.14
Nodes (15): BED_OPTIONS, clampPrice(), formatPrice(), parsePrice(), PriceRangeSection(), SelectField(), STATUS_OPTIONS, Sheet() (+7 more)

### Community 32 - "2. Section-by-section: keep / merge / kill / rewrite"
Cohesion: 0.06
Nodes (31): 1. Locked product intent, 2. Section-by-section: keep / merge / kill / rewrite, 3. Target information architecture (hybrid), 4. Typography & UI rules (align Homzen), 5. UX honesty contract, 6. Differentiation: L1 vs L2 (do not blur), 7. Out of scope (this brief), 8. Acceptance criteria (for a future implementation PR) (+23 more)

### Community 33 - "productThumbUrl"
Cohesion: 0.24
Nodes (15): GalleryTile(), LocationCard(), galleryPreviewUrl(), galleryTileMediaUrl(), isAbsoluteStorageUrl(), isApiImagesUrl(), isUnsplashHost(), productMediumUrl() (+7 more)

### Community 34 - "security.service.ts"
Cohesion: 0.21
Nodes (9): ContactFormData, ContactResponse, NewsletterResponse, subscribeNewsletter(), FALLBACK_CONFIG, HONEYPOT_FIELD, SecurityConfig, TURNSTILE_FIELD (+1 more)

### Community 35 - "queries.ts"
Cohesion: 0.14
Nodes (20): AgentsListingPage, PropertyDetailPage, PropertyShowcasePage, AgentCard(), PropertyShowcaseNotFound(), useAgentsListQuery(), usePropertyDetailByIdQuery(), usePropertyDetailQuery() (+12 more)

### Community 36 - "SectionAtmosphere.tsx"
Cohesion: 0.18
Nodes (16): IMAGE_FILES, imageOpacity(), Intensity, isCoverPattern(), LightGlow, lightWashColor(), PATTERN_FILES, patternLayerStyle() (+8 more)

### Community 37 - "PropertyListingsPage.tsx"
Cohesion: 0.20
Nodes (15): intentQueryKey(), useBestValuePropertiesQuery(), useFeaturedPropertiesQuery(), usePropertySearchQuery(), BED_OPTIONS, clampListingPrice(), formatListingPrice(), getListingsResetFilters() (+7 more)

### Community 38 - "property-details.ts"
Cohesion: 0.29
Nodes (9): DETAIL_COPY, enrichPropertyDetail(), GALLERY_POOL, galleryFromSeed(), pickGallery(), seedFromId(), mediaPreviewUrl(), previewRequestWidth() (+1 more)

### Community 39 - "ArticleDetailPage.tsx"
Cohesion: 0.24
Nodes (12): PrivacyPolicyPage, useArticleQuery(), usePrivacyPageQuery(), ARTICLE_CATEGORY_LABELS, getArticleCategoryLabel(), getArticlesListPath(), getArticleTagPath(), sanitizeHtml() (+4 more)

### Community 40 - "cva.ts"
Cohesion: 0.12
Nodes (15): filterTab, FilterTabVariants, luxuryButton, LuxuryButtonVariants, navLink, NavLinkVariants, newBadge, NewBadgeVariants (+7 more)

### Community 41 - "Homzen Real Estate — Frontend"
Cohesion: 0.22
Nodes (8): Auth-protected routes, Deploy, Design system, Homzen Real Estate — Frontend, Important env, Local development, Scripts, Stack

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, @eslint/js, devDependencies, eslint, @eslint/js, sharp, tailwindcss, @tailwindcss/vite (+5 more)

### Community 43 - "ArticleCard.tsx"
Cohesion: 0.20
Nodes (14): BlogPage, NewsPage, ArticleCard(), ArticleCardProps, HelpfulGuidesSection(), HelpfulGuidesSectionProps, ArticleCardSkeleton(), ARTICLE_PREVIEW_COUNT (+6 more)

### Community 44 - "PropertyVillaEditorialSection.tsx"
Cohesion: 0.25
Nodes (4): InteriorCopy(), PropertyVillaEditorialSection(), PropertyVillaEditorialSectionProps, PropertyVillaUtilityAction

### Community 45 - "PropertyGalleryGrid.tsx"
Cohesion: 0.26
Nodes (8): chunkFullPages(), chunkPartialPages(), PropertyGalleryGrid(), PropertyGalleryGridProps, PROPERTY_GALLERY_COUNT, PROPERTY_GALLERY_MOBILE_PAGE_SIZE, PROPERTY_GALLERY_PAGE_SIZE, PropertyGalleryImage

### Community 46 - "ExpertiseSection.tsx"
Cohesion: 0.29
Nodes (5): ExpertiseItem, ExpertiseServiceCard(), KEY_DIFFERENTIATORS, SERVICE_META, listingsHref()

### Community 47 - "lightboxCoverUrl"
Cohesion: 0.50
Nodes (4): preloadLightboxCover(), galleryLightboxUrl(), lightboxCoverUrl(), lightboxMediaUrl()

### Community 49 - "properties.service.ts"
Cohesion: 0.14
Nodes (25): usePropertyQuery(), coalesce(), coalesceMediaObject(), findFallbackProperty(), hasGalleryImages(), isBlank(), mergeListingAgent(), mergePropertiesWithFallback() (+17 more)

### Community 50 - "property-types.ts"
Cohesion: 0.23
Nodes (11): PropertyTypeCardProps, PROPERTY_FORM, countByType(), PROPERTY_TYPE_ITEMS, PROPERTY_TYPES, PropertyTypeItem, TYPE_SELECT_OPTIONS, ListingFiltersContextValue (+3 more)

### Community 53 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:vite, dev, dev:vite, lint, optimize:bg, optimize:hero (+5 more)

### Community 54 - "AboutUsPage.tsx"
Cohesion: 0.20
Nodes (10): AboutUsPage, AtmosphereImage, CmsService, CmsValue, useAboutPageQuery(), AboutUsPage(), SERVICE_ILLUSTRATIONS, useAboutDecorImages() (+2 more)

### Community 57 - "optimize-bg.mjs"
Cohesion: 0.32
Nodes (7): backupDir, backupOnce(), bgDir, convertRasterToWebp(), __dirname, entries, resizeWebpInPlace()

### Community 60 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 61 - "FormSelect.tsx"
Cohesion: 0.50
Nodes (4): FormSelect(), FormSelectOption, FormSelectProps, normalizeOptions()

### Community 62 - "runtime-env.ts"
Cohesion: 0.26
Nodes (12): getApiBaseUrl(), getGraphqlUrl(), getPublicBasePath(), getRuntimeMode(), getSentryDsn(), getSentryEnvironment(), getSentryTracesSampleRate(), readPublicEnv() (+4 more)

### Community 63 - "vite-env.d.ts"
Cohesion: 0.40
Nodes (4): *.css, ImportMeta, ImportMetaEnv, *.png

### Community 64 - "compilerOptions"
Cohesion: 0.06
Nodes (31): dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, pages/**/*.ts, pages/**/*.tsx, src/pages/_app.tsx (+23 more)

### Community 65 - "optimize-hero.mjs"
Cohesion: 0.50
Nodes (3): __dirname, outWebp, srcPng

## Knowledge Gaps
- **355 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+350 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `routes.ts`, `skeletons/index.ts`, `isMockDataEnabled`, `SiteHeader.tsx`, `PropertyDetailDialog.tsx`, `types/index.ts`, `LocationPicker.tsx`, `media-image.tsx`, `MyListingsPage.tsx`, `PropertyCard.tsx`, `ContactUsPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `PropertyShowcaseView.tsx`, `SubmitPropertyPage.tsx`, `LocationSection.tsx`, `FeaturedProperties.tsx`, `SiteFooter.tsx`, `HeroSection.tsx`, `AdvancedSearchSheet.tsx`, `productThumbUrl`, `queries.ts`, `SectionAtmosphere.tsx`, `PropertyListingsPage.tsx`, `ArticleDetailPage.tsx`, `ArticleCard.tsx`, `PropertyGalleryGrid.tsx`, `ExpertiseSection.tsx`, `AboutUsPage.tsx`, `FormSelect.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `isMockDataEnabled()` connect `isMockDataEnabled` to `routes.ts`, `queries.ts`, `security.service.ts`, `useAuth.tsx`, `ArticleDetailPage.tsx`, `LocationPicker.tsx`, `MyListingsPage.tsx`, `ContactUsPage.tsx`, `properties.service.ts`, `pages.service.ts`, `AboutUsPage.tsx`, `SubmitPropertyPage.tsx`, `articles.service.ts`, `SiteFooter.tsx`, `runtime-env.ts`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `routes` connect `routes.ts` to `skeletons/index.ts`, `isMockDataEnabled`, `SiteHeader.tsx`, `PropertyDetailDialog.tsx`, `types/index.ts`, `media-image.tsx`, `MyListingsPage.tsx`, `PropertyCard.tsx`, `ContactUsPage.tsx`, `PropertyTypeGrid.tsx`, `App.tsx`, `PropertyShowcaseView.tsx`, `SubmitPropertyPage.tsx`, `LocationSection.tsx`, `FeaturedProperties.tsx`, `SiteFooter.tsx`, `queries.ts`, `PropertyListingsPage.tsx`, `ArticleDetailPage.tsx`, `ArticleCard.tsx`, `ExpertiseSection.tsx`, `AboutUsPage.tsx`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _355 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-url.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10822510822510822 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `routes.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06956521739130435 - nodes in this community are weakly interconnected._