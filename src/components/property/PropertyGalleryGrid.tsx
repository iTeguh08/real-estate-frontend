import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CarouselControls } from '@/components/ui/CarouselControls';
import { DotCarouselSlide, DotCarouselTrack } from '@/components/ui/DotCarouselTrack';
import { ImageLightboxPanel, LightboxCloseButton } from '@/components/ui/image-lightbox';
import { MediaImage } from '@/components/ui/media-image';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import {
  PROPERTY_GALLERY_COUNT,
  PROPERTY_GALLERY_MOBILE_PAGE_SIZE,
  PROPERTY_GALLERY_PAGE_SIZE,
} from '@/lib/property-gallery';
import { galleryTileMediaUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import type { PropertyGalleryImage } from '@/types';

export interface PropertyGalleryGridProps {
  images: PropertyGalleryImage[];
  title: string;
}

/** Full pages only — desktop bento requires exactly `size` tiles per page. */
function chunkFullPages(images: PropertyGalleryImage[], size: number) {
  const pages: PropertyGalleryImage[][] = [];
  const usable = images.slice(0, Math.floor(images.length / size) * size);
  for (let i = 0; i < usable.length; i += size) {
    pages.push(usable.slice(i, i + size));
  }
  return pages;
}

/** Mobile carousel — hero + 2-col row; last page may have 1–2 tiles. */
function chunkPartialPages(images: PropertyGalleryImage[], size: number) {
  const pages: PropertyGalleryImage[][] = [];
  for (let i = 0; i < images.length; i += size) {
    const slice = images.slice(i, i + size);
    if (slice.length > 0) pages.push(slice);
  }
  return pages;
}

/** Mobile — row 1 full-width hero, row 2 two-up (never a third row). */
function GalleryMobilePage({
  pageImages,
  pageOffset,
  onOpen,
}: {
  pageImages: PropertyGalleryImage[];
  pageOffset: number;
  onOpen: (absoluteIndex: number) => void;
}) {
  const [a, b, c] = pageImages;
  if (!a) return null;

  const openAt = (localIndex: number) => onOpen(pageOffset + localIndex);
  /** Last slide always has exactly 2 tiles — stack both full-width. */
  const lastPairOnly = pageImages.length === 2;

  return (
    <div className="grid grid-cols-2 gap-3">
      <GalleryTile
        image={a}
        onOpen={() => openAt(0)}
        className="col-span-2 aspect-[16/10] h-auto min-h-[140px]"
        coverEstimate={{ width: 720, height: 450 }}
      />
      {b ? (
        <GalleryTile
          image={b}
          onOpen={() => openAt(1)}
          className={
            lastPairOnly
              ? 'col-span-2 aspect-[16/10] h-auto min-h-[140px]'
              : 'aspect-[4/5] h-auto min-h-[100px]'
          }
          coverEstimate={
            lastPairOnly ? { width: 720, height: 450 } : { width: 360, height: 450 }
          }
        />
      ) : null}
      {c ? (
        <GalleryTile
          image={c}
          onOpen={() => openAt(2)}
          className="aspect-[4/5] h-auto min-h-[100px]"
          coverEstimate={{ width: 360, height: 450 }}
        />
      ) : null}
    </div>
  );
}

function GalleryTile({
  image,
  onOpen,
  className,
  coverEstimate = { width: 720, height: 500 },
}: {
  image: PropertyGalleryImage;
  onOpen: () => void;
  className?: string;
  /** Soft width hint for Unsplash fallbacks; local product URLs stay static. */
  coverEstimate?: { width: number; height: number };
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group relative block h-full w-full min-h-[120px] overflow-hidden rounded-hz bg-hz-sunken',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2',
        className
      )}
      aria-label={`Open gallery image: ${image.alt}`}
    >
      <MediaImage
        mediaUrl={galleryTileMediaUrl(image.url, coverEstimate, image.originalUrl)}
        fitCover
        coverEstimate={coverEstimate}
        coverMaxWidth={1100}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        wrapperClassName="absolute inset-0"
      />
    </button>
  );
}

