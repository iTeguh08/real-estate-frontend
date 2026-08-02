import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PROPERTY_FORM } from '@/data/property-form-fields';
import { cn } from '@/lib/utils';
import { FormField, MockSubmitNotice } from '@/components/auth/AuthFormShell';
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import type { LocationValue } from '@/components/forms/location-value';
import { useAuth } from '@/hooks/useAuth';
import {
  useCancelPropertySubmissionMutation,
  useSubmitPropertyMutation,
} from '@/hooks/mutations';
import { isAgentUser } from '@/lib/auth-roles';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { routes } from '@/lib/routes';
import type { FieldErrors } from '@/services/api-client';
import type { PropertyStatus, PropertyType } from '@/types';

const LocationPicker = lazy(() =>
  import('@/components/forms/LocationPicker').then((m) => ({ default: m.LocationPicker }))
);

type PageMode = 'compose' | 'view';

interface Snapshot {
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  location: LocationValue;
  price: string;
  attachmentName: string | null;
}

const EMPTY_LOCATION: LocationValue = {
  street: '',
  city: '',
  countryCode: 'ID',
  latitude: null,
  longitude: null,
};

function composeLocation(loc: LocationValue): string {
  const parts = [loc.street, loc.city].map((p) => p.trim()).filter(Boolean);
  const base = parts.join(', ');
  return loc.countryCode ? (base ? `${base} (${loc.countryCode})` : `(${loc.countryCode})`) : base;
}

