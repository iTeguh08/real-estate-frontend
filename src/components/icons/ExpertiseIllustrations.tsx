import { cn } from '@/lib/utils';

interface IllustrationProps {
  className?: string;
  strokeClassName?: string;
}

const base = {
  fill: 'none' as const,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.1,
};

/**
 * Each icon uses a padded 80×80 frame with a single centred subject
 * so strokes never crowd or overlap at small render sizes.
 */
export function BuyHomeIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" className={cn('h-full w-full', className)} aria-hidden="true">
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        {/* Roof */}
        <path {...base} d="M40 16 L60 32 H20 Z" />
        {/* Eaves */}
        <path {...base} d="M20 32 H60" strokeWidth={0.95} opacity={0.5} />
        {/* Main facade */}
        <path {...base} d="M22 32 H58 V58 H22 Z" />
        {/* Chimney — right roof slope */}
        <rect {...base} x="52" y="17" width="5" height="15" rx="0.5" />
        <path {...base} d="M51 17 H58" strokeWidth={1.05} />
        {/* Smoke wisps */}
        <path {...base} d="M54 14 C55 12 56 13 54.5 10 M56.5 13 C57.5 11 58.5 12 57 9" strokeWidth={0.85} opacity={0.4} />
        {/* Upper windows with cross mullions */}
        <rect {...base} x="26" y="36" width="9" height="9" rx="0.5" />
        <path {...base} d="M30.5 36 V45 M26 40.5 H35" strokeWidth={0.85} opacity={0.55} />
        <rect {...base} x="45" y="36" width="9" height="9" rx="0.5" />
        <path {...base} d="M49.5 36 V45 M45 40.5 H54" strokeWidth={0.85} opacity={0.55} />
        {/* Porch lintel */}
        <path {...base} d="M30 48 H50" strokeWidth={0.95} />
        {/* Porch columns */}
        <path {...base} d="M32 48 V56 M48 48 V56" strokeWidth={0.95} opacity={0.7} />
        {/* Front door */}
        <path {...base} d="M36 55 V49 H44 V55" />
        <circle {...base} cx="42" cy="52" r="0.8" fill="currentColor" stroke="none" className={cn('text-luxury-dark', strokeClassName)} />
        {/* Porch deck */}
        <path {...base} d="M32 56 H48" strokeWidth={0.85} opacity={0.45} />
        {/* Side shrubs — light sketch accents */}
        <path {...base} d="M16 58 C18 54 20 56 22 58 M58 58 C60 55 62 57 64 58" strokeWidth={0.9} opacity={0.35} />
        {/* Ground */}
        <path {...base} d="M14 58 H66" strokeWidth={0.9} opacity={0.35} />
      </g>
    </svg>
  );
}

export function RentHomeIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" className={cn('h-full w-full', className)} aria-hidden="true">
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        {/* Building shell */}
        <rect {...base} x="24" y="22" width="32" height="36" rx="1.5" />
        {/* Floor divisions */}
        <path {...base} d="M24 34 H56 M24 46 H56" strokeWidth={0.95} opacity={0.55} />
        {/* Window grid — evenly spaced */}
        <rect {...base} x="28" y="26" width="6" height="5" rx="0.5" />
        <rect {...base} x="46" y="26" width="6" height="5" rx="0.5" />
        <rect {...base} x="28" y="38" width="6" height="5" rx="0.5" />
        <rect {...base} x="46" y="38" width="6" height="5" rx="0.5" />
        {/* Entrance */}
        <path {...base} d="M35 58 V50 H45 V58" />
        {/* Ground */}
        <path {...base} d="M16 58 H64" strokeWidth={0.9} opacity={0.35} />
      </g>
    </svg>
  );
}

export function SellHomeIllustration({ className, strokeClassName }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 80" className={cn('h-full w-full', className)} aria-hidden="true">
      <g className={cn('stroke-luxury-dark', strokeClassName)}>
        {/* Document */}
        <rect {...base} x="22" y="18" width="36" height="44" rx="2" />
        {/* Folded corner */}
        <path {...base} d="M50 18 L58 26 V18 Z" strokeWidth={1} />
        {/* Text lines */}
        <path {...base} d="M28 30 H52 M28 38 H48 M28 46 H44" strokeWidth={0.9} opacity={0.6} />
        {/* Signature */}
        <path
          {...base}
          d="M28 54 C32 50 34 58 38 54 S44 50 48 54"
          strokeWidth={1.15}
        />
        {/* Small house stamp — bottom-right, inside margin */}
        <path {...base} d="M46 48 L52 52 V58 H40 V52 Z" strokeWidth={0.95} />
        <path {...base} d="M44 58 H56" strokeWidth={0.85} opacity={0.35} />
      </g>
    </svg>
  );
}