/** Bento page — 4 tiles; odd pages large-left, even pages large-right (mirrored). */
function GalleryBentoPage({
  pageImages,
  pageOffset,
  onOpen,
  reversed = false,
}: {
  pageImages: PropertyGalleryImage[];
  pageOffset: number;
  onOpen: (absoluteIndex: number) => void;
  reversed?: boolean;
}) {
  const [a, b, c, d] = pageImages;
  if (!a || !b || !c || !d) return null;

  const openAt = (localIndex: number) => onOpen(pageOffset + localIndex);

  if (reversed) {
    return (
      <div className="grid h-[min(42vw,500px)] grid-cols-12 grid-rows-2 gap-4">
        <GalleryTile
          image={b}
          onOpen={() => openAt(1)}
          className="col-span-5 col-start-1 row-start-1"
          coverEstimate={{ width: 480, height: 240 }}
        />
        <div className="col-span-5 col-start-1 row-start-2 grid min-h-0 grid-cols-2 gap-4">
          <GalleryTile
            image={c}
            onOpen={() => openAt(2)}
            className="min-h-0"
            coverEstimate={{ width: 240, height: 240 }}
          />
          <GalleryTile
            image={d}
            onOpen={() => openAt(3)}
            className="min-h-0"
            coverEstimate={{ width: 240, height: 240 }}
          />
        </div>
        <GalleryTile
          image={a}
          onOpen={() => openAt(0)}
          className="col-span-7 col-start-6 row-span-2 row-start-1"
          coverEstimate={{ width: 720, height: 500 }}
        />
      </div>
    );
  }

  return (
    <div className="grid h-[min(42vw,500px)] grid-cols-12 grid-rows-2 gap-4">
      <GalleryTile
        image={a}
        onOpen={() => openAt(0)}
        className="col-span-7 row-span-2"
        coverEstimate={{ width: 720, height: 500 }}
      />
      <GalleryTile
        image={b}
        onOpen={() => openAt(1)}
        className="col-span-5"
        coverEstimate={{ width: 480, height: 240 }}
      />
      <div className="col-span-5 grid min-h-0 grid-cols-2 gap-4">
        <GalleryTile
          image={c}
          onOpen={() => openAt(2)}
          className="min-h-0"
          coverEstimate={{ width: 240, height: 240 }}
        />
        <GalleryTile
          image={d}
          onOpen={() => openAt(3)}
          className="min-h-0"
          coverEstimate={{ width: 240, height: 240 }}
        />
      </div>
    </div>
  );
}

