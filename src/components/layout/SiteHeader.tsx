import { useCallback, useEffect, useRef, useState, type AnimationEvent, type MouseEvent, type TransitionEvent } from 'react';
import { AppLink } from '@/lib/app-link';
import { useAppNavigate } from '@/lib/app-router';
import { Menu, Building2, ChevronDown, Heart, ArrowLeftRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useSiteHeader } from '@/hooks/useSiteHeader';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site-config';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import {
  PAGES_NAV_GROUPS,
  PROPERTIES_NAV_GROUPS,
  PROPERTY_NAV_FILTER_MAP,
  SIMPLE_NAV_LINKS,
  type NavLinkGroup,
} from '@/data/navigation';
import { useActiveNav } from '@/hooks/useActiveNav';
import { useListingFilters } from '@/hooks/useListingFilters';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/lib/routes';

const navLinkClass = cn(
  'font-poppins text-[14px] font-medium no-underline transition-colors duration-200',
  'bg-transparent p-0 text-hz-body hover:bg-transparent hover:text-hz-primary',
  'focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none',
  'data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent'
);

const navTriggerClass = cn(
  'font-poppins flex h-auto items-center gap-0.5 bg-transparent px-0 py-0',
  'text-[14px] font-medium text-hz-body',
  'hover:bg-transparent hover:text-hz-primary',
  'focus:bg-transparent focus-visible:ring-0 focus-visible:outline-none',
  'data-open:bg-transparent data-open:hover:bg-transparent data-open:text-hz-dark',
  'data-active:bg-transparent data-active:hover:bg-transparent'
);

const navLinkActiveClass =
  'text-hz-dark underline underline-offset-4 decoration-hz-primary decoration-2';

function navLinkClasses(isActive: boolean) {
  return cn(navLinkClass, isActive && navLinkActiveClass);
}

function navTriggerClasses(isActive: boolean) {
  return cn(
    navTriggerClass,
    isActive && 'text-hz-dark underline underline-offset-4 decoration-hz-primary decoration-2'
  );
}

function mobileNavLinkClasses(isActive: boolean) {
  return cn(
    'border-b border-hz-border py-3 font-poppins text-[15px] font-medium no-underline',
    isActive
      ? 'text-hz-dark underline decoration-hz-primary decoration-2 underline-offset-4'
      : 'text-hz-body'
  );
}

