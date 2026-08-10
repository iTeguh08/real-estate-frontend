import { useEffect, useMemo, useState } from 'react';
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
import { ImageLightboxPanel, LightboxCloseButton } from '@/components/ui/image-lightbox';
import { MediaImage } from '@/components/ui/media-image';
import { useDotCarousel } from '@/hooks/useDotCarousel';
import {
  PROPERTY_GALLERY_COUNT,
  PROPERTY_GALLERY_PAGE_SIZE,
} from '@/lib/property-gallery';
import { cn } from '@/lib/utils';
import type { PropertyGalleryImage } from '@/types';

export interface PropertyGalleryGridProps {
  images: PropertyGalleryImage[];
  title: string;
}

/** Full pages of 4 only — matches the CMS requirement of exactly 8 gallery photos. */
function chunkFullPages(images: PropertyGalleryImage[], size: number) {
  const pages: PropertyGalleryImage[][] = [];
  const usable = images.slice(0, Math.floor(images.length / size) * size);
  for (let i = 0; i < usable.length; i += size) {
    pages.push(usable.slice(i, i + size));
  }
  return pages;
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
  /** First-paint estimate only — real size comes from ResizeObserver via fitCover. */
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
        mediaUrl={image.url}
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
      <div className="grid h-[min(120vw,560px)] grid-cols-2 grid-rows-3 gap-3 md:h-[min(42vw,500px)] md:grid-cols-12 md:grid-rows-2 md:gap-4">
        <GalleryTile
          image={b}
          onOpen={() => openAt(1)}
          className="min-h-0 md:col-span-5 md:col-start-1 md:row-start-1"
          coverEstimate={{ width: 480, height: 240 }}
        />
        <GalleryTile
          image={c}
          onOpen={() => openAt(2)}
          className="col-start-1 row-start-2 min-h-0 md:hidden"
          coverEstimate={{ width: 360, height: 180 }}
        />
        <GalleryTile
          image={d}
          onOpen={() => openAt(3)}
          className="col-start-1 row-start-3 min-h-0 md:hidden"
          coverEstimate={{ width: 360, height: 180 }}
        />
        <div className="hidden min-h-0 grid-cols-2 gap-4 md:col-span-5 md:col-start-1 md:row-start-2 md:grid">
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
          className="col-start-2 row-span-3 min-h-0 md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1"
          coverEstimate={{ width: 720, height: 500 }}
        />
      </div>
    );
  }

  return (
    <div className="grid h-[min(120vw,560px)] grid-cols-2 grid-rows-2 gap-3 md:h-[min(42vw,500px)] md:grid-cols-12 md:gap-4">
      <GalleryTile
        image={a}
        onOpen={() => openAt(0)}
        className="min-h-0 md:col-span-7 md:row-span-2"
        coverEstimate={{ width: 720, height: 500 }}
      />
      <GalleryTile
        image={b}
        onOpen={() => openAt(1)}
        className="min-h-0 md:col-span-5"
        coverEstimate={{ width: 480, height: 240 }}
      />
      <GalleryTile
        image={c}
        onOpen={() => openAt(2)}
        className="min-h-0 md:col-span-5 md:hidden"
        coverEstimate={{ width: 360, height: 180 }}
      />
      <GalleryTile
        image={d}
        onOpen={() => openAt(3)}
        className="min-h-0 md:hidden"
        coverEstimate={{ width: 360, height: 180 }}
      />
      <div className="hidden min-h-0 grid-cols-2 gap-4 md:col-span-5 md:grid">
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
  const pages = useMemo(
    () => chunkFullPages(images, PROPERTY_GALLERY_PAGE_SIZE),
    [images]
  );
  const pageCount = pages.length;
  const { activeIndex, setActiveIndex, goPrev, goNext, swipeHandlers } = useDotCarousel(pageCount);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const selected = lightboxIndex !== null ? images[lightboxIndex] : null;

  useEffect(() => {
    if (activeIndex >= pageCount && pageCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, pageCount, setActiveIndex]);

  if (images.length < PROPERTY_GALLERY_PAGE_SIZE || pageCount === 0) {
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

          <div className="touch-pan-y overflow-hidden" {...swipeHandlers}>
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {pages.map((pageImages, pageIndex) => (
                <div key={pageIndex} className="w-full shrink-0">
                  <GalleryBentoPage
                    pageImages={pageImages}
                    pageOffset={pageIndex * PROPERTY_GALLERY_PAGE_SIZE}
                    onOpen={setLightboxIndex}
                    reversed={pageIndex % 2 === 1}
                  />
                </div>
              ))}
            </div>
          </div>

          {pageCount > 1 ? (
            <CarouselControls
              count={pageCount}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              onPrev={goPrev}
              onNext={goNext}
              itemLabel="gallery page"
              className="mt-8"
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