export function SubmitPropertyPage() {
  const [searchParams] = useSearchParams();
  const linkedSlug = (searchParams.get('property') || searchParams.get('property_slug') || '').trim();
  const { user } = useAuth();
  const isAgent = isAgentUser(user);

  const [mode, setMode] = useState<PageMode>('compose');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('Apartment');
  const [status, setStatus] = useState<PropertyStatus>('For Sale');
  const [location, setLocation] = useState<LocationValue>(EMPTY_LOCATION);
  const [price, setPrice] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const snapshotRef = useRef<Snapshot | null>(null);
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  const submitMutation = useSubmitPropertyMutation();
  const cancelMutation = useCancelPropertySubmissionMutation();
  const readOnly = mode === 'view';
  const canEditFields = mode === 'compose';
  const busy = submitMutation.isPending || cancelMutation.isPending;

  const locationError =
    fieldErrors.street?.[0] ||
    fieldErrors.city?.[0] ||
    fieldErrors.country_code?.[0] ||
    fieldErrors.latitude?.[0] ||
    fieldErrors.longitude?.[0];

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSubmitError('');
    setFieldErrors((prev) => clearFieldError(prev, 'attachment'));
    setAttachment(file);
    setAttachmentName(file?.name ?? null);
  };

  const persistSnapshot = () => {
    snapshotRef.current = {
      title,
      type,
      status,
      location,
      price,
      attachmentName: attachment?.name ?? attachmentName,
    };
  };

  const resetToCompose = () => {
    setTitle('');
    setType('Apartment');
    setStatus('For Sale');
    setLocation(EMPTY_LOCATION);
    setPrice('');
    setAttachment(null);
    setAttachmentName(null);
    setSubmissionId(null);
    setNotice('');
    setSubmitError('');
    setFieldErrors({});
    setTurnstileToken('');
    snapshotRef.current = null;
    const fileInput = document.getElementById(PROPERTY_FORM.attachment.id) as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
    setMode('compose');
  };

  const sendSubmission = () => {
    setSubmitError('');
    setFieldErrors({});
    setNotice('');

    submitMutation.mutate(
      {
        title,
        type,
        status,
        street: location.street.trim(),
        city: location.city.trim(),
        country_code: location.countryCode,
        location: composeLocation(location),
        latitude: location.latitude,
        longitude: location.longitude,
        price: price.trim() === '' ? Number.NaN : Number(price),
        property_slug: linkedSlug || undefined,
        attachment,
        turnstileToken,
      },
      {
        onSuccess: (result) => {
          persistSnapshot();
          setNotice(result.message || 'Submitted successfully.');
          setSubmissionId(result.submission?.id ?? null);
          setAttachment(null);
          setTurnstileToken('');
          setFieldErrors({});
          const fileInput = document.getElementById(
            PROPERTY_FORM.attachment.id
          ) as HTMLInputElement | null;
          if (fileInput) fileInput.value = '';
          setMode('view');
        },
        onError: (error) => {
          setNotice('');
          setFieldErrors(getApiFieldErrors(error));
          setSubmitError(apiErrorMessage(error, 'Something went wrong. Please try again.'));
        },
      }
    );
  };

  const handleCancelSubmission = () => {
    if (!submissionId) {
      resetToCompose();
      return;
    }

    const ok = window.confirm(
      'Cancel this submission? It will be removed from My Property and will not be reviewed.'
    );
    if (!ok) return;

    cancelMutation.mutate(submissionId, {
      onSuccess: () => {
        setNotice('Submission cancelled.');
        setSubmissionId(null);
        resetToCompose();
      },
      onError: (error) => {
        setSubmitError(error.message || 'Could not cancel submission.');
      },
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canEditFields) return;
    sendSubmission();
  };

  const selectClass = cn(
    'h-11 w-full rounded-hz border border-hz-border px-3',
    'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
    readOnly ? 'cursor-default bg-hz-bg-soft' : 'bg-hz-elevated'
  );

  return (
    <main id="main-content" className="bg-hz-sunken py-10 md:py-16">
      <div className="section-container max-w-2xl">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          List with Homzen
        </p>
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark md:text-3xl">
          Submit Your Property
        </h1>
        <p className="mt-2 max-w-lg font-poppins text-sm leading-relaxed text-hz-muted">
          Fill in the details below and our team will review your submission.
        </p>

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="relative mt-8 space-y-5 rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm md:p-8"
        >
          <HoneypotInput />
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

          <div className="grid gap-5 sm:grid-cols-2">
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
                className={cn(selectClass, fieldErrors.type && 'border-hz-primary/70')}
              >
                {PROPERTY_FORM.type.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                className={cn(selectClass, fieldErrors.status && 'border-hz-primary/70')}
              >
                {PROPERTY_FORM.status.submitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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

          <div className="space-y-1.5">
            <p className="font-poppins text-sm font-medium text-hz-dark">
              {PROPERTY_FORM.location.label}
            </p>
            <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.location.hint}</p>
            <Suspense
              fallback={
                <div className="h-[320px] animate-pulse rounded-hz border border-hz-border bg-hz-bg-soft" />
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
            hint={PROPERTY_FORM.price.hint}
            error={fieldErrors.price?.[0]}
          />

          <div className="space-y-1.5">
            <label
              htmlFor={PROPERTY_FORM.attachment.id}
              className="font-poppins text-sm font-medium text-hz-dark"
            >
              {PROPERTY_FORM.attachment.label}{' '}
              <span className="font-normal text-hz-muted">{PROPERTY_FORM.attachment.optionalLabel}</span>
            </label>
            {canEditFields ? (
              <input
                id={PROPERTY_FORM.attachment.id}
                type="file"
                accept={PROPERTY_FORM.attachment.accept}
                onChange={handleAttachmentChange}
                aria-invalid={fieldErrors.attachment ? true : undefined}
                className={cn(
                  'block w-full font-poppins text-sm text-hz-dark',
                  'file:mr-3 file:rounded-hz file:border-0 file:bg-hz-primary/10',
                  'file:px-3 file:py-2 file:font-poppins file:text-sm file:font-medium file:text-hz-primary'
                )}
              />
            ) : (
              <p className="rounded-hz border border-hz-border bg-hz-bg-soft px-3 py-2.5 font-poppins text-sm text-hz-dark">
                {attachmentName || 'No file attached'}
              </p>
            )}
            {fieldErrors.attachment?.[0] ? (
              <p className="font-poppins text-xs text-hz-primary" role="alert">
                {fieldErrors.attachment[0]}
              </p>
            ) : (
              <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.attachment.hint}</p>
            )}
            {canEditFields && attachment ? (
              <p className="font-poppins text-xs text-hz-dark">Selected: {attachment.name}</p>
            ) : null}
          </div>

          {linkedSlug && canEditFields ? (
            <p className="rounded-hz bg-hz-sunken px-3 py-2 font-poppins text-xs text-hz-muted">
              Linked property: <span className="font-medium text-hz-dark">{linkedSlug}</span>
            </p>
          ) : null}

          {canEditFields ? <TurnstileWidget onTokenChange={onTurnstileToken} /> : null}

          {notice ? (
            <div className="space-y-2">
              <MockSubmitNotice message={notice} />
              {isAgent && mode === 'view' && submissionId ? (
                <p className="font-poppins text-xs text-amber-800">
                  Status: waiting for approval. You can cancel below, or track it in{' '}
                  <Link to={routes.myProperty} className="font-medium underline">
                    My Property
                  </Link>
                  .
                </p>
              ) : null}
            </div>
          ) : null}
          {submitError && Object.keys(fieldErrors).length === 0 ? (
            <p className="font-poppins text-sm text-hz-primary" role="alert">
              {submitError}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            {mode === 'compose' ? (
              <button
                type="submit"
                disabled={busy}
                className={cn(
                  'w-full rounded-hz bg-hz-primary px-6 py-3 sm:flex-1',
                  'font-poppins text-sm font-semibold text-white',
                  'transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60'
                )}
              >
                {submitMutation.isPending ? 'Submitting…' : 'Submit'}
              </button>
            ) : null}

            {mode === 'view' ? (
              <>
                {isAgent && submissionId ? (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleCancelSubmission}
                    className={cn(
                      'w-full rounded-hz border border-red-200 px-6 py-3 sm:flex-1',
                      'font-poppins text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60'
                    )}
                  >
                    {cancelMutation.isPending ? 'Cancelling…' : 'Cancel submission'}
                  </button>
                ) : null}
                {isAgent ? (
                  <Link
                    to={routes.myProperty}
                    className="inline-flex w-full items-center justify-center rounded-hz border border-hz-border px-6 py-3 font-poppins text-sm font-medium text-hz-dark no-underline hover:border-hz-primary hover:text-hz-primary sm:flex-1"
                  >
                    View My Property
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={resetToCompose}
                    className={cn(
                      'w-full rounded-hz bg-hz-primary px-6 py-3 sm:flex-1',
                      'font-poppins text-sm font-semibold text-white',
                      'transition-colors duration-200 hover:bg-hz-primary-hover'
                    )}
                  >
                    Submit another
                  </button>
                )}
              </>
            ) : null}
          </div>
        </form>
      </div>
    </main>
  );
}
