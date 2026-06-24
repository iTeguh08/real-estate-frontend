import { cn } from '@/lib/utils';

interface IllustrationProps {
  className?: string;
  strokeClassName?: string;
}

const stroke = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.15,
};

/** Architectural line-art — townhouse with roof, windows, door */
export function TownhouseIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        <path {...stroke} d="M44 14 L72 34 V74 H16 V34 Z" />
        <path {...stroke} d="M30 74 V52 H38 V74 M50 74 V52 H58 V74" />
        <path {...stroke} d="M38 52 H50" />
        <rect {...stroke} x="36" y="58" width="16" height="16" rx="1" />
        <path {...stroke} d="M26 42 H30 M58 42 H62 M26 50 H30 M58 50 H62" />
        <path {...stroke} d="M34 38 H40 M48 38 H54" />
        <path {...stroke} d="M20 74 H68" />
        <path {...stroke} d="M12 74 H76" strokeWidth={0.9} opacity={0.45} />
        <path {...stroke} d="M8 78 C16 74 24 76 32 74 S48 76 56 74 S72 76 80 78" strokeWidth={0.85} opacity={0.35} />
      </g>
    </svg>
  );
}

/** Villa — mature tree with layered canopy (reference motif) */
export function VillaIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        <path {...stroke} d="M44 74 V48" />
        <path {...stroke} d="M44 58 C36 54 30 48 28 40 C34 44 40 44 44 48 C48 44 54 44 60 40 C58 48 52 54 44 58 Z" />
        <path {...stroke} d="M44 50 C38 46 34 40 33 32 C38 36 42 38 44 42 C46 38 50 36 55 32 C54 40 50 46 44 50 Z" />
        <path {...stroke} d="M44 42 C40 38 38 32 38 26 C41 30 43 32 44 34 C45 32 47 30 50 26 C50 32 48 38 44 42 Z" />
        <path {...stroke} d="M36 74 H52" strokeWidth={0.9} />
        <path {...stroke} d="M18 74 H70" strokeWidth={0.85} opacity={0.4} />
        <path {...stroke} d="M24 68 C32 70 40 66 48 68 S64 70 72 66" strokeWidth={0.8} opacity={0.3} />
      </g>
    </svg>
  );
}

/** Apartment — multi-storey facade with balconies */
export function ApartmentIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        <rect {...stroke} x="22" y="16" width="44" height="58" rx="2" />
        <path {...stroke} d="M22 30 H66 M22 44 H66 M22 58 H66" strokeWidth={0.9} />
        <rect {...stroke} x="28" y="22" width="10" height="6" rx="0.5" />
        <rect {...stroke} x="50" y="22" width="10" height="6" rx="0.5" />
        <rect {...stroke} x="28" y="36" width="10" height="6" rx="0.5" />
        <rect {...stroke} x="50" y="36" width="10" height="6" rx="0.5" />
        <rect {...stroke} x="28" y="50" width="10" height="6" rx="0.5" />
        <rect {...stroke} x="50" y="50" width="10" height="6" rx="0.5" />
        <path {...stroke} d="M38 64 H50 V74 H38 Z" />
        <path {...stroke} d="M34 16 V10 H54 V16" />
        <path {...stroke} d="M16 74 H72" strokeWidth={0.85} opacity={0.4} />
      </g>
    </svg>
  );
}

/** Office — detailed briefcase */
export function OfficeIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        <rect {...stroke} x="18" y="30" width="52" height="38" rx="3" />
        <path {...stroke} d="M18 38 H70" strokeWidth={0.9} />
        <path {...stroke} d="M32 30 V22 C32 18 36 16 44 16 C52 16 56 18 56 22 V30" />
        <rect {...stroke} x="38" y="44" width="12" height="10" rx="1" />
        <path {...stroke} d="M44 44 V40" />
        <path {...stroke} d="M24 48 H30 M58 48 H64 M24 56 H30 M58 56 H64" strokeWidth={0.85} />
        <path {...stroke} d="M14 74 H74" strokeWidth={0.85} opacity={0.4} />
      </g>
    </svg>
  );
}

/** Commercial — storefront with awning */
export function CommercialIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        <path {...stroke} d="M16 36 L44 22 L72 36 V74 H16 Z" />
        <path {...stroke} d="M16 36 H72" />
        <path {...stroke} d="M22 36 V30 H30 V36 M38 36 V30 H46 V36 M54 36 V30 H62 V36" strokeWidth={0.9} />
        <rect {...stroke} x="24" y="48" width="18" height="26" rx="1" />
        <rect {...stroke} x="50" y="48" width="16" height="12" rx="1" />
        <path {...stroke} d="M50 64 H66 V74 H50 Z" />
        <path {...stroke} d="M30 58 H36" strokeWidth={0.85} />
        <circle {...stroke} cx="33" cy="66" r="1.2" fill="currentColor" stroke="none" className={cn('text-luxury-dark', strokeClassName)} />
        <path {...stroke} d="M12 74 H76" strokeWidth={0.85} opacity={0.4} />
      </g>
    </svg>
  );
}
