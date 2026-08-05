import type { CSSProperties } from 'react';
import { MediaImage } from '@/components/ui/media-image';
import { cn } from '@/lib/utils';
import { publicAsset } from '@/lib/public-asset';

type Side = 'left' | 'right';
type Intensity = 'quiet' | 'default' | 'strong';
type Tone = 'dark' | 'light' | 'soft';
type Surface = 'footer' | 'deep' | 'page' | 'elevated' | 'sunken' | 'listings';
/** Light-surface glow hue — `sky` for soft bright blue (e.g. Expertise light theme). */
type LightGlow = 'white' | 'sky';

/** Photographic atmospheres in `public/bg/`. */
export type AtmosphereImage =
  | 'architecture'
  | 'architecture-city'
  | 'interior-dark'
  | 'soft-left'
  | 'aerial'
  | 'interior-light'
  | 'location-light'
  | 'location-edge'
  | 'location-edge-dark'
  | 'property'
  | 'listings-property'
  | 'footer-edge'
  | 'best-value'
  | 'agents-plants'
  | 'related-plants'
  | 'auto'
  | 'none';

interface SectionAtmosphereProps {
  /** Surface the decor sits on. `dark` = always-dark bands (#1D2A3A / footer). */
  tone?: Tone;
  /** Match parent section fill so the photo scrim blends correctly. */
  surface?: Surface;
  /** Which edge carries the primary soft light / image weight. */
  side?: Side;
  intensity?: Intensity;
  /**
   * dual: edge light + opposite wash + accent orb.
   * edge: single radial + image.
   * ambient: soft vignette + dual corners (wide empty sections).
   */
  variant?: 'edge' | 'dual' | 'ambient';
  /**
   * Background photograph (not only gradients).
   * `auto` picks a default for the tone; `none` disables the photo layer.
   */
  image?: AtmosphereImage;
  /** Override photo opacity (0–1). When set, ignores intensity-based opacity. */
  photoOpacity?: number;
  /** Override page scrim strength (0–100). Lower = photo reads more clearly on light surfaces. */
  photoScrimMix?: number;
  /**
   * How the photo dissolves at vertical edges.
   * `exit-soft`: earlier bottom fade — smoother handoff into the next same-surface section.
   * `hold`: keep the bottom opaque — for footers / glass bars that sit over the photo.
   */
  photoFade?: 'balanced' | 'exit-soft' | 'hold';
  /** Light / soft tone only: white glow (default) or soft sky-blue wash. */
  lightGlow?: LightGlow;
  /** Radial glow washes (default) or tiled line-pattern image overlay. */
  washStyle?: 'gradient' | 'pattern';
  /** Pin decor to viewport height — sticks while section content scrolls (use grid stack on parent). */
  stickyViewport?: boolean;
  className?: string;
}

const IMAGE_FILES: Record<Exclude<AtmosphereImage, 'auto' | 'none'>, string> = {
  architecture: 'bg/bg-dark-architecture-dusk.webp',
  'architecture-city': 'bg/bg-dark-architecture-city.webp',
  'interior-dark': 'bg/bg-dark-interior-abstract.webp',
  'soft-left': 'bg/bg-dark-soft-left-light.webp',
  aerial: 'bg/bg-light-aerial-soft.webp',
  'interior-light': 'bg/bg-light-interior-air-v2.webp',
  'location-light': 'bg/bg-light-location-atmosphere-v4.webp',
  'location-edge': 'bg/bg-light-location-edge-v5.webp',
  'location-edge-dark': 'bg/bg-dark-location-edge-v1.webp',
  property: 'bg/bg-hero-left-property-v1.webp',
  'listings-property': 'bg/bg-light-listings-interior-v3.webp',
  'footer-edge': 'bg/bg-light-footer-edge-v3.webp',
  'best-value': 'bg/bg-light-best-value-edges-v2.webp',
  'agents-plants': 'bg/bg-light-agents-plants-v1.webp',
  'related-plants': 'bg/bg-light-related-plants.webp',
};

