import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  Blueprint,
  Briefcase,
  Buildings,
  CheckCircle,
  FilePdf,
  House,
  HouseLine,
  Key,
  MapPin,
  Storefront,
  Tag,
  UploadSimple,
  X,
} from '@phosphor-icons/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROPERTY_FORM } from '@/data/property-form-fields';
import { cn } from '@/lib/utils';
import { FormField } from '@/components/auth/AuthFormShell';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import { LocationPickerDynamic as LocationPicker } from '@/components/forms/LocationPickerDynamic';
import type { LocationValue } from '@/components/forms/location-value';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { TURNSTILE_MISSING_MESSAGE, useTurnstileGate } from '@/hooks/useTurnstileGate';
import {
  useCancelPropertySubmissionMutation,
  useResubmitPropertySubmissionMutation,
  useSubmitPropertyMutation,
} from '@/hooks/mutations';
import { useMyPropertySubmissionsQuery } from '@/hooks/queries';
import { AppLink } from '@/lib/app-link';
import { useAppSearchParams } from '@/lib/app-router';
import { isAgentUser } from '@/lib/auth-roles';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { routes } from '@/lib/routes';
import type { FieldErrors } from '@/services/api-client';
import type { PropertyStatus, PropertyType } from '@/types';

type PageMode = 'compose' | 'view';
type WizardStep = 0 | 1 | 2;

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

const STEPS = [
  { id: 0 as const, label: 'Basics', hint: 'Title, type & price' },
  { id: 1 as const, label: 'Location', hint: 'Address & map pin' },
  { id: 2 as const, label: 'Review', hint: 'File & send' },
] as const;

const TYPE_ICONS: Record<
  PropertyType,
  React.ComponentType<{ size?: number; weight?: 'fill' | 'regular'; className?: string }>
> = {
  Apartment: Buildings,
  Villa: House,
  Studio: HouseLine,
  Townhouse: Buildings,
  Office: Briefcase,
  Commercial: Storefront,
};

const STATUS_ICONS: Record<
  (typeof PROPERTY_FORM.status.submitOptions)[number],
  React.ComponentType<{ size?: number; weight?: 'fill' | 'regular'; className?: string }>
> = {
  'For Sale': Tag,
  'For Rent': Key,
  'Off Plan': Blueprint,
};

function composeLocation(loc: LocationValue): string {
  const parts = [loc.street, loc.city].map((p) => p.trim()).filter(Boolean);
  const base = parts.join(', ');
  return loc.countryCode ? (base ? `${base} (${loc.countryCode})` : `(${loc.countryCode})`) : base;
}

function formatPreviewPrice(raw: string, status: PropertyStatus): string {
  const n = Number(raw);
  if (!raw.trim() || Number.isNaN(n)) return '—';
  const amount = `$${n.toLocaleString('en-US')}`;
  return status === 'For Rent' ? `${amount}/mo` : amount;
}

