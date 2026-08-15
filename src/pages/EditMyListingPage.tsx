import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Pencil, SendHorizontal, EyeOff } from 'lucide-react';
import { FormField } from '@/components/auth/AuthFormShell';
import { FormSelect } from '@/components/forms/FormSelect';
import type { LocationValue } from '@/components/forms/location-value';
import { PropertyMediaSlotField } from '@/components/property/PropertyMediaSlotField';
import { PROPERTY_FORM } from '@/data/property-form-fields';
import {
  COVER_MEDIA_SLOT,
  CUSTOM_LAYOUT_OPTIONS,
  LAYOUT1_MEDIA_SLOTS,
  LAYOUT2_MEDIA_SLOTS,
  type CustomLayout,
  type MediaSlotField,
} from '@/data/property-media-slots';
import { EditListingSkeleton } from '@/components/skeletons';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useSiteHeader } from '@/hooks/useSiteHeader';
import {
  useClearMyListingGalleryMutation,
  useClearMyListingMediaMutation,
  usePublishMyListingMutation,
  useUnpublishMyListingMutation,
  useUpdateMyListingMutation,
  useUploadMyListingGalleryMutation,
  useUploadMyListingMediaMutation,
} from '@/hooks/mutations';
import { useMyListingQuery } from '@/hooks/queries';
import { isAgentUser } from '@/lib/auth-roles';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { PROPERTY_GALLERY_COUNT } from '@/lib/property-gallery';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import {
  galleryPreview,
  isListingReadyToPublish,
  listingMissingFields,
  mediaPreview,
  publishStatusLabel,
} from '@/services/agent-listings.service';
import type { FieldErrors } from '@/services/api-client';
import type { PropertyStatus, PropertyType } from '@/types';

const LocationPicker = lazy(() =>
  import('@/components/forms/LocationPicker').then((m) => ({ default: m.LocationPicker }))
);

type PageMode = 'view' | 'edit';

const EMPTY_LOCATION: LocationValue = {
  street: '',
  city: '',
  countryCode: 'ID',
  latitude: null,
  longitude: null,
};

