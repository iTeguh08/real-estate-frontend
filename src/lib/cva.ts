import { cva, type VariantProps } from 'class-variance-authority';

// ─── Luxury Button ──────────────────────────────────────────────────────────
// Wraps shadcn Button with the design system's brand variants.
export const luxuryButton = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-sans font-medium tracking-wide',
    'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
    'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.97]',
  ],
  {
    variants: {
      variant: {
        crimson:
          'bg-luxury-crimson text-white rounded-sm hover:bg-luxury-crimson-hover hover:text-white',
        ghost:
          'bg-transparent text-luxury-dark hover:bg-luxury-dark/6 rounded-sm',
        outline:
          'border border-luxury-dark/20 bg-white text-luxury-dark rounded-sm hover:bg-luxury-dark hover:text-white',
        'outline-crimson':
          'border border-luxury-crimson text-luxury-crimson rounded-sm hover:bg-luxury-crimson hover:text-white',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'crimson', size: 'md' },
  }
);

export type LuxuryButtonVariants = VariantProps<typeof luxuryButton>;

// ─── Property Card ──────────────────────────────────────────────────────────
// Core card shell used in FeaturedProperties and BestPropertyValue grids.
export const propertyCard = cva(
  [
    'group relative overflow-hidden bg-white',
    'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        grid: 'rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1',
        list: 'rounded-xl shadow-sm hover:shadow-md flex flex-row',
        featured: 'rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1',
      },
      size: {
        sm: 'max-w-[260px]',
        md: 'max-w-[340px]',
        lg: 'max-w-[400px]',
        full: 'w-full',
      },
    },
    defaultVariants: { variant: 'grid', size: 'full' },
  }
);

export type PropertyCardVariants = VariantProps<typeof propertyCard>;

// ─── Property Status Badge ──────────────────────────────────────────────────
export const statusBadge = cva(
  'inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans font-medium tracking-wide uppercase rounded-[3px]',
  {
    variants: {
      status: {
        'For Sale': 'bg-luxury-crimson text-white',
        'For Rent': 'bg-luxury-dark text-white',
        'Off Plan': 'bg-amber-600 text-white',
        Sold: 'bg-gray-400 text-white',
      },
      position: {
        overlay: 'absolute top-3 left-3 z-10',
        inline: 'relative',
      },
    },
    defaultVariants: { status: 'For Sale', position: 'overlay' },
  }
);

export type StatusBadgeVariants = VariantProps<typeof statusBadge>;

// ─── "New" listing badge ────────────────────────────────────────────────────
// Frosted ivory pill — distinct from status badges without loud amber/yellow.
export const newBadge = cva(
  'inline-flex items-center justify-center px-2.5 py-1 font-sans text-[10px] font-semibold uppercase leading-none tracking-[0.14em] rounded-[3px] bg-white/95 text-luxury-crimson shadow-sm ring-1 ring-white/40 backdrop-blur-sm'
);

export type NewBadgeVariants = VariantProps<typeof newBadge>;

// ─── Section Wrapper ────────────────────────────────────────────────────────
// Consistent vertical padding and max-width container for all page sections.
export const section = cva('w-full', {
  variants: {
    spacing: {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24',
      lg: 'py-24 md:py-32',
    },
    bg: {
      cream: 'bg-[--color-luxury-cream]',
      white: 'bg-white',
      dark: 'bg-[--color-luxury-dark] text-white',
    },
  },
  defaultVariants: { spacing: 'md', bg: 'cream' },
});

export type SectionVariants = VariantProps<typeof section>;

// ─── Section Eyebrow ────────────────────────────────────────────────────────
// Matches primary button accent (luxury-crimson).
export const sectionEyebrow = cva(
  'font-sans text-xs font-medium uppercase tracking-[0.18em] text-luxury-crimson'
);

export type SectionEyebrowVariants = VariantProps<typeof sectionEyebrow>;

// ─── Nav Link ───────────────────────────────────────────────────────────────
export const navLink = cva(
  [
    'font-sans text-sm tracking-wide',
    'transition-colors duration-200',
    'cursor-pointer',
  ],
  {
    variants: {
      active: {
        true: 'text-[--color-luxury-crimson] font-medium',
        false: 'text-[--color-luxury-dark]/70 hover:text-[--color-luxury-dark]',
      },
    },
    defaultVariants: { active: false },
  }
);

export type NavLinkVariants = VariantProps<typeof navLink>;

// ─── Filter Tab ─────────────────────────────────────────────────────────────
export const filterTab = cva(
  [
    'relative -mb-px border-b-2 border-transparent px-5 py-3.5',
    'text-sm font-sans font-medium',
    'transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]',
    'cursor-pointer select-none',
  ],
  {
    variants: {
      active: {
        true: 'border-luxury-crimson text-luxury-crimson',
        false: 'text-luxury-muted hover:text-luxury-dark',
      },
    },
    defaultVariants: { active: false },
  }
);

export type FilterTabVariants = VariantProps<typeof filterTab>;
