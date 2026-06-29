import { useState } from 'react';
import { Menu, X, ChevronDown, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home',       href: '#',           active: true,  hasDropdown: false },
  { label: 'Listings',   href: '#listings',   active: false, hasDropdown: false },
  { label: 'Properties', href: '#properties', active: false, hasDropdown: true  },
  { label: 'Pages',      href: '#pages',      active: false, hasDropdown: true  },
  { label: 'Blog',       href: '#blog',       active: false, hasDropdown: false },
  { label: 'Dashboard',  href: '#dashboard',  active: false, hasDropdown: false },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-100 w-full bg-white font-poppins"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
    >
      {/* ── Main Bar ────────────────────────────────────── */}
      <div className="px-6 max-lg:px-10 max-md:px-5 h-[76px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 shrink-0 no-underline">
          <div className="w-[30px] h-[30px] bg-hz-primary rounded-[3px] flex items-center justify-center shrink-0">
            <Building2
              size={15}
              strokeWidth={2}
              className="text-white"
              aria-hidden="true"
            />
          </div>
          <span className="font-poppins font-bold text-[22px] text-hz-dark tracking-tight">
            Homzen
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'font-poppins flex items-center gap-0.5 text-[14px] font-medium',
                'transition-colors duration-200 no-underline',
                'text-hz-body hover:text-hz-primary',
                link.active && 'text-hz-dark underline underline-offset-4 decoration-hz-primary decoration-2'
              )}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            className={cn(
              'font-poppins font-medium text-[13px]',
              'border border-hz-border bg-transparent text-[#333333]',
              'px-5 py-[9px] rounded-[3px] cursor-pointer',
              'transition-colors duration-200',
              'hover:border-hz-primary hover:text-hz-primary'
            )}
          >
            Login / Register
          </button>
          <button
            className={cn(
              'font-poppins font-semibold text-[13px]',
              'bg-hz-primary hover:bg-hz-primary-hover text-white',
              'px-5 py-[9px] rounded-[3px] cursor-pointer border-none outline-none',
              'transition-colors duration-200'
            )}
          >
            Submit Property
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden text-hz-dark p-2 cursor-pointer bg-transparent border-none"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen
            ? <X size={22} strokeWidth={2} aria-hidden="true" />
            : <Menu size={22} strokeWidth={2} aria-hidden="true" />}
        </button>
      </div>

      {/* ── Mobile Dropdown ──────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden w-full bg-white border-t border-hz-border">
          <div className="px-5 md:px-10 pb-6 pt-2 flex flex-col">
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-poppins flex items-center justify-between py-3',
                    'text-[15px] font-medium no-underline',
                    'border-b border-[#F0F0F0]',
                    link.active
                      ? 'text-hz-dark underline underline-offset-4 decoration-hz-primary decoration-2'
                      : 'text-hz-body'
                  )}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-5">
              <button
                className={cn(
                  'font-poppins font-medium text-[13px]',
                  'border border-hz-border bg-transparent text-[#333333]',
                  'py-[10px] rounded-[3px] cursor-pointer w-full',
                  'transition-colors duration-200',
                  'hover:border-hz-primary hover:text-hz-primary'
                )}
              >
                Login / Register
              </button>
              <button
                className={cn(
                  'font-poppins font-semibold text-[13px]',
                  'bg-hz-primary hover:bg-hz-primary-hover text-white',
                  'py-[10px] rounded-[3px] cursor-pointer border-none w-full',
                  'transition-colors duration-200'
                )}
              >
                Submit Property
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
