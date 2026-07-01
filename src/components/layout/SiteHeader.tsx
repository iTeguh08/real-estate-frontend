import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Building2, ChevronDown, Heart, ArrowLeftRight } from 'lucide-react';
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
import { routes } from '@/lib/routes';
import type { PropertyStatus, PropertyType } from '@/types';

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
    'border-b border-[#F0F0F0] py-3 font-poppins text-[15px] font-medium no-underline',
    isActive
      ? 'text-hz-dark underline decoration-hz-primary decoration-2 underline-offset-4'
      : 'text-hz-body'
  );
}

function NavDropdownPanel({ groups }: { groups: NavLinkGroup[] }) {
  const navigate = useNavigate();
  const { applyNavFilter } = useListingFilters();
  const { checkNavItem } = useActiveNav();

  const handleNavClick = (label: string, href: string) => {
    const mapping = PROPERTY_NAV_FILTER_MAP[label];
    if (mapping) {
      applyNavFilter({
        propertyType: (mapping.propertyType as PropertyType | undefined) ?? '',
        status: (mapping.status as PropertyStatus | undefined) ?? '',
      });
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
          <p className="mb-3 font-poppins text-[11px] font-semibold uppercase tracking-[1.5px] text-hz-primary">
            {group.title}
          </p>
          <ul className="space-y-0.5">
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
                      'block w-full rounded-hz px-2.5 py-2 no-underline transition-colors duration-200',
                      'hover:bg-[#F8F8F8] hover:text-hz-primary'
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
  onNavigate: () => void;
  isSectionActive?: boolean;
}) {
  const navigate = useNavigate();
  const { applyNavFilter } = useListingFilters();
  const { checkNavItem } = useActiveNav();

  return (
    <div className="border-b border-[#F0F0F0]">
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
        <div className="pb-3 pl-2 space-y-4">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mb-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-hz-primary">
                {group.title}
              </p>
              <ul className="space-y-1">
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
                          applyNavFilter({
                            propertyType: (mapping.propertyType as PropertyType | undefined) ?? '',
                            status: (mapping.status as PropertyStatus | undefined) ?? '',
                          });
                          onNavigate();
                          return;
                        }
                        if (item.href.startsWith('#')) {
                          navigate({ pathname: routes.home, hash: item.href });
                        } else {
                          navigate(item.href);
                        }
                        onNavigate();
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

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'properties' | 'pages' | null>(null);
  const { wishlistIds } = useWishlist();
  const { compareCount } = useCompare();
  const { isActive } = useActiveNav();

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <header className="sticky top-0 z-100 w-full bg-white font-poppins shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      <div className="flex h-[76px] items-center justify-between px-6 max-md:px-5 max-lg:px-10 3xl:px-16">
        <Link to={routes.home} className="flex shrink-0 items-center gap-1.5 no-underline">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-hz bg-hz-primary">
            <Building2 size={15} strokeWidth={2} className="text-white" aria-hidden="true" />
          </div>
          <span className="font-poppins text-[22px] font-bold tracking-tight text-hz-dark">
            {SITE_CONFIG.brand}
          </span>
        </Link>

        <NavigationMenu
          viewport={false}
          className="hidden max-w-none flex-1 justify-center lg:flex"
        >
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to={routes.home} className={navLinkClasses(isActive('home'))}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerClasses(isActive('properties'))}>
                Properties
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-auto -translate-x-1/2 rounded-hz border-[0.5px] border-[#E5E5E5] bg-white p-0 shadow-none ring-0 outline-none">
                <NavDropdownPanel groups={PROPERTIES_NAV_GROUPS} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to={{ pathname: routes.home, hash: '#listings' }}
                  className={navLinkClasses(isActive('listings'))}
                >
                  Listings
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerClasses(isActive('pages'))}>
                Pages
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 w-auto -translate-x-1/2 rounded-hz border-[0.5px] border-[#E5E5E5] bg-white p-0 shadow-none ring-0 outline-none">
                <NavDropdownPanel groups={PAGES_NAV_GROUPS} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            {SIMPLE_NAV_LINKS.slice(2).map((link) => {
              const key = link.label.toLowerCase() as 'blog' | 'dashboard';
              return (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild>
                  <Link to={link.href} className={navLinkClasses(isActive(key))}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
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
          </Link>
          <Link
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
          </Link>
          <Link
            to={routes.login}
            className={cn(
              'no-underline rounded-hz border border-hz-border bg-transparent px-5 py-[9px]',
              'font-poppins text-[13px] font-medium text-[#333333]',
              'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
            )}
          >
            Login / Register
          </Link>
          <Link
            to={routes.submitProperty}
            className={cn(
              'no-underline rounded-hz border-none bg-hz-primary px-5 py-[9px] outline-none',
              'font-poppins text-[13px] font-semibold text-white',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
          >
            Submit Property
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="border-none bg-transparent p-2 text-hz-dark lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full font-poppins sm:max-w-sm" showCloseButton>
          <SheetHeader>
            <SheetTitle className="font-poppins text-lg font-semibold text-hz-dark">
              Menu
            </SheetTitle>
          </SheetHeader>

          <nav aria-label="Mobile navigation" className="flex flex-col px-4">
            <Link
              to={routes.home}
              onClick={closeMobile}
              className={mobileNavLinkClasses(isActive('home'))}
            >
              Home
            </Link>

            <MobileNavGroup
              title="Properties"
              groups={PROPERTIES_NAV_GROUPS}
              isOpen={mobileExpanded === 'properties'}
              isSectionActive={isActive('properties')}
              onToggle={() =>
                setMobileExpanded((prev) => (prev === 'properties' ? null : 'properties'))
              }
              onNavigate={closeMobile}
            />

            <Link
              to={{ pathname: routes.home, hash: '#listings' }}
              onClick={closeMobile}
              className={mobileNavLinkClasses(isActive('listings'))}
            >
              Listings
            </Link>

            <MobileNavGroup
              title="Pages"
              groups={PAGES_NAV_GROUPS}
              isOpen={mobileExpanded === 'pages'}
              isSectionActive={isActive('pages')}
              onToggle={() => setMobileExpanded((prev) => (prev === 'pages' ? null : 'pages'))}
              onNavigate={closeMobile}
            />

            {SIMPLE_NAV_LINKS.slice(2).map((link) => {
              const key = link.label.toLowerCase() as 'blog' | 'dashboard';
              return (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMobile}
                className={mobileNavLinkClasses(isActive(key))}
              >
                {link.label}
              </Link>
            );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-3 px-4 pb-4">
            <div className="flex gap-2">
              <Link
                to={routes.wishlist}
                onClick={closeMobile}
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
              </Link>
              <Link
                to={routes.compare}
                onClick={closeMobile}
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
              </Link>
            </div>
            <Link
              to={routes.login}
              onClick={closeMobile}
              className={cn(
                'w-full text-center no-underline rounded-hz border border-hz-border bg-transparent py-[10px]',
                'font-poppins text-[13px] font-medium text-[#333333]',
                'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
              )}
            >
              Login / Register
            </Link>
            <Link
              to={routes.submitProperty}
              onClick={closeMobile}
              className={cn(
                'w-full text-center no-underline rounded-hz border-none bg-hz-primary py-[10px]',
                'font-poppins text-[13px] font-semibold text-white',
                'transition-colors duration-200 hover:bg-hz-primary-hover'
              )}
            >
              Submit Property
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
