import { useState } from 'react';
import { Menu, X, Search, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { luxuryButton, navLink } from '@/lib/cva';

const NAV_LINKS = [
  { label: 'Home', href: '#', active: true },
  { label: 'Listings', href: '#listings', active: false },
  { label: 'Properties', href: '#properties', active: false },
  { label: 'Agents', href: '#agents', active: false },
  { label: 'Blog', href: '#blog', active: false },
  { label: 'Dashboard', href: '#dashboard', active: false },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-[--color-luxury-border]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-[22px] font-medium tracking-tight text-[--color-luxury-dark]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Homeya
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(navLink({ active: link.active }))}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button className={cn(navLink({ active: false }), 'flex items-center gap-1.5')}>
            <Search size={15} strokeWidth={1.5} />
            <span>Search</span>
          </button>
          <a href="#login" className={cn(navLink({ active: false }))}>
            Login / Register
          </a>
          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'crimson', size: 'md' }))}
            aria-label="Contact us"
          >
            <Phone size={14} strokeWidth={1.5} />
            Contact
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-white flex flex-col pt-12 gap-6"
          >
            <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    navLink({ active: link.active }),
                    'text-base'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-[--color-luxury-border] pt-6 flex flex-col gap-3">
              <a href="#login" className={cn(navLink({ active: false }), 'text-sm')}>
                Login / Register
              </a>
              <Button
                variant="ghost"
                className={cn(luxuryButton({ variant: 'crimson', size: 'md' }), 'w-full justify-center')}
              >
                Contact Us
              </Button>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}