export function PropertyGalleryGrid({ images, title }: PropertyGalleryGridProps) {
  const desktopPages = useMemo(
    () => chunkFullPages(images, PROPERTY_GALLERY_PAGE_SIZE),
    [images]
  );
  const mobilePages = useMemo(
    () => chunkPartialPages(images, PROPERTY_GALLERY_MOBILE_PAGE_SIZE),
    [images]
  );
  const desktopPageCount = desktopPages.length;
  const mobilePageCount = mobilePages.length;
  const desktopCarousel = useDotCarousel(desktopPageCount);
  const mobileCarousel = useDotCarousel(mobilePageCount);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selected = lightboxIndex !== null ? images[lightboxIndex] : null;

  if (images.length < PROPERTY_GALLERY_PAGE_SIZE || desktopPageCount === 0) {
    return null;
  }

  const goLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  const goLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  return (
    <>
      <section
        aria-labelledby="property-gallery-heading"
        className="relative bg-hz-elevated pt-8 pb-12 md:pt-10 md:pb-16"
      >
        <div className="section-container">
          <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
                Gallery
              </p>
              <h2
                id="property-gallery-heading"
                className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
              >
                Explore every angle
              </h2>
            </div>
            <p className="max-w-sm font-poppins text-sm leading-relaxed text-hz-muted">
              {Math.min(images.length, PROPERTY_GALLERY_COUNT)} curated views of {title}
            </p>
          </div>

          <DotCarouselTrack
            activeIndex={mobileCarousel.activeIndex}
            swipeHandlers={mobileCarousel.swipeHandlers}
            className="md:hidden"
          >
            {mobilePages.map((pageImages, pageIndex) => (
              <DotCarouselSlide key={pageIndex}>
                <GalleryMobilePage
                  pageImages={pageImages}
                  pageOffset={pageIndex * PROPERTY_GALLERY_MOBILE_PAGE_SIZE}
                  onOpen={setLightboxIndex}
                />
              </DotCarouselSlide>
            ))}
          </DotCarouselTrack>

          {mobilePageCount > 1 ? (
            <CarouselControls
              count={mobilePageCount}
              activeIndex={mobileCarousel.activeIndex}
              onSelect={mobileCarousel.setActiveIndex}
              onPrev={mobileCarousel.goPrev}
              onNext={mobileCarousel.goNext}
              itemLabel="gallery page"
              className="mt-8 md:hidden"
            />
          ) : null}

          <DotCarouselTrack
            activeIndex={desktopCarousel.activeIndex}
            swipeHandlers={desktopCarousel.swipeHandlers}
            className="hidden md:block"
          >
            {desktopPages.map((pageImages, pageIndex) => (
              <DotCarouselSlide key={pageIndex}>
                <GalleryBentoPage
                  pageImages={pageImages}
                  pageOffset={pageIndex * PROPERTY_GALLERY_PAGE_SIZE}
                  onOpen={setLightboxIndex}
                  reversed={pageIndex % 2 === 1}
                />
              </DotCarouselSlide>
            ))}
          </DotCarouselTrack>

          {desktopPageCount > 1 ? (
            <CarouselControls
              count={desktopPageCount}
              activeIndex={desktopCarousel.activeIndex}
              onSelect={desktopCarousel.setActiveIndex}
              onPrev={desktopCarousel.goPrev}
              onNext={desktopCarousel.goNext}
              itemLabel="gallery page"
              className="mt-8 hidden md:flex"
            />
          ) : null}
        </div>
      </section>

      {lightboxIndex !== null && selected ? (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) setLightboxIndex(null);
          }}
        >
          <DialogContent
            showCloseButton={false}
            className="block w-auto max-w-none gap-0 overflow-visible border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-none"
            overlayClassName="bg-black/70 supports-backdrop-filter:backdrop-blur-sm"
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{selected.alt}</DialogTitle>
              <DialogDescription>Expanded gallery view for {title}</DialogDescription>
            </DialogHeader>

            <ImageLightboxPanel
              key={selected.id}
              previewUrl={selected.url}
              originalUrl={selected.originalUrl}
              alt={selected.alt}
              size="gallery"
            >
              <DialogClose asChild>
                <LightboxCloseButton aria-label="Close gallery" />
              </DialogClose>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goLightboxPrev}
                    aria-label="Previous gallery image"
                    className="absolute top-1/2 left-3 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-hz-elevated text-hz-ink shadow-hz-sm ring-1 ring-hz-border transition-colors hover:bg-hz-sunken md:size-10"
                  >
                    <ChevronLeft size={18} strokeWidth={1.85} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={goLightboxNext}
                    aria-label="Next gallery image"
                    className="absolute top-1/2 right-3 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-hz-elevated text-hz-ink shadow-hz-sm ring-1 ring-hz-border transition-colors hover:bg-hz-sunken md:size-10"
                  >
                    <ChevronRight size={18} strokeWidth={1.85} aria-hidden="true" />
                  </button>
                  <figcaption className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-hz-elevated/95 px-3 py-1 font-poppins text-xs font-medium text-hz-ink shadow-hz-sm ring-1 ring-hz-border">
                    {lightboxIndex + 1} / {images.length}
                  </figcaption>
                </>
              ) : null}
            </ImageLightboxPanel>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