export function EditMyListingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { scrollOffset } = useSiteHeader();
  const isAgent = isAgentUser(user);
  const { data: listing, isLoading, isError } = useMyListingQuery(id, isAuthenticated && isAgent);
  const updateMutation = useUpdateMyListingMutation(id ?? '');
  const publishMutation = usePublishMyListingMutation();
  const unpublishMutation = useUnpublishMyListingMutation();
  const uploadMediaMutation = useUploadMyListingMediaMutation(id ?? '');
  const clearMediaMutation = useClearMyListingMediaMutation(id ?? '');
  const uploadGalleryMutation = useUploadMyListingGalleryMutation(id ?? '');
  const clearGalleryMutation = useClearMyListingGalleryMutation(id ?? '');

  const [mode, setMode] = useState<PageMode>(() =>
    searchParams.get('edit') === '1' ? 'edit' : 'view'
  );
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState<LocationValue>(EMPTY_LOCATION);
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('$');
  const [status, setStatus] = useState<PropertyStatus>('For Sale');
  const [type, setType] = useState<PropertyType>('Apartment');
  const [customLayout, setCustomLayout] = useState<CustomLayout>('layout-1');
  const [beds, setBeds] = useState('0');
  const [baths, setBaths] = useState('0');
  const [sqft, setSqft] = useState('0');
  const [garage, setGarage] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState('');
  const [mediaBusyField, setMediaBusyField] = useState<MediaSlotField | null>(null);
  const [galleryBusyIndex, setGalleryBusyIndex] = useState<number | null>(null);
  /** Ignore Save for a beat after Edit — Edit and Save share the same button slot. */
  const editArmedAtRef = useRef(0);

  useEffect(() => {
    if (!listing) return;
    setTitle(listing.title ?? '');
    setLocation({
      street: listing.street ?? '',
      city: listing.city ?? '',
      countryCode: listing.country_code ?? 'ID',
      latitude: listing.latitude ?? null,
      longitude: listing.longitude ?? null,
    });
    setPrice(String(listing.price ?? 0));
    setCurrency(listing.currency ?? '$');
    setStatus((listing.status as PropertyStatus) || 'For Sale');
    setType((listing.type as PropertyType) || 'Apartment');
    setCustomLayout(listing.custom_layout === 'layout-2' ? 'layout-2' : 'layout-1');
    setBeds(String(listing.beds ?? 0));
    setBaths(String(listing.baths ?? 0));
    setSqft(String(listing.sqft ?? 0));
    setGarage(listing.garage == null ? '' : String(listing.garage));
    setTagline(listing.tagline ?? '');
    setDescription(listing.description ?? '');
  }, [listing]);

  function enterEdit() {
    setError('');
    setFieldErrors({});
    setNotice('');
    setMode('edit');
    editArmedAtRef.current = Date.now();
    setSearchParams({ edit: '1' }, { replace: true });
  }

  function enterView() {
    setMode('view');
    setSearchParams({}, { replace: true });
  }

  function cancelEdit() {
    if (!listing) return;
    setTitle(listing.title ?? '');
    setLocation({
      street: listing.street ?? '',
      city: listing.city ?? '',
      countryCode: listing.country_code ?? 'ID',
      latitude: listing.latitude ?? null,
      longitude: listing.longitude ?? null,
    });
    setPrice(String(listing.price ?? 0));
    setCurrency(listing.currency ?? '$');
    setStatus((listing.status as PropertyStatus) || 'For Sale');
    setType((listing.type as PropertyType) || 'Apartment');
    setCustomLayout(listing.custom_layout === 'layout-2' ? 'layout-2' : 'layout-1');
    setBeds(String(listing.beds ?? 0));
    setBaths(String(listing.baths ?? 0));
    setSqft(String(listing.sqft ?? 0));
    setGarage(listing.garage == null ? '' : String(listing.garage));
    setTagline(listing.tagline ?? '');
    setDescription(listing.description ?? '');
    setError('');
    setFieldErrors({});
    setNotice('');
    enterView();
  }

  if (authLoading || (isAuthenticated && isAgent && isLoading)) {
    return <EditListingSkeleton />;
  }

  if (!isAuthenticated || !user || !isAgent) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Agents only</h1>
        <Link to={routes.dashboard} className="mt-6 inline-block text-hz-primary">
          Back to dashboard
        </Link>
      </main>
    );
  }

  if (isError || !listing) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Property not found</h1>
        <Link
          to={routes.myProperty}
          className="mt-6 inline-block rounded-hz bg-hz-primary px-5 py-2.5 font-poppins text-sm font-semibold text-white no-underline"
        >
          My Property
        </Link>
      </main>
    );
  }

  const readOnly = mode === 'view';
  const canPublish = isListingReadyToPublish(listing);
  const missing = listingMissingFields(listing);
  const isPublished = listing.publish_status === 'published';
  const busy =
    updateMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending ||
    uploadMediaMutation.isPending ||
    clearMediaMutation.isPending ||
    uploadGalleryMutation.isPending ||
    clearGalleryMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    // Double-click on Edit lands on Save (same slot) — ignore that accidental submit.
    if (Date.now() - editArmedAtRef.current < 500) return;
    setError('');
    setFieldErrors({});
    setNotice('');

    updateMutation.mutate(
      {
        title: title.trim(),
        street: (location.street ?? '').trim(),
        city: (location.city ?? '').trim(),
        country_code: location.countryCode || 'ID',
        latitude: location.latitude,
        longitude: location.longitude,
        price: Number(price) || 0,
        currency: (currency ?? '').trim() || '$',
        status,
        type,
        custom_layout: customLayout,
        beds: Number(beds) || 0,
        baths: Number(baths) || 0,
        sqft: Number(sqft) || 0,
        garage: garage === '' ? null : Number(garage),
        tagline: (tagline ?? '').trim(),
        description: (description ?? '').trim(),
      },
      {
        onSuccess: () => {
          setNotice('Saved.');
          setFieldErrors({});
          enterView();
        },
        onError: (err) => {
          setFieldErrors(getApiFieldErrors(err));
          setError(apiErrorMessage(err, 'Could not save property.'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      }
    );
  };

  const handleUpload = (field: MediaSlotField, file: File) => {
    setError('');
    setFieldErrors({});
    setMediaBusyField(field);
    uploadMediaMutation.mutate(
      { field, file },
      {
        onSuccess: () => setNotice('Image uploaded.'),
        onError: (err) => {
          setFieldErrors(getApiFieldErrors(err));
          setError(apiErrorMessage(err, 'Could not upload image.'));
        },
        onSettled: () => setMediaBusyField(null),
      }
    );
  };

  const handleClearMedia = (field: MediaSlotField) => {
    setError('');
    setFieldErrors({});
    setMediaBusyField(field);
    clearMediaMutation.mutate(field, {
      onSuccess: () => setNotice('Image removed.'),
      onError: (err) => {
        setFieldErrors(getApiFieldErrors(err));
        setError(apiErrorMessage(err, 'Could not remove image.'));
      },
      onSettled: () => setMediaBusyField(null),
    });
  };

  const handleGalleryUpload = (index: number, file: File) => {
    setError('');
    setFieldErrors({});
    setGalleryBusyIndex(index);
    uploadGalleryMutation.mutate(
      { index, file },
      {
        onSuccess: () => setNotice(`Gallery ${index + 1} uploaded.`),
        onError: (err) => {
          setFieldErrors(getApiFieldErrors(err));
          setError(apiErrorMessage(err, 'Could not upload gallery image.'));
        },
        onSettled: () => setGalleryBusyIndex(null),
      }
    );
  };

  const handleGalleryClear = (index: number) => {
    setError('');
    setFieldErrors({});
    setGalleryBusyIndex(index);
    clearGalleryMutation.mutate(index, {
      onSuccess: () => setNotice(`Gallery ${index + 1} removed.`),
      onError: (err) => {
        setFieldErrors(getApiFieldErrors(err));
        setError(apiErrorMessage(err, 'Could not remove gallery image.'));
      },
      onSettled: () => setGalleryBusyIndex(null),
    });
  };

  const locationError =
    fieldErrors.street?.[0] ||
    fieldErrors.city?.[0] ||
    fieldErrors.country_code?.[0] ||
    fieldErrors.latitude?.[0] ||
    fieldErrors.longitude?.[0];

  const fieldClass = cn(
    'h-11 w-full rounded-hz border border-hz-border px-3',
    'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
    readOnly ? 'cursor-default bg-hz-bg-soft' : 'bg-hz-elevated'
  );

  const layoutSlots = customLayout === 'layout-2' ? LAYOUT2_MEDIA_SLOTS : LAYOUT1_MEDIA_SLOTS;

  return (
    <main id="main-content" className="bg-hz-sunken py-10 md:py-16">
      <div className="section-container max-w-3xl">
        <Link
          to={routes.myProperty}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          Back to My Property
        </Link>

        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          {mode === 'edit' ? 'Edit property' : 'Property detail'}
        </p>
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark md:text-3xl">
          {listing.title}
        </h1>
        <p className="mt-2 font-poppins text-sm text-hz-muted">
          Status:{' '}
          <span className="text-hz-dark">{publishStatusLabel(listing.publish_status)}</span>
          {readOnly
            ? '. Review the details, then publish or edit.'
            : '. Update the fields (same slots as CMS), then save.'}
        </p>

        {mode === 'edit' ? (
          <div
            className="sticky z-20 mt-4 flex flex-wrap gap-2 rounded-hz border border-hz-border bg-hz-elevated/95 p-3 shadow-hz-sm backdrop-blur-sm"
            style={{ top: scrollOffset }}
          >
            <button
              type="submit"
              form="edit-listing-form"
              disabled={busy}
              className="rounded-hz bg-hz-primary px-5 py-2 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={cancelEdit}
              className="rounded-hz border border-hz-border px-5 py-2 font-poppins text-sm font-medium text-hz-dark disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        ) : null}

        <form
          id="edit-listing-form"
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 space-y-5 rounded-hz border border-hz-border bg-hz-elevated p-5 shadow-sm md:p-8"
        >
          <FormField
            id={PROPERTY_FORM.title.id}
            label={PROPERTY_FORM.title.label}
            type={PROPERTY_FORM.title.type}
            value={title}
            onChange={(value) => {
              setTitle(value);
              setFieldErrors((prev) => clearFieldError(prev, 'title'));
            }}
            disabled={readOnly}
            hint={PROPERTY_FORM.title.hint}
            error={fieldErrors.title?.[0]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor={PROPERTY_FORM.type.id}
                className="font-poppins text-sm font-medium text-hz-dark"
              >
                {PROPERTY_FORM.type.label}
              </label>
              <select
                id={PROPERTY_FORM.type.id}
                value={type}
                onChange={(e) => {
                  setType(e.target.value as PropertyType);
                  setFieldErrors((prev) => clearFieldError(prev, 'type'));
                }}
                disabled={readOnly}
                aria-invalid={fieldErrors.type ? true : undefined}
                className={cn(fieldClass, fieldErrors.type && 'border-hz-primary/70')}
              >
                {PROPERTY_FORM.type.options.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {fieldErrors.type?.[0] ? (
                <p className="font-poppins text-xs text-hz-primary" role="alert">
                  {fieldErrors.type[0]}
                </p>
              ) : (
                <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.type.hint}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor={PROPERTY_FORM.status.id}
                className="font-poppins text-sm font-medium text-hz-dark"
              >
                {PROPERTY_FORM.status.label}
              </label>
              <select
                id={PROPERTY_FORM.status.id}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as PropertyStatus);
                  setFieldErrors((prev) => clearFieldError(prev, 'status'));
                }}
                disabled={readOnly}
                aria-invalid={fieldErrors.status ? true : undefined}
                className={cn(fieldClass, fieldErrors.status && 'border-hz-primary/70')}
              >
                {PROPERTY_FORM.status.editOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {fieldErrors.status?.[0] ? (
                <p className="font-poppins text-xs text-hz-primary" role="alert">
                  {fieldErrors.status[0]}
                </p>
              ) : (
                <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.status.hint}</p>
              )}
            </div>
          </div>

          <FormField
            id={PROPERTY_FORM.price.id}
            label={PROPERTY_FORM.price.label}
            type={PROPERTY_FORM.price.type}
            value={price}
            onChange={(value) => {
              setPrice(value);
              setFieldErrors((prev) => clearFieldError(prev, 'price'));
            }}
            disabled={readOnly}
            inputMode="numeric"
            hint={PROPERTY_FORM.price.hint}
            error={fieldErrors.price?.[0]}
          />
          <FormSelect
            id={PROPERTY_FORM.currency.id}
            label={PROPERTY_FORM.currency.label}
            value={currency}
            onChange={(value) => {
              setCurrency(value);
              setFieldErrors((prev) => clearFieldError(prev, 'currency'));
            }}
            options={PROPERTY_FORM.currency.options}
            disabled={readOnly}
            hint={PROPERTY_FORM.currency.hint}
            error={fieldErrors.currency?.[0]}
          />

          <div className="space-y-1.5">
            <p className="font-poppins text-sm font-medium text-hz-dark">
              {PROPERTY_FORM.location.label}
            </p>
            <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.location.hint}</p>
            <Suspense
              fallback={
                <Skeleton className="h-[320px] w-full rounded-hz border border-hz-border" />
              }
            >
              <LocationPicker
                value={location}
                onChange={(next) => {
                  setLocation(next);
                  setFieldErrors((prev) => {
                    let updated = prev;
                    for (const key of ['street', 'city', 'country_code', 'latitude', 'longitude'] as const) {
                      updated = clearFieldError(updated, key);
                    }
                    return updated;
                  });
                }}
                disabled={readOnly}
              />
            </Suspense>
            {locationError ? (
              <p className="font-poppins text-xs text-hz-primary" role="alert">
                {locationError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <FormField
              id={PROPERTY_FORM.beds.id}
              label={PROPERTY_FORM.beds.label}
              type={PROPERTY_FORM.beds.type}
              value={beds}
              onChange={(value) => {
                setBeds(value);
                setFieldErrors((prev) => clearFieldError(prev, 'beds'));
              }}
              disabled={readOnly}
              hint={PROPERTY_FORM.beds.hint}
              error={fieldErrors.beds?.[0]}
            />
            <FormField
              id={PROPERTY_FORM.baths.id}
              label={PROPERTY_FORM.baths.label}
              type={PROPERTY_FORM.baths.type}
              value={baths}
              onChange={(value) => {
                setBaths(value);
                setFieldErrors((prev) => clearFieldError(prev, 'baths'));
              }}
              disabled={readOnly}
              hint={PROPERTY_FORM.baths.hint}
              error={fieldErrors.baths?.[0]}
            />
            <FormField
              id={PROPERTY_FORM.sqft.id}
              label={PROPERTY_FORM.sqft.label}
              type={PROPERTY_FORM.sqft.type}
              value={sqft}
              onChange={(value) => {
                setSqft(value);
                setFieldErrors((prev) => clearFieldError(prev, 'sqft'));
              }}
              disabled={readOnly}
              hint={PROPERTY_FORM.sqft.hint}
              error={fieldErrors.sqft?.[0]}
            />
            <FormField
              id={PROPERTY_FORM.garage.id}
              label={PROPERTY_FORM.garage.label}
              type={PROPERTY_FORM.garage.type}
              value={garage}
              onChange={(value) => {
                setGarage(value);
                setFieldErrors((prev) => clearFieldError(prev, 'garage'));
              }}
              disabled={readOnly}
              hint={PROPERTY_FORM.garage.hint}
              error={fieldErrors.garage?.[0]}
            />
          </div>

          <FormField
            id={PROPERTY_FORM.tagline.id}
            label={PROPERTY_FORM.tagline.label}
            type={PROPERTY_FORM.tagline.type}
            value={tagline}
            onChange={(value) => {
              setTagline(value);
              setFieldErrors((prev) => clearFieldError(prev, 'tagline'));
            }}
            disabled={readOnly}
            hint={PROPERTY_FORM.tagline.hint}
            error={fieldErrors.tagline?.[0]}
          />

          <div className="space-y-1.5">
            <label
              htmlFor={PROPERTY_FORM.description.id}
              className="font-poppins text-sm font-medium text-hz-dark"
            >
              {PROPERTY_FORM.description.label}
            </label>
            <textarea
              id={PROPERTY_FORM.description.id}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setFieldErrors((prev) => clearFieldError(prev, 'description'));
              }}
              rows={5}
              disabled={readOnly}
              aria-invalid={fieldErrors.description ? true : undefined}
              className={cn(
                'w-full rounded-hz border px-3 py-2',
                'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
                fieldErrors.description ? 'border-hz-primary/70' : 'border-hz-border',
                readOnly ? 'cursor-default bg-hz-bg-soft' : 'bg-hz-elevated'
              )}
            />
            {fieldErrors.description?.[0] ? (
              <p className="font-poppins text-xs text-hz-primary" role="alert">
                {fieldErrors.description[0]}
              </p>
            ) : (
              <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.description.hint}</p>
            )}
          </div>

          <div className="space-y-1.5 border-t border-hz-border pt-5">
            <label htmlFor="custom-layout" className="font-poppins text-sm font-medium text-hz-dark">
              Detail layout
            </label>
            <select
              id="custom-layout"
              value={customLayout}
              onChange={(e) => {
                setCustomLayout(e.target.value as CustomLayout);
                setFieldErrors((prev) => clearFieldError(prev, 'custom_layout'));
              }}
              disabled={readOnly}
              aria-invalid={fieldErrors.custom_layout ? true : undefined}
              className={cn(fieldClass, fieldErrors.custom_layout && 'border-hz-primary/70')}
            >
              {CUSTOM_LAYOUT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldErrors.custom_layout?.[0] ? (
              <p className="font-poppins text-xs text-hz-primary" role="alert">
                {fieldErrors.custom_layout[0]}
              </p>
            ) : (
              <p className="font-poppins text-xs text-hz-muted">
                Same as CMS. Switching layout shows that layout’s media slots below. Cover image is
                shared by both layouts.
              </p>
            )}
          </div>

          <div className="space-y-3 border-t border-hz-border pt-5">
            <h2 className="font-poppins text-sm font-semibold text-hz-dark">Cover image</h2>
            <PropertyMediaSlotField
              id={`media-${COVER_MEDIA_SLOT.field}`}
              label={COVER_MEDIA_SLOT.label}
              help={COVER_MEDIA_SLOT.help}
              previewUrl={mediaPreview(listing, COVER_MEDIA_SLOT.field)}
              disabled={readOnly}
              busy={busy && mediaBusyField === COVER_MEDIA_SLOT.field}
              onUpload={(file) => handleUpload(COVER_MEDIA_SLOT.field, file)}
              onClear={() => handleClearMedia(COVER_MEDIA_SLOT.field)}
            />
          </div>

          <div className="space-y-3 border-t border-hz-border pt-5">
            <h2 className="font-poppins text-sm font-semibold text-hz-dark">
              {customLayout === 'layout-2' ? 'Layout 2 media' : 'Layout 1 media'}
            </h2>
            <p className="font-poppins text-xs text-hz-muted">
              Upload images for the selected detail layout (same slots as Nova CMS).
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {layoutSlots.map((slot) => (
                <PropertyMediaSlotField
                  key={slot.field}
                  id={`media-${slot.field}`}
                  label={slot.label}
                  help={slot.help}
                  previewUrl={mediaPreview(listing, slot.field)}
                  disabled={readOnly}
                  busy={busy && mediaBusyField === slot.field}
                  onUpload={(file) => handleUpload(slot.field, file)}
                  onClear={() => handleClearMedia(slot.field)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-hz-border pt-5">
            <h2 className="font-poppins text-sm font-semibold text-hz-dark">
              Gallery — Explore every angle
            </h2>
            <p className="font-poppins text-xs text-hz-muted">
              Exactly {PROPERTY_GALLERY_COUNT} photos for the detail-page bento (2 pages × 4 tiles).
              Shared by Layout 1 and Layout 2.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: PROPERTY_GALLERY_COUNT }, (_, index) => {
                const slot = listing.gallery?.[index];
                return (
                  <PropertyMediaSlotField
                    key={`gallery-${index}`}
                    id={`gallery-${index}`}
                    label={slot?.label ?? `Gallery ${index + 1}`}
                    help={
                      slot?.help ??
                      `Page ${index < 4 ? 1 : 2}, tile ${(index % 4) + 1}. Ratio 4:3.`
                    }
                    previewUrl={galleryPreview(listing, index)}
                    disabled={readOnly}
                    busy={busy && galleryBusyIndex === index}
                    onUpload={(file) => handleGalleryUpload(index, file)}
                    onClear={() => handleGalleryClear(index)}
                  />
                );
              })}
            </div>
          </div>

          {error && Object.keys(fieldErrors).length === 0 ? (
            <p className="font-poppins text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          {notice && <p className="font-poppins text-sm text-emerald-700">{notice}</p>}
          {readOnly && !isPublished && !canPublish && missing.length > 0 ? (
            <p className="font-poppins text-xs text-amber-700">
              Complete before publish: {missing.join(', ')}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            {mode === 'edit' ? (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={cancelEdit}
                  className="rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark disabled:opacity-50"
                >
                  Cancel
                </button>
                {isPublished ? (
                  <Link
                    to={routes.property(listing.slug)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark no-underline hover:bg-hz-bg-soft"
                  >
                    <ExternalLink size={14} />
                    See in public
                  </Link>
                ) : null}
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover disabled:opacity-50"
                >
                  {updateMutation.isPending ? 'Saving…' : 'Save'}
                </button>
              </>
            ) : isPublished ? (
              <>
                <Link
                  to={routes.property(listing.slug)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white no-underline hover:bg-hz-primary-hover"
                >
                  <ExternalLink size={14} />
                  See in public
                </Link>
                <button
                  type="button"
                  disabled={busy}
                  onClick={enterEdit}
                  className="inline-flex items-center gap-1.5 rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark disabled:opacity-50"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    void unpublishMutation.mutateAsync(listing.id).catch((err: unknown) => {
                      setError(apiErrorMessage(err, 'Could not unpublish.'));
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark disabled:opacity-50"
                >
                  <EyeOff size={14} />
                  Unpublish
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled={busy || !canPublish}
                  title={
                    canPublish
                      ? 'Publish to the public site'
                      : `Complete required fields first: ${missing.join(', ')}`
                  }
                  onClick={() =>
                    void publishMutation
                      .mutateAsync(listing.id)
                      .then(() => {
                        setNotice('Published.');
                        setError('');
                      })
                      .catch((err: unknown) => {
                        setError(apiErrorMessage(err, 'Could not publish.'));
                      })
                  }
                  className="inline-flex items-center gap-1.5 rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <SendHorizontal size={14} />
                  {publishMutation.isPending ? 'Publishing…' : 'Publish'}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={enterEdit}
                  className="inline-flex items-center gap-1.5 rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark disabled:opacity-50"
                >
                  <Pencil size={14} />
                  Edit
                </button>
              </>
            )}
          </div>
        </form>

        {mode === 'view' ? (
          <button
            type="button"
            onClick={() => navigate(routes.myProperty)}
            className="mt-4 font-poppins text-sm text-hz-muted hover:text-hz-primary"
          >
            Back to list
          </button>
        ) : null}
      </div>
    </main>
  );
}
