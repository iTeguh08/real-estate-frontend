import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { cn } from '@/lib/utils';

type Side = 'left' | 'right';

interface SubtleLeftLightProps {
  /** Which edge the soft radial sits on. Default left (Expertise recipe). */
  side?: Side;
  /**
   * Strength of the glow.
   * - quiet: listings / dense UI (won't wash cards)
   * - default: Expertise-matched
   * - strong: dark #1D2A3A bands only
   */
  intensity?: 'quiet' | 'default' | 'strong';
  /** Use light ink wash for always-dark surfaces (footer / #1D2A3A). */
  onDark?: boolean;
  className?: string;
}

/**
 * @deprecated Prefer `SectionAtmosphere` for new work.
 * Thin wrapper kept for call sites that only need a single edge radial.
 */
export function SubtleLeftLight({
  side = 'left',
  intensity = 'default',
  onDark = false,
  className,
}: SubtleLeftLightProps) {
  return (
    <SectionAtmosphere
      tone={onDark ? 'dark' : 'light'}
      side={side}
      intensity={intensity}
      variant="edge"
      className={cn(className)}
    />
  );
}
