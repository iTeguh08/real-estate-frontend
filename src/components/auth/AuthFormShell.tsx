import type { FormEvent, HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MediaImage } from '@/components/ui/media-image';
import { publicAsset } from '@/lib/public-asset';
import { cn } from '@/lib/utils';

const AUTH_PANEL_IMAGE = publicAsset('bg/bg-auth-luxury-interior-v1.webp');

interface AuthFormShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthFormShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthFormShellProps) {
  return (
    <main
      id="main-content"
      className="relative grid min-h-[calc(100dvh-76px)] overflow-hidden bg-hz-elevated lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
    >
      {/* Visual panel — full-strength luxury photo */}
      <aside className="relative h-44 overflow-hidden bg-hz-sunken sm:h-56 lg:h-auto lg:min-h-[calc(100dvh-76px)]">
        <MediaImage
          src={AUTH_PANEL_IMAGE}
          alt=""
          loading="eager"
          fetchPriority="high"
          noSkeleton
          className="object-cover object-[center_35%]"
          wrapperClassName="absolute inset-0"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/65 via-black/25 to-black/5"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:p-10 xl:p-14">
          <p className="font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-white/80">
            Homzen
          </p>
          <p className="mt-2 max-w-md font-poppins text-lg font-semibold leading-snug tracking-[-0.5px] text-white sm:text-xl lg:mt-3 lg:text-2xl xl:text-[28px]">
            Luxury homes, curated for members who know what they want.
          </p>
        </div>
      </aside>

      {/* Form panel — wider card, fills the right column */}
      <div className="relative flex items-center justify-center bg-hz-page px-5 py-10 sm:px-10 sm:py-12 md:px-14 lg:px-16 xl:px-20">
        <div className="relative z-10 w-full max-w-xl">
          <div className="rounded-2xl border border-hz-border bg-hz-elevated p-7 shadow-hz-md sm:p-9 md:p-10 lg:p-11">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              {eyebrow}
            </p>
            <h1 className="font-poppins text-[28px] font-semibold leading-[1.15] tracking-[-0.5px] text-hz-ink sm:text-[32px]">
              {title}
            </h1>
            <p className="mt-3 max-w-lg font-poppins text-sm leading-relaxed text-hz-body sm:text-[15px]">
              {description}
            </p>

            <div className="mt-8">{children}</div>

            <div className="mt-7 border-t border-hz-border pt-6 text-center font-poppins text-sm text-hz-muted">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  /** Visual / a11y hint only — prefer zod / API errors with `noValidate`. */
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  required,
  autoComplete,
  disabled,
  readOnly,
  hint,
  error,
  placeholder,
  inputMode,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="font-poppins text-sm font-medium text-hz-dark">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          'h-11 w-full rounded-hz border px-3',
          'font-poppins text-sm text-hz-dark outline-none transition-colors',
          'placeholder:text-hz-muted/60 focus:border-hz-primary/60',
          error ? 'border-hz-primary/70' : 'border-hz-border',
          disabled || readOnly ? 'cursor-default bg-hz-bg-soft text-hz-dark' : 'bg-hz-elevated'
        )}
      />
      {error ? (
        <p id={errorId} className="font-poppins text-xs text-hz-primary" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="font-poppins text-xs text-hz-muted">{hint}</p>
      ) : null}
    </div>
  );
}

interface MockSubmitNoticeProps {
  message: string;
}

export function MockSubmitNotice({ message }: MockSubmitNoticeProps) {
  return (
    <p
      role="status"
      className="rounded-hz border border-hz-border bg-hz-sunken px-4 py-3 font-poppins text-sm text-hz-body"
    >
      {message}
    </p>
  );
}

export function AuthSubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        'mt-6 w-full rounded-hz bg-hz-primary px-6 py-3',
        'font-poppins text-sm font-semibold text-white',
        'transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60'
      )}
    >
      {children}
    </button>
  );
}

export function AuthFooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="font-medium text-hz-primary no-underline hover:underline">
      {children}
    </Link>
  );
}

export function handleMockFormSubmit(
  e: FormEvent<HTMLFormElement>,
  onSuccess: (message: string) => void
) {
  e.preventDefault();
  onSuccess('Account features will be available once the backend is connected.');
}