function StepRail({
  step,
  onJump,
  locked,
}: {
  step: WizardStep;
  onJump: (s: WizardStep) => void;
  locked?: boolean;
}) {
  return (
    <nav aria-label="Submission steps" className="mb-8">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
        {STEPS.map((s, i) => {
          const active = step === s.id;
          const done = step > s.id;
          const reachable = !locked && s.id <= step;
          return (
            <li key={s.id} className="flex flex-1 items-center gap-3 sm:flex-col sm:items-stretch sm:gap-0">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onJump(s.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200',
                  active && 'bg-hz-elevated shadow-hz-sm',
                  !active && reachable && 'hover:bg-hz-elevated/70',
                  !reachable && 'cursor-default opacity-60'
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-poppins text-xs font-semibold',
                    active && 'bg-hz-primary text-white',
                    done && !active && 'bg-hz-primary/15 text-hz-primary',
                    !active && !done && 'bg-hz-sunken text-hz-muted'
                  )}
                  aria-hidden="true"
                >
                  {done && !active ? <CheckCircle size={16} weight="fill" /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      'block font-poppins text-sm font-semibold tracking-[-0.3px]',
                      active ? 'text-hz-ink' : 'text-hz-body'
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="block font-poppins text-[11px] text-hz-muted">{s.hint}</span>
                </span>
              </button>
              {i < STEPS.length - 1 ? (
                <span
                  className="mx-1 hidden h-px flex-1 bg-hz-line sm:mx-2 sm:mt-5 sm:block sm:self-start"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ListingPreview({
  title,
  type,
  status,
  location,
  price,
  attachmentPreview,
  attachmentName,
}: {
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  location: LocationValue;
  price: string;
  attachmentPreview: string | null;
  attachmentName: string | null;
}) {
  const TypeIcon = TYPE_ICONS[type];
  const locLabel = composeLocation(location) || 'Pin a location';
  const priceLabel = formatPreviewPrice(price, status);

  return (
    <aside className="rounded-2xl border border-hz-border bg-hz-elevated p-5 shadow-hz-sm lg:sticky lg:top-28">
      <p className="font-poppins text-[11px] font-semibold uppercase tracking-[1.5px] text-hz-muted">
        Live preview
      </p>
      <div className="mt-3 overflow-hidden rounded-xl bg-hz-sunken">
        {attachmentPreview ? (
          <img src={attachmentPreview} alt="" className="aspect-4/3 w-full object-cover" />
        ) : (
          <div className="flex aspect-4/3 flex-col items-center justify-center gap-2 px-4 text-center">
            <TypeIcon size={36} weight="fill" className="text-hz-body/40" />
            <p className="font-poppins text-xs text-hz-muted">
              {attachmentName || 'Cover photo appears after you attach an image'}
            </p>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-hz-primary/10 px-2 py-0.5 font-poppins text-[11px] font-semibold text-hz-primary">
            {status}
          </span>
          <span className="inline-flex items-center gap-1.5 font-poppins text-xs text-hz-muted">
            <TypeIcon size={14} weight="fill" className="text-hz-body" />
            {type}
          </span>
        </div>
        <h2 className="font-poppins text-lg font-semibold leading-snug tracking-[-0.5px] text-hz-ink">
          {title.trim() || 'Your property title'}
        </h2>
        <p className="flex items-start gap-1.5 font-poppins text-sm text-hz-body">
          <MapPin size={16} weight="fill" className="mt-0.5 shrink-0 text-hz-muted" />
          <span>{locLabel}</span>
        </p>
        <p className="font-poppins text-xl font-semibold tracking-[-0.5px] text-hz-ink">{priceLabel}</p>
      </div>
    </aside>
  );
}

function FileDropzone({
  id,
  accept,
  disabled,
  file,
  previewUrl,
  error,
  hint,
  onFile,
  onClear,
}: {
  id: string;
  accept: string;
  disabled?: boolean;
  file: File | null;
  previewUrl: string | null;
  error?: string;
  hint: string;
  onFile: (file: File | null) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = (list: FileList | null) => {
    const next = list?.[0] ?? null;
    onFile(next);
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="font-poppins text-sm font-medium text-hz-ink">
        {PROPERTY_FORM.attachment.label}{' '}
        <span className="font-normal text-hz-muted">{PROPERTY_FORM.attachment.optionalLabel}</span>
      </label>
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (disabled) return;
          pick(e.dataTransfer.files);
        }}
        className={cn(
          'relative overflow-hidden rounded-xl border border-dashed transition-colors duration-200',
          dragging ? 'border-hz-primary bg-hz-primary/5' : 'border-hz-border bg-hz-sunken/60',
          error && 'border-hz-primary/70',
          disabled && 'opacity-60'
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={(e) => pick(e.target.files)}
          aria-invalid={error ? true : undefined}
          className="sr-only"
        />
        {previewUrl ? (
          <div className="relative">
            <img src={previewUrl} alt="" className="max-h-48 w-full object-cover" />
            {!disabled ? (
              <button
                type="button"
                onClick={onClear}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-hz-elevated/95 text-hz-ink shadow-hz-sm"
                aria-label="Remove file"
              >
                <X size={16} weight="bold" />
              </button>
            ) : null}
          </div>
        ) : file ? (
          <div className="flex items-center gap-3 px-4 py-5">
            <FilePdf size={28} weight="fill" className="text-hz-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-poppins text-sm font-medium text-hz-ink">{file.name}</p>
              <p className="font-poppins text-xs text-hz-muted">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            {!disabled ? (
              <button
                type="button"
                onClick={onClear}
                className="font-poppins text-xs font-medium text-hz-muted hover:text-hz-primary"
              >
                Remove
              </button>
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 px-4 py-8 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-hz-elevated text-hz-primary shadow-hz-sm">
              <UploadSimple size={22} weight="fill" />
            </span>
            <span className="font-poppins text-sm font-medium text-hz-ink">
              Drop a PDF or image, or browse
            </span>
            <span className="font-poppins text-xs text-hz-muted">{hint}</span>
          </button>
        )}
      </div>
      {error ? (
        <p className="font-poppins text-xs text-hz-primary" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SubmitPropertyPage() {
  const [searchParams] = useAppSearchParams();
  const linkedSlug = (searchParams.get('property') || searchParams.get('property_slug') || '').trim();
  const resubmitParam = (searchParams.get('resubmit') || '').trim();
  const resubmitId = resubmitParam ? Number(resubmitParam) : null;
  const { user } = useAuth();
  const isAgent = isAgentUser(user);
  const { data: inboxSubmissions = [] } = useMyPropertySubmissionsQuery(isAgent);

  const [mode, setMode] = useState<PageMode>('compose');
  const [step, setStep] = useState<WizardStep>(0);
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
  const {
    turnstileToken,
    onTurnstileToken,
    resetTurnstileToken,
    turnstileRequired,
    assertTurnstileReady,
  } = useTurnstileGate();
  const [submissionId, setSubmissionId] = useState<number | null>(null);
  const [mapOpen, setMapOpen] = useState(true);
  const [stepHint, setStepHint] = useState('');
  // Values as submitted, kept in state so the success view can render them while
  // the form fields themselves are being cleared.
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  const submitMutation = useSubmitPropertyMutation();
  const resubmitMutation = useResubmitPropertySubmissionMutation();
  const cancelMutation = useCancelPropertySubmissionMutation();
  const activeResubmitId =
    resubmitId !== null && Number.isFinite(resubmitId) ? resubmitId : null;
  const readOnly = mode === 'view';
  const canEditFields = mode === 'compose';
  const busy = submitMutation.isPending || resubmitMutation.isPending || cancelMutation.isPending;
  const finalSubmitDisabled = busy || (turnstileRequired && !turnstileToken);

  const attachmentPreview = useMemo(() => {
    if (!attachment || !attachment.type.startsWith('image/')) return null;
    return URL.createObjectURL(attachment);
  }, [attachment]);

  useEffect(() => {
    if (!activeResubmitId || readOnly) return;

    const existing = inboxSubmissions.find((item) => item.id === activeResubmitId);
    if (!existing || existing.review_status !== 'rejected') return;

    setTitle(existing.title);
    setType(existing.type as PropertyType);
    setStatus(existing.status as PropertyStatus);
    setLocation({
      street: existing.street ?? '',
      city: existing.city ?? '',
      countryCode: existing.country_code ?? 'ID',
      latitude: existing.latitude ?? null,
      longitude: existing.longitude ?? null,
    });
    setPrice(String(existing.price));
    setSubmissionId(existing.id);
  }, [activeResubmitId, inboxSubmissions, readOnly]);

  useEffect(() => {
    return () => {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
  }, [attachmentPreview]);

  const locationError =
    fieldErrors.street?.[0] ||
    fieldErrors.city?.[0] ||
    fieldErrors.country_code?.[0] ||
    fieldErrors.latitude?.[0] ||
    fieldErrors.longitude?.[0];

  const setAttachmentFile = (file: File | null) => {
    setSubmitError('');
    setFieldErrors((prev) => clearFieldError(prev, 'attachment'));
    setAttachment(file);
    setAttachmentName(file?.name ?? null);
    const fileInput = document.getElementById(PROPERTY_FORM.attachment.id) as HTMLInputElement | null;
    if (fileInput && !file) fileInput.value = '';
  };

  const persistSnapshot = () => {
    setSnapshot({
      title,
      type,
      status,
      location,
      price,
      attachmentName: attachment?.name ?? attachmentName,
    });
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
    resetTurnstileToken();
    setStep(0);
    setStepHint('');
    setSnapshot(null);
    const fileInput = document.getElementById(PROPERTY_FORM.attachment.id) as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
    setMode('compose');
  };

  const handleSubmitError = (error: unknown) => {
    setNotice('');
    const errors = getApiFieldErrors(error);
    setFieldErrors(errors);
    setSubmitError(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    if (errors.title || errors.type || errors.status || errors.price) setStep(0);
    else if (
      errors.street ||
      errors.city ||
      errors.country_code ||
      errors.latitude ||
      errors.longitude
    ) {
      setStep(1);
    } else {
      setStep(2);
    }
  };

  const sendSubmission = () => {
    setSubmitError('');
    setFieldErrors({});
    setNotice('');

    if (!assertTurnstileReady()) {
      setSubmitError(TURNSTILE_MISSING_MESSAGE);
      return;
    }

    const payload = {
      title,
      type,
      status,
      street: location.street.trim(),
      city: location.city.trim(),
      country_code: location.countryCode,
      latitude: location.latitude,
      longitude: location.longitude,
      price: price.trim() === '' ? Number.NaN : Number(price),
      property_slug: linkedSlug || undefined,
      attachment,
      turnstileToken,
    };

    const mutation = activeResubmitId
      ? resubmitMutation.mutate(
          { id: activeResubmitId, data: payload },
          {
            onSuccess: (result) => {
              persistSnapshot();
              setNotice(result.message || 'Resubmitted successfully.');
              setSubmissionId(result.submission?.id ?? activeResubmitId);
              setAttachment(null);
              resetTurnstileToken();
              setFieldErrors({});
              const fileInput = document.getElementById(
                PROPERTY_FORM.attachment.id
              ) as HTMLInputElement | null;
              if (fileInput) fileInput.value = '';
              setMode('view');
            },
            onError: handleSubmitError,
          }
        )
      : submitMutation.mutate(payload, {
          onSuccess: (result) => {
            persistSnapshot();
            setNotice(result.message || 'Submitted successfully.');
            setSubmissionId(result.submission?.id ?? null);
            setAttachment(null);
            resetTurnstileToken();
            setFieldErrors({});
            const fileInput = document.getElementById(
              PROPERTY_FORM.attachment.id
            ) as HTMLInputElement | null;
            if (fileInput) fileInput.value = '';
            setMode('view');
          },
          onError: handleSubmitError,
        });

    void mutation;
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

  const validateStep = (target: WizardStep): boolean => {
    setStepHint('');
    if (target <= 0) return true;
    if (!title.trim() || price.trim() === '' || Number.isNaN(Number(price))) {
      setStepHint('Add a title and a valid price before continuing.');
      setStep(0);
      return false;
    }
    if (target <= 1) return true;
    if (!location.street.trim() || !location.city.trim()) {
      setStepHint('Street and city are needed before you can review.');
      setStep(1);
      return false;
    }
    if (location.latitude == null || location.longitude == null) {
      setStepHint('Drop a pin on the map so we know the exact spot.');
      setStep(1);
      return false;
    }
    return true;
  };

  const goNext = () => {
    const next = Math.min(2, step + 1) as WizardStep;
    if (!validateStep(next)) return;
    setStep(next);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1) as WizardStep);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canEditFields) return;
    if (step < 2) {
      goNext();
      return;
    }
    if (!validateStep(2)) return;
    sendSubmission();
  };

  const snap = snapshot;
  const previewTitle = mode === 'view' && snap ? snap.title : title;
  const previewType = mode === 'view' && snap ? snap.type : type;
  const previewStatus = mode === 'view' && snap ? snap.status : status;
  const previewLocation = mode === 'view' && snap ? snap.location : location;
  const previewPrice = mode === 'view' && snap ? snap.price : price;
  const previewAttachmentName =
    mode === 'view' && snap ? snap.attachmentName : attachment?.name ?? attachmentName;

  if (mode === 'view') {
    return (
      <main id="main-content" className="relative overflow-hidden bg-hz-page py-16 md:py-20">
        <SectionAtmosphere
          tone="light"
          surface="page"
          side="right"
          intensity="quiet"
          variant="ambient"
          image="interior-light"
        />
        <div className="section-container relative z-10 max-w-2xl">
          <div className="rounded-2xl border border-hz-border bg-hz-elevated p-8 shadow-hz-md md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hz-primary/10 text-hz-primary">
              <CheckCircle size={32} weight="fill" aria-hidden="true" />
            </div>
            <h1 className="mt-5 font-poppins text-2xl font-semibold tracking-[-0.5px] text-hz-ink md:text-3xl">
              Sent for review
            </h1>
            <p className="mt-2 font-poppins text-sm leading-relaxed text-hz-body" role="status">
              {notice || 'Your listing details are with our team.'}
            </p>

            <div className="mt-6 rounded-xl border border-hz-border bg-hz-sunken/50 p-5">
              <p className="font-poppins text-base font-semibold text-hz-ink">
                {previewTitle || 'Property'}
              </p>
              <p className="mt-1 font-poppins text-sm text-hz-muted">
                {previewType} · {previewStatus} · {formatPreviewPrice(previewPrice, previewStatus)}
              </p>
              <p className="mt-2 flex items-start gap-1.5 font-poppins text-sm text-hz-body">
                <MapPin size={16} weight="fill" className="mt-0.5 shrink-0" />
                {composeLocation(previewLocation) || '—'}
              </p>
              {previewAttachmentName ? (
                <p className="mt-2 font-poppins text-xs text-hz-muted">File: {previewAttachmentName}</p>
              ) : null}
            </div>

            {isAgent && submissionId ? (
              <p className="mt-4 font-poppins text-sm text-hz-body">
                Status: waiting for approval. Track it in{' '}
                <AppLink href={routes.myProperty} className="font-medium text-hz-primary underline">
                  My Property
                </AppLink>
                .
              </p>
            ) : null}

            {submitError ? (
              <p className="mt-4 font-poppins text-sm text-hz-primary" role="alert">
                {submitError}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isAgent && submissionId ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={handleCancelSubmission}
                  className={cn(
                    'w-full rounded-lg border border-destructive/30 px-6 py-3 sm:flex-1',
                    'font-poppins text-sm font-semibold text-destructive',
                    'hover:bg-destructive/5 disabled:opacity-60'
                  )}
                >
                  {cancelMutation.isPending ? 'Cancelling…' : 'Cancel submission'}
                </button>
              ) : null}
              {isAgent ? (
                <AppLink
                  href={routes.myProperty}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-hz-border px-6 py-3 font-poppins text-sm font-medium text-hz-ink no-underline hover:border-hz-primary hover:text-hz-primary sm:flex-1"
                >
                  View My Property
                </AppLink>
              ) : (
                <button
                  type="button"
                  onClick={resetToCompose}
                  className={cn(
                    'w-full rounded-lg bg-hz-primary px-6 py-3 sm:flex-1',
                    'font-poppins text-sm font-semibold text-white',
                    'transition-colors duration-200 hover:bg-hz-primary-hover'
                  )}
                >
                  Submit another
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="relative overflow-hidden bg-hz-page py-12 md:py-20">
      <SectionAtmosphere
        tone="light"
        surface="page"
        side="left"
        intensity="quiet"
        variant="edge"
        image="architecture"
      />

      <div className="section-container relative z-10">
        <header className="max-w-2xl">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            List with Homzen
          </p>
          <h1 className="font-poppins text-2xl font-semibold tracking-[-0.5px] text-hz-ink md:text-3xl">
            Submit Your Property
          </h1>
          <p className="mt-2 max-w-lg font-poppins text-sm leading-relaxed text-hz-body">
            Walk through a short listing flow — our team reviews every submission.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <StepRail
              step={step}
              locked={!canEditFields}
              onJump={(s) => {
                if (s < step || validateStep(s)) setStep(s);
              }}
            />

            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="relative space-y-6 rounded-2xl border border-hz-border bg-hz-elevated p-6 shadow-hz-sm md:p-8"
            >
              <HoneypotInput />

              {stepHint ? (
                <p
                  className="rounded-lg bg-hz-primary/8 px-3 py-2 font-poppins text-xs text-hz-primary"
                  role="status"
                >
                  {stepHint}
                </p>
              ) : null}

              {step === 0 ? (
                <section className="space-y-6" aria-labelledby="step-basics">
                  <div>
                    <h2
                      id="step-basics"
                      className="font-poppins text-lg font-semibold tracking-[-0.5px] text-hz-ink"
                    >
                      Property info
                    </h2>
                    <p className="mt-1 font-poppins text-sm text-hz-muted">
                      What buyers and renters will see first.
                    </p>
                  </div>

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

                  <div className="space-y-2">
                    <p className="font-poppins text-sm font-medium text-hz-ink">
                      {PROPERTY_FORM.type.label}
                    </p>
                    <div
                      className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                      role="radiogroup"
                      aria-label={PROPERTY_FORM.type.label}
                    >
                      {PROPERTY_FORM.type.options.map((option) => {
                        const Icon = TYPE_ICONS[option];
                        const selected = type === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            disabled={readOnly}
                            onClick={() => {
                              setType(option);
                              setFieldErrors((prev) => clearFieldError(prev, 'type'));
                            }}
                            className={cn(
                              'flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition-all duration-200',
                              selected
                                ? 'border-hz-primary bg-hz-primary/8 shadow-hz-sm'
                                : 'border-hz-border bg-hz-elevated hover:border-hz-primary/40',
                              readOnly && 'cursor-default'
                            )}
                          >
                            <Icon
                              size={22}
                              weight="fill"
                              className={selected ? 'text-hz-primary' : 'text-hz-body'}
                            />
                            <span
                              className={cn(
                                'font-poppins text-sm font-medium',
                                selected ? 'text-hz-ink' : 'text-hz-body'
                              )}
                            >
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {fieldErrors.type?.[0] ? (
                      <p className="font-poppins text-xs text-hz-primary" role="alert">
                        {fieldErrors.type[0]}
                      </p>
                    ) : (
                      <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.type.hint}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="font-poppins text-sm font-medium text-hz-ink">
                      {PROPERTY_FORM.status.label}
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      role="radiogroup"
                      aria-label={PROPERTY_FORM.status.label}
                    >
                      {PROPERTY_FORM.status.submitOptions.map((option) => {
                        const Icon = STATUS_ICONS[option];
                        const selected = status === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            disabled={readOnly}
                            onClick={() => {
                              setStatus(option);
                              setFieldErrors((prev) => clearFieldError(prev, 'status'));
                            }}
                            className={cn(
                              'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-200',
                              selected
                                ? 'border-hz-primary bg-hz-primary text-white'
                                : 'border-hz-border bg-hz-elevated text-hz-body hover:border-hz-primary/40',
                              readOnly && 'cursor-default'
                            )}
                          >
                            <Icon size={18} weight="fill" />
                            <span className="font-poppins text-sm font-semibold">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    {fieldErrors.status?.[0] ? (
                      <p className="font-poppins text-xs text-hz-primary" role="alert">
                        {fieldErrors.status[0]}
                      </p>
                    ) : (
                      <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.status.hint}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={PROPERTY_FORM.price.id}
                      className="font-poppins text-sm font-medium text-hz-ink"
                    >
                      {PROPERTY_FORM.price.label}
                    </label>
                    <div
                      className={cn(
                        'flex h-11 items-center overflow-hidden rounded-hz border',
                        fieldErrors.price ? 'border-hz-primary/70' : 'border-hz-border',
                        readOnly ? 'bg-hz-bg-soft' : 'bg-hz-elevated'
                      )}
                    >
                      <span className="border-r border-hz-border bg-hz-sunken px-3 font-poppins text-sm font-semibold text-hz-body">
                        $
                      </span>
                      <input
                        id={PROPERTY_FORM.price.id}
                        type="text"
                        inputMode="decimal"
                        value={price}
                        onChange={(e) => {
                          const next = e.target.value.replace(/[^\d.]/g, '');
                          setPrice(next);
                          setFieldErrors((prev) => clearFieldError(prev, 'price'));
                        }}
                        disabled={readOnly}
                        aria-invalid={fieldErrors.price ? true : undefined}
                        placeholder="0"
                        className={cn(
                          'h-full w-full bg-transparent px-3 font-poppins text-sm text-hz-ink outline-none',
                          'placeholder:text-hz-muted/60',
                          readOnly && 'cursor-default'
                        )}
                      />
                      {status === 'For Rent' ? (
                        <span className="pr-3 font-poppins text-xs font-medium text-hz-muted">/mo</span>
                      ) : null}
                    </div>
                    {fieldErrors.price?.[0] ? (
                      <p className="font-poppins text-xs text-hz-primary" role="alert">
                        {fieldErrors.price[0]}
                      </p>
                    ) : (
                      <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.price.hint}</p>
                    )}
                  </div>
                </section>
              ) : null}

              {step === 1 ? (
                <section className="space-y-5" aria-labelledby="step-location">
                  <div>
                    <h2
                      id="step-location"
                      className="font-poppins text-lg font-semibold tracking-[-0.5px] text-hz-ink"
                    >
                      Where it is
                    </h2>
                    <p className="mt-1 font-poppins text-sm text-hz-muted">
                      {PROPERTY_FORM.location.hint}
                    </p>
                  </div>

                  <Suspense
                    fallback={
                      <Skeleton className="h-80 w-full rounded-hz border border-hz-border" />
                    }
                  >
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setMapOpen((o) => !o)}
                        className="font-poppins text-xs font-semibold text-hz-primary hover:underline"
                      >
                        {mapOpen ? 'Hide map' : 'Show map'}
                      </button>
                      <div className={cn(!mapOpen && 'hidden')}>
                        <LocationPicker
                          value={location}
                          onChange={(next) => {
                            setLocation(next);
                            setFieldErrors((prev) => {
                              let updated = prev;
                              for (const key of [
                                'street',
                                'city',
                                'country_code',
                                'latitude',
                                'longitude',
                              ] as const) {
                                updated = clearFieldError(updated, key);
                              }
                              return updated;
                            });
                          }}
                          disabled={readOnly}
                        />
                      </div>
                      {!mapOpen ? (
                        <p className="rounded-xl border border-hz-border bg-hz-sunken/50 px-4 py-3 font-poppins text-sm text-hz-body">
                          {composeLocation(location) || 'No address yet — open the map to set one.'}
                        </p>
                      ) : null}
                    </div>
                  </Suspense>
                  {locationError ? (
                    <p className="font-poppins text-xs text-hz-primary" role="alert">
                      {locationError}
                    </p>
                  ) : null}
                </section>
              ) : null}

              {step === 2 ? (
                <section className="space-y-6" aria-labelledby="step-review">
                  <div>
                    <h2
                      id="step-review"
                      className="font-poppins text-lg font-semibold tracking-[-0.5px] text-hz-ink"
                    >
                      Review & send
                    </h2>
                    <p className="mt-1 font-poppins text-sm text-hz-muted">
                      Attach optional docs, then send for Homzen review.
                    </p>
                  </div>

                  <dl className="grid gap-3 rounded-xl border border-hz-border bg-hz-sunken/40 p-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-poppins text-[11px] font-medium uppercase tracking-wide text-hz-muted">
                        Title
                      </dt>
                      <dd className="mt-0.5 font-poppins text-sm font-medium text-hz-ink">
                        {title.trim() || '—'}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-poppins text-[11px] font-medium uppercase tracking-wide text-hz-muted">
                        Price
                      </dt>
                      <dd className="mt-0.5 font-poppins text-sm font-medium text-hz-ink">
                        {formatPreviewPrice(price, status)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-poppins text-[11px] font-medium uppercase tracking-wide text-hz-muted">
                        Type / status
                      </dt>
                      <dd className="mt-0.5 font-poppins text-sm font-medium text-hz-ink">
                        {type} · {status}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-poppins text-[11px] font-medium uppercase tracking-wide text-hz-muted">
                        Location
                      </dt>
                      <dd className="mt-0.5 font-poppins text-sm font-medium text-hz-ink">
                        {composeLocation(location) || '—'}
                      </dd>
                    </div>
                  </dl>

                  <FileDropzone
                    id={PROPERTY_FORM.attachment.id}
                    accept={PROPERTY_FORM.attachment.accept}
                    disabled={!canEditFields}
                    file={attachment}
                    previewUrl={attachmentPreview}
                    error={fieldErrors.attachment?.[0]}
                    hint={PROPERTY_FORM.attachment.hint}
                    onFile={setAttachmentFile}
                    onClear={() => setAttachmentFile(null)}
                  />

                  {linkedSlug ? (
                    <p className="rounded-hz bg-hz-sunken px-3 py-2 font-poppins text-xs text-hz-muted">
                      Linked property:{' '}
                      <span className="font-medium text-hz-ink">{linkedSlug}</span>
                    </p>
                  ) : null}

                  {canEditFields ? <TurnstileWidget onTokenChange={onTurnstileToken} /> : null}

                  {submitError && Object.keys(fieldErrors).length === 0 ? (
                    <p className="font-poppins text-sm text-hz-primary" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                </section>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-hz-border pt-6 sm:flex-row sm:items-center">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={busy}
                    className={cn(
                      'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-hz-border px-6 py-3 sm:w-auto',
                      'font-poppins text-sm font-medium text-hz-ink hover:border-hz-primary hover:text-hz-primary',
                      'disabled:opacity-60'
                    )}
                  >
                    <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                    Back
                  </button>
                ) : (
                  <span className="hidden sm:block sm:flex-1" />
                )}

                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
                  {step < 2 ? (
                    <button
                      type="submit"
                      disabled={busy}
                      className={cn(
                        'inline-flex w-full items-center justify-center gap-2 rounded-lg bg-hz-primary px-6 py-3 sm:w-auto sm:min-w-40',
                        'font-poppins text-sm font-semibold text-white',
                        'transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60'
                      )}
                    >
                      Continue
                      <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={finalSubmitDisabled}
                      className={cn(
                        'inline-flex w-full items-center justify-center rounded-lg bg-hz-primary px-6 py-3 sm:min-w-45',
                        'font-poppins text-sm font-semibold text-white',
                        'transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60'
                      )}
                    >
                      {submitMutation.isPending ? 'Sending…' : 'Send for review'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <ListingPreview
            title={previewTitle}
            type={previewType}
            status={previewStatus}
            location={previewLocation}
            price={previewPrice}
            attachmentPreview={attachmentPreview}
            attachmentName={previewAttachmentName}
          />
        </div>
      </div>
    </main>
  );
}