function resolveImage(tone: Tone, image: AtmosphereImage): Exclude<AtmosphereImage, 'auto'> {
  if (image !== 'auto') return image;
  if (tone === 'dark') return 'architecture';
  if (tone === 'soft') return 'interior-light';
  return 'aerial';
}

function imageOpacity(tone: Tone, intensity: Intensity): number {
  if (tone === 'dark') {
    return intensity === 'quiet' ? 0.45 : intensity === 'strong' ? 0.75 : 0.6;
  }
  // Light surfaces: keep photo visibly soft (low opacity), not buried under scrim
  return intensity === 'quiet' ? 0.14 : intensity === 'strong' ? 0.28 : 0.2;
}

/** Soft bright sky-blue for light-surface radial washes. */
const SKY_GLOW = 'oklch(0.74 0.16 235)';
const SKY_GLOW_SOFT = 'oklch(0.86 0.11 240)';

function lightWashColor(
  lightGlow: LightGlow,
  kind: 'edge' | 'opposite' | 'accent' | 'ambient',
  intensity: Intensity,
  edgeStrength: number
): string {
  if (lightGlow === 'sky') {
    switch (kind) {
      case 'edge':
        return `color-mix(in oklch, ${SKY_GLOW} ${Math.min(42, Math.round(edgeStrength * 145))}%, transparent)`;
      case 'opposite':
        return `color-mix(in oklch, ${SKY_GLOW} ${intensity === 'quiet' ? 20 : intensity === 'strong' ? 38 : 32}%, transparent)`;
      case 'accent':
        return `color-mix(in oklch, ${SKY_GLOW_SOFT} ${intensity === 'strong' ? 34 : 28}%, transparent)`;
      case 'ambient':
        return `color-mix(in oklch, ${SKY_GLOW_SOFT} ${intensity === 'strong' ? 32 : 26}%, transparent)`;
    }
  }

  switch (kind) {
    case 'edge':
      return `color-mix(in oklch, white ${Math.round(edgeStrength * 100)}%, transparent)`;
    case 'opposite':
      return `color-mix(in oklch, white ${intensity === 'quiet' ? 12 : intensity === 'strong' ? 28 : 20}%, transparent)`;
    case 'accent':
      return `color-mix(in oklch, white ${intensity === 'strong' ? 22 : 14}%, transparent)`;
    case 'ambient':
      return `color-mix(in oklch, white ${intensity === 'strong' ? 24 : 14}%, transparent)`;
  }
}

const PATTERN_FILES = {
  'light-sky': 'bg/bg-pattern-wash-light.webp',
  'light-white': 'bg/bg-pattern-wash-light.webp',
  dark: 'bg/bg-pattern-wash-dark.webp',
  soft: 'bg/bg-pattern-wash-light.webp',
} as const;

function resolvePattern(tone: Tone, lightGlow: LightGlow): string {
  if (tone === 'dark') return publicAsset(PATTERN_FILES.dark);
  if (tone === 'soft') return publicAsset(PATTERN_FILES.soft);
  return publicAsset(
    lightGlow === 'sky' ? PATTERN_FILES['light-sky'] : PATTERN_FILES['light-white']
  );
}

function isCoverPattern(src: string): boolean {
  return /\.(png|webp|jpe?g)(\?|$)/i.test(src);
}

function patternOpacity(intensity: Intensity, cover: boolean, isDark = false): number {
  if (cover) {
    if (isDark) {
      return intensity === 'quiet' ? 0.36 : intensity === 'strong' ? 0.62 : 0.48;
    }
    return intensity === 'quiet' ? 0.45 : intensity === 'strong' ? 0.78 : 0.62;
  }
  return intensity === 'quiet' ? 0.55 : intensity === 'strong' ? 0.92 : 0.75;
}

function patternLayerStyle(
  src: string,
  intensity: Intensity,
  side: Side,
  isDark = false,
  tile = 96
): CSSProperties {
  const cover = isCoverPattern(src);
  const opacity = patternOpacity(intensity, cover, isDark);

  if (cover) {
    return {
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: side === 'left' ? 'left center' : 'right center',
      opacity,
    };
  }

  return {
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'repeat',
    backgroundSize: `${tile}px ${tile}px`,
    opacity,
  };
}