function NavDropdownPanel({ groups }: { groups: NavLinkGroup[] }) {
  const navigate = useAppNavigate();
  const { applyNavFilter } = useListingFilters();
  const { checkNavItem } = useActiveNav();

  const handleNavClick = (label: string, href: string) => {
    const mapping = PROPERTY_NAV_FILTER_MAP[label];
    if (mapping) {
      applyNavFilter({
        propertyType: mapping.propertyType ?? '',
        status: mapping.status ?? '',
      });
      return;
    }
    if (label === 'Browse All Types') {
      applyNavFilter({});
      return;
    }
    if (href.startsWith('#')) {
      navigate({ pathname: routes.home, hash: href });
      return;
    }
    navigate(href);
  };

  return (
    <div className="grid gap-6 px-5 py-4 md:min-w-[640px] md:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title} className="min-w-[180px]">
          <p className="mb-3 border-b border-hz-border pb-2 font-poppins text-[11px] font-semibold uppercase tracking-[1.5px] text-hz-primary">
            {group.title}
          </p>
          <ul className="divide-y divide-hz-border">
            {group.items.map((item) => {
              const itemActive = checkNavItem(item.href, item.label);
              return (
              <li key={item.label}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    'flex h-auto w-full flex-col items-start gap-0 rounded-hz p-0',
                    'bg-transparent hover:bg-transparent focus:bg-transparent',
                    'data-active:bg-transparent data-active:hover:bg-transparent',
                    'focus-visible:ring-0 focus-visible:outline-none'
                  )}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.label, item.href);
                    }}
                    className={cn(
                      'block w-full rounded-hz px-2.5 py-2.5 no-underline transition-colors duration-200',
                      'hover:bg-hz-bg-soft hover:text-hz-primary'
                    )}
                  >
                    <span
                      className={cn(
                        'block font-poppins text-sm font-medium leading-snug',
                        itemActive ? 'text-hz-primary' : 'text-hz-dark'
                      )}
                    >
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-1 block font-poppins text-xs leading-relaxed text-hz-muted">
                        {item.description}
                      </span>
                    )}
                  </a>
                </NavigationMenuLink>
              </li>
            );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MobileNavGroup({
  title,
  groups,
  isOpen,
  onToggle,
  onNavigate,
  isSectionActive,
}: {
  title: string;
  groups: NavLinkGroup[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (action: () => void) => void;
  isSectionActive?: boolean;
}) {
  const navigate = useAppNavigate();
  const { applyNavFilter } = useListingFilters();
  const { checkNavItem } = useActiveNav();

  return (
    <div className="border-b border-hz-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between py-3 font-poppins text-[15px] font-medium',
          isSectionActive
            ? 'text-hz-dark underline decoration-hz-primary decoration-2 underline-offset-4'
            : 'text-hz-body'
        )}
      >
        {title}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <div className="space-y-4 pb-3 pl-6">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-hz-primary">
                {group.title}
              </p>
              <ul className="space-y-1 pl-4">
                {group.items.map((item) => {
                  const itemActive = checkNavItem(item.href, item.label);
                  return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const mapping = PROPERTY_NAV_FILTER_MAP[item.label];
                        if (mapping) {
                          onNavigate(() =>
                            applyNavFilter({
                              propertyType: mapping.propertyType ?? '',
                              status: mapping.status ?? '',
                            })
                          );
                          return;
                        }
                        if (item.label === 'Browse All Types') {
                          onNavigate(() => applyNavFilter({}));
                          return;
                        }
                        onNavigate(() => {
                          if (item.href.startsWith('#')) {
                            navigate({ pathname: routes.home, hash: item.href });
                          } else {
                            navigate(item.href);
                          }
                        });
                      }}
                      className={cn(
                        'block py-1.5 font-poppins text-sm no-underline',
                        itemActive ? 'font-medium text-hz-primary' : 'text-hz-body hover:text-hz-primary'
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isNavy = theme === 'navy';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-hz border border-hz-border',
        'text-hz-body transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary',
        className
      )}
      aria-label={isNavy ? 'Switch to light theme' : 'Switch to navy theme'}
      title={isNavy ? 'Light theme' : 'Navy theme'}
    >
      {isNavy ? (
        <Sun size={18} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'properties' | 'pages' | null>(null);
  const { headerRef, isVisible, reducedMotion, setLocked } = useSiteHeader();
  const { data: siteConfig } = useSiteConfig();
  const brand = siteConfig?.brand ?? SITE_CONFIG.brand;
  const tagline = siteConfig?.tagline ?? SITE_CONFIG.tagline;
  const { wishlistIds } = useWishlist();
  const { compareCount } = useCompare();
  const { isActive } = useActiveNav();
  const { isAuthenticated, user } = useAuth();
  const navigate = useAppNavigate();
  const pendingMobileNavRef = useRef<(() => void) | null>(null);
  const accountLabel = isAuthenticated
    ? user?.name?.split(' ')[0] || 'Account'
    : 'Login / Register';

  const flushPendingMobileNav = useCallback(() => {
    const action = pendingMobileNavRef.current;
    if (!action) return;
    pendingMobileNavRef.current = null;
    action();
  }, []);

  const closeMobileThen = useCallback((action?: () => void) => {
    pendingMobileNavRef.current = action ?? null;
    setMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  const onMobileSheetExit = (event: AnimationEvent | TransitionEvent) => {
    if (event.target !== event.currentTarget) return;
    if (mobileOpen) return;
    flushPendingMobileNav();
  };

  const deferMobileNav = (to: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMobileThen(() => navigate(to));
  };

  useEffect(() => {
    setLocked(mobileOpen || navMenuOpen);
  }, [mobileOpen, navMenuOpen, setLocked]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncNavOpen = () => {
      const open =
        header.querySelector('[data-slot="navigation-menu"] [data-open]') !== null;
      setNavMenuOpen(open);
    };

    syncNavOpen();
    const observer = new MutationObserver(syncNavOpen);
    observer.observe(header, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-open', 'data-state'],
    });

    return () => observer.disconnect();
  }, [headerRef]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 z-100 w-full border-b border-hz-border/80 bg-hz-elevated font-poppins shadow-hz-sm',
        'transition-transform duration-300 ease-out will-change-transform',
        !isVisible && '-translate-y-full',
        reducedMotion && 'transition-none'
      )}
    >
      <div className="section-container flex h-[76px] items-center justify-between">
        <AppLink to={routes.home} className="flex shrink-0 items-center gap-1.5 no-underline">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-hz bg-hz-primary">
            <Building2 size={15} strokeWidth={2} className="text-white" aria-hidden="true" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-poppins text-[22px] font-bold leading-none tracking-tight text-hz-dark">
              {brand}
            </span>
            {tagline ? (
              <span className="mt-0.5 hidden font-poppins text-[10px] font-medium uppercase tracking-[0.14em] text-hz-muted sm:block">
                {tagline}
              </span>
            ) : null}
          </div>
        </AppLink>

        <NavigationMenu
          viewport={false}
          className="hidden max-w-none flex-1 justify-center lg:flex"
        >
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <AppLink to={routes.home} className={navLinkClasses(isActive('home'))}>
                  Home
                </AppLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerClasses(isActive('properties'))}>
                Properties
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-auto -translate-x-1/2 rounded-hz border border-hz-border bg-hz-elevated p-0 shadow-hz-md ring-0 outline-none">
                <NavDropdownPanel groups={PROPERTIES_NAV_GROUPS} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <AppLink
                  to={routes.listings}
                  className={navLinkClasses(isActive('listings'))}
                >
                  Listings
                </AppLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerClasses(isActive('pages'))}>
                Pages
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-auto -translate-x-1/2 rounded-hz border border-hz-border bg-hz-elevated p-0 shadow-hz-md ring-0 outline-none">
                <NavDropdownPanel groups={PAGES_NAV_GROUPS} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {SIMPLE_NAV_LINKS.slice(2).map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild>
                  <AppLink to={link.href} className={navLinkClasses(isActive('blog'))}>
                    {link.label}
                  </AppLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggleButton />
          {isAuthenticated ? (
            <>
              <AppLink
                to={routes.compare}
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-hz border border-hz-border',
                  'text-hz-body no-underline transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                )}
                aria-label={`Compare properties${compareCount ? `, ${compareCount} selected` : ''}`}
              >
                <ArrowLeftRight size={18} strokeWidth={1.75} />
                {compareCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-hz-primary px-1 font-poppins text-[10px] font-semibold text-white">
                    {compareCount}
                  </span>
                )}
              </AppLink>
              <AppLink
                to={routes.wishlist}
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-hz border border-hz-border',
                  'text-hz-body no-underline transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                )}
                aria-label={`Wishlist${wishlistIds.length ? `, ${wishlistIds.length} saved` : ''}`}
              >
                <Heart size={18} strokeWidth={1.75} />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-hz-primary px-1 font-poppins text-[10px] font-semibold text-white">
                    {wishlistIds.length}
                  </span>
                )}
              </AppLink>
            </>
          ) : null}
          <AppLink
            to={isAuthenticated ? routes.dashboard : routes.login}
            className={cn(
              'no-underline rounded-hz border border-hz-border bg-transparent px-5 py-[9px]',
              'font-poppins text-[13px] font-medium text-hz-dark',
              'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
            )}
          >
            {accountLabel}
          </AppLink>
          <AppLink
            to={isAuthenticated ? routes.submitProperty : routes.login}
            state={isAuthenticated ? undefined : { from: routes.submitProperty }}
            className={cn(
              'no-underline rounded-hz border-none bg-hz-primary px-5 py-[9px] outline-none',
              'font-poppins text-[13px] font-semibold text-white',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
          >
            Submit Property
          </AppLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="border-none bg-transparent p-2 text-hz-dark"
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sheet
        open={mobileOpen}
        onOpenChange={(open) => {
          setMobileOpen(open);
          if (!open) {
            setMobileExpanded(null);
            if (reducedMotion) flushPendingMobileNav();
          }
        }}
      >
        <SheetContent
          side="right"
          className="flex h-full max-h-dvh w-full min-h-0 flex-col overflow-hidden font-poppins sm:max-w-sm"
          showCloseButton
          onCloseAutoFocus={(event) => event.preventDefault()}
          onAnimationEnd={onMobileSheetExit}
          onTransitionEnd={onMobileSheetExit}
        >
          <SheetHeader className="shrink-0">
            <SheetTitle className="font-poppins text-lg font-semibold text-hz-dark">
              Menu
            </SheetTitle>
          </SheetHeader>

          <nav
            aria-label="Mobile navigation"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4"
          >
            <AppLink
              to={routes.home}
              onClick={deferMobileNav(routes.home)}
              className={mobileNavLinkClasses(isActive('home'))}
            >
              Home
            </AppLink>

            <MobileNavGroup
              title="Properties"
              groups={PROPERTIES_NAV_GROUPS}
              isOpen={mobileExpanded === 'properties'}
              isSectionActive={isActive('properties')}
              onToggle={() =>
                setMobileExpanded((prev) => (prev === 'properties' ? null : 'properties'))
              }
              onNavigate={closeMobileThen}
            />

            <AppLink
              to={routes.listings}
              onClick={deferMobileNav(routes.listings)}
              className={mobileNavLinkClasses(isActive('listings'))}
            >
              Listings
            </AppLink>

            <MobileNavGroup
              title="Pages"
              groups={PAGES_NAV_GROUPS}
              isOpen={mobileExpanded === 'pages'}
              isSectionActive={isActive('pages')}
              onToggle={() => setMobileExpanded((prev) => (prev === 'pages' ? null : 'pages'))}
              onNavigate={closeMobileThen}
            />

            {SIMPLE_NAV_LINKS.slice(2).map((link) => (
              <AppLink
                key={link.label}
                to={link.href}
                onClick={deferMobileNav(link.href)}
                className={mobileNavLinkClasses(isActive('blog'))}
              >
                {link.label}
              </AppLink>
            ))}
          </nav>

          <div className="flex shrink-0 flex-col gap-3 border-t border-hz-border px-4 pt-4 pb-4">
            {isAuthenticated ? (
              <div className="flex gap-2">
                <AppLink
                  to={routes.wishlist}
                  onClick={deferMobileNav(routes.wishlist)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-hz border border-hz-border py-[10px]',
                    'font-poppins text-[13px] font-medium text-hz-body no-underline',
                    'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  <Heart size={16} strokeWidth={1.75} />
                  Wishlist
                  {wishlistIds.length > 0 && (
                    <span className="font-semibold text-hz-primary">({wishlistIds.length})</span>
                  )}
                </AppLink>
                <AppLink
                  to={routes.compare}
                  onClick={deferMobileNav(routes.compare)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-hz border border-hz-border py-[10px]',
                    'font-poppins text-[13px] font-medium text-hz-body no-underline',
                    'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  <ArrowLeftRight size={16} strokeWidth={1.75} />
                  Compare
                  {compareCount > 0 && (
                    <span className="font-semibold text-hz-primary">({compareCount})</span>
                  )}
                </AppLink>
              </div>
            ) : null}
            <AppLink
              to={isAuthenticated ? routes.dashboard : routes.login}
              onClick={deferMobileNav(isAuthenticated ? routes.dashboard : routes.login)}
              className={cn(
                'w-full text-center no-underline rounded-hz border border-hz-border bg-transparent py-[10px]',
                'font-poppins text-[13px] font-medium text-hz-dark',
                'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
              )}
            >
              {accountLabel}
            </AppLink>
            <AppLink
              to={isAuthenticated ? routes.submitProperty : routes.login}
              state={isAuthenticated ? undefined : { from: routes.submitProperty }}
              onClick={deferMobileNav(isAuthenticated ? routes.submitProperty : routes.login)}
              className={cn(
                'w-full text-center no-underline rounded-hz border-none bg-hz-primary py-[10px]',
                'font-poppins text-[13px] font-semibold text-white',
                'transition-colors duration-200 hover:bg-hz-primary-hover'
              )}
            >
              Submit Property
            </AppLink>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