/**
 * Decorative depth for sections — real background photographs + soft light washes.
 * Default: parent `relative`, decor `absolute inset-0`, content `relative z-10`.
 * Sticky: parent `grid grid-cols-1`, decor + content both `col-start-1 row-start-1`.
 */
export function SectionAtmosphere({
  tone = 'light',
  surface,
  side = 'left',
  intensity = 'default',
  variant = 'dual',
  image = 'auto',
  photoOpacity: photoOpacityProp,
  photoScrimMix: photoScrimMixProp,
  photoFade = 'balanced',
  lightGlow = 'white',
  washStyle = 'gradient',
  stickyViewport = false,
  className,
}: SectionAtmosphereProps) {
  const isDark = tone === 'dark';
  const resolvedSurface: Surface =
    surface ?? (isDark ? 'footer' : tone === 'soft' ? 'elevated' : 'sunken');
  const primaryEdge = side === 'left' ? 'left' : 'right';
  const oppositeEdge = side === 'left' ? 'right' : 'left';
  const resolvedImage = resolveImage(tone, image);
  const isRelatedPlants = resolvedImage === 'related-plants';
  const isBareLocationPhoto = resolvedImage === 'location-light' && !isDark;
  const photoSrc =
    resolvedImage === 'none' ? null : publicAsset(IMAGE_FILES[resolvedImage]);
  const photoOpacity = photoOpacityProp ?? imageOpacity(tone, intensity);

  const photoMask = isBareLocationPhoto
    ? 'linear-gradient(to right, transparent 0%, black 22%, black 100%)'
    : isRelatedPlants
      ? side === 'left'
        ? 'linear-gradient(to right, black 0%, black 52%, transparent 92%)'
        : 'linear-gradient(to left, black 0%, black 52%, transparent 92%)'
      : photoFade === 'hold'
      ? 'linear-gradient(to bottom, transparent 0%, black 14%, black 100%)'
      : photoFade === 'exit-soft'
        ? 'linear-gradient(to bottom, transparent 0%, black 14%, black 58%, transparent 92%)'
        : 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)';
  const scrimMask = isBareLocationPhoto
    ? 'linear-gradient(to right, transparent 0%, black 18%, black 100%)'
    : isRelatedPlants
      ? side === 'left'
        ? 'linear-gradient(to right, black 0%, black 38%, transparent 90%)'
        : 'linear-gradient(to left, black 0%, black 38%, transparent 90%)'
      : photoFade === 'hold'
      ? 'linear-gradient(to bottom, transparent 0%, black 12%, black 100%)'
      : photoFade === 'exit-soft'
        ? 'linear-gradient(to bottom, transparent 0%, black 12%, black 62%, transparent 94%)'
        : 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)';

  const edgeStrength =
    intensity === 'quiet'
      ? isDark
        ? 0.08
        : 0.16
      : intensity === 'strong'
        ? isDark
          ? 0.16
          : 0.38
        : isDark
          ? 0.12
          : 0.26;

  const edgeColor = isDark
    ? `color-mix(in oklch, var(--hz-footer-fg) ${Math.round(edgeStrength * 100)}%, transparent)`
    : tone === 'soft'
      ? `color-mix(in oklch, var(--hz-primary) ${Math.round(edgeStrength * 40)}%, transparent)`
      : lightWashColor(lightGlow, 'edge', intensity, edgeStrength);

  const oppositeColor = isDark
    ? `color-mix(in oklch, oklch(0.55 0.09 250) ${intensity === 'strong' ? 12 : 8}%, transparent)`
    : tone === 'soft'
      ? `color-mix(in oklch, var(--hz-primary) ${intensity === 'quiet' ? 3 : 5}%, transparent)`
      : lightWashColor(lightGlow, 'opposite', intensity, edgeStrength);

  const accentOrb = isDark
    ? `radial-gradient(circle at ${oppositeEdge === 'right' ? '88% 78%' : '12% 78%'}, color-mix(in oklch, var(--hz-primary) ${intensity === 'strong' ? 16 : 10}%, transparent), transparent 55%)`
    : tone === 'soft'
      ? `radial-gradient(circle at ${oppositeEdge === 'right' ? '92% 18%' : '8% 18%'}, color-mix(in oklch, var(--hz-primary) 4%, transparent), transparent 50%)`
      : `radial-gradient(circle at ${oppositeEdge === 'right' ? '92% 18%' : '8% 18%'}, ${lightWashColor(lightGlow, 'accent', intensity, edgeStrength)}, transparent 55%)`;

  const patternSrc = washStyle === 'pattern' ? resolvePattern(tone, lightGlow) : null;
  const patternCover = patternSrc ? isCoverPattern(patternSrc) : false;
  /** Pattern-only + cover + quiet: skip extra radial layers (Featured Listings). */
  const leanPattern =
    !photoSrc && washStyle === 'pattern' && patternCover && intensity === 'quiet';
  const showOpposite = !leanPattern && (variant === 'dual' || variant === 'ambient');
  const showAccent = !leanPattern && (variant === 'dual' || variant === 'ambient');
  const showAmbient = variant === 'ambient';

  const objectPosition =
    resolvedImage === 'soft-left'
      ? 'left center'
      : resolvedImage === 'related-plants'
        ? side === 'left'
          ? 'left bottom'
          : 'right bottom'
        : resolvedImage === 'location-light'
          ? 'center center'
          : side === 'right'
            ? '70% center'
            : '30% center';

  const SCRIM_VAR: Record<Surface, string> = {
    footer: 'var(--hz-footer)',
    deep: 'var(--hz-deep)',
    page: 'var(--hz-page)',
    elevated: 'var(--hz-elevated)',
    sunken: 'var(--hz-sunken)',
    listings: 'var(--hz-listings)',
  };
  const scrimMix =
    isBareLocationPhoto
      ? 0
      : photoScrimMixProp ??
        (isDark
          ? intensity === 'strong'
            ? 68
            : 74
          : intensity === 'quiet'
            ? 62
            : intensity === 'strong'
              ? 70
              : 66);

  return (
    <div
      className={cn(
        'pointer-events-none z-0 overflow-hidden',
        stickyViewport
          ? 'sticky top-0 col-start-1 row-start-1 h-dvh w-full self-start'
          : 'absolute inset-0',
        className
      )}
      // Promote the pinned atmosphere to its own compositor layer so the browser
      // rasterizes the masked/gradient stack once and merely repositions it while
      // scrolling, instead of recompositing every masked layer on each frame.
      style={
        stickyViewport
          ? {
              transform: 'translateZ(0)',
              willChange: 'transform',
              contain: 'layout style paint',
            }
          : undefined
      }
      aria-hidden="true"
    >
      {photoSrc ? (
        <>
          <MediaImage
            src={photoSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="object-cover"
            wrapperClassName={cn(
              'absolute inset-0',
              isRelatedPlants &&
                (side === 'left'
                  ? 'bottom-0 left-0 top-auto h-[76%] w-[46%] right-auto'
                  : 'bottom-0 right-0 top-auto h-[76%] w-[46%] left-auto')
            )}
            style={{
              objectPosition,
              opacity: photoOpacity,
              WebkitMaskImage: photoMask,
              maskImage: photoMask,
              ...(isRelatedPlants
                ? {
                    transform: 'scale(1)',
                    transformOrigin: side === 'left' ? 'left bottom' : 'right bottom',
                  }
                : {}),
            }}
          />
          <div
            className="absolute inset-0"
            style={
              scrimMix > 0
                ? {
                    background: `color-mix(in srgb, ${SCRIM_VAR[resolvedSurface]} ${scrimMix}%, transparent)`,
                    WebkitMaskImage: scrimMask,
                    maskImage: scrimMask,
                  }
                : undefined
            }
          />
          <div
            className="absolute inset-0"
            style={
              isDark
                ? {
                    background: `linear-gradient(to top, color-mix(in srgb, ${SCRIM_VAR[resolvedSurface]} 40%, transparent), transparent 50%, color-mix(in srgb, ${SCRIM_VAR[resolvedSurface]} 25%, transparent))`,
                  }
                : undefined
            }
          />
          {!isDark && !isBareLocationPhoto ? (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/[0.02]" />
          ) : null}
        </>
      ) : null}

      {!isBareLocationPhoto ? (
      <div
        className={cn(
          'absolute inset-y-0 hidden md:block',
          patternCover ? 'inset-x-0 w-full' : 'w-[48%]',
          !patternCover && intensity === 'strong' && 'w-[56%]',
          !patternCover && intensity === 'quiet' && 'w-[38%]',
          !patternCover && (primaryEdge === 'left' ? 'left-0' : 'right-0')
        )}
        style={
          washStyle === 'pattern' && patternSrc
            ? {
                ...patternLayerStyle(patternSrc, intensity, side, isDark),
                WebkitMaskImage: patternCover
                  ? isDark
                    ? `linear-gradient(to ${oppositeEdge}, black 0%, black 38%, transparent 82%)`
                    : `linear-gradient(to ${oppositeEdge}, black 0%, black 42%, transparent 88%)`
                  : `radial-gradient(ellipse at ${primaryEdge}, black 0%, transparent 68%)`,
                maskImage: patternCover
                  ? isDark
                    ? `linear-gradient(to ${oppositeEdge}, black 0%, black 38%, transparent 82%)`
                    : `linear-gradient(to ${oppositeEdge}, black 0%, black 42%, transparent 88%)`
                  : `radial-gradient(ellipse at ${primaryEdge}, black 0%, transparent 68%)`,
              }
            : {
                background: `radial-gradient(ellipse at ${primaryEdge}, ${edgeColor}, transparent 68%)`,
              }
        }
      />
      ) : null}

      {showOpposite ? (
        <div
          className={cn(
            'absolute inset-y-0 hidden w-[36%] md:block',
            oppositeEdge === 'left' ? 'left-0' : 'right-0'
          )}
          style={
            washStyle === 'pattern' && patternSrc && !patternCover
              ? {
                  ...patternLayerStyle(patternSrc, intensity, side, isDark, 88),
                  WebkitMaskImage: `radial-gradient(ellipse at ${oppositeEdge}, black 0%, transparent 70%)`,
                  maskImage: `radial-gradient(ellipse at ${oppositeEdge}, black 0%, transparent 70%)`,
                }
              : {
                  background: `radial-gradient(ellipse at ${oppositeEdge}, ${oppositeColor}, transparent 70%)`,
                }
          }
        />
      ) : null}

      {showAccent ? (
        <div
          className="absolute inset-0 hidden md:block"
          style={
            washStyle === 'pattern' && patternSrc && !patternCover
              ? {
                  ...patternLayerStyle(patternSrc, intensity, side, isDark, 72),
                  WebkitMaskImage: `radial-gradient(circle at ${oppositeEdge === 'right' ? '88% 78%' : '12% 78%'}, black 0%, transparent 55%)`,
                  maskImage: `radial-gradient(circle at ${oppositeEdge === 'right' ? '88% 78%' : '12% 78%'}, black 0%, transparent 55%)`,
                }
              : { background: accentOrb }
          }
        />
      ) : null}

      {showAmbient ? (
        <div
          className="absolute inset-0 hidden md:block"
          style={
            washStyle === 'pattern' && patternSrc && !patternCover
              ? {
                  ...patternLayerStyle(patternSrc, intensity, side, isDark, 104),
                  WebkitMaskImage:
                    'radial-gradient(ellipse at 50% 0%, black 0%, black 28%, transparent 55%)',
                  maskImage:
                    'radial-gradient(ellipse at 50% 0%, black 0%, black 28%, transparent 55%)',
                }
              : {
                  background: isDark
                    ? 'radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--hz-footer-fg) 6%, transparent), transparent 55%)'
                    : tone === 'soft'
                      ? `radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--hz-primary) 4%, transparent), transparent 55%)`
                      : `radial-gradient(ellipse at 50% 0%, ${lightWashColor(lightGlow, 'ambient', intensity, edgeStrength)}, transparent 55%)`,
                }
          }
        />
      ) : null}
    </div>
  );
}
