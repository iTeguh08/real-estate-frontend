import type { FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
    <main id="main-content" className="flex min-h-[calc(100vh-76px)] items-center bg-[#F8F8F8] py-12">
      <div className="section-container w-full max-w-md">
        <div className="rounded-hz border border-hz-border bg-white p-6 shadow-sm md:p-8">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            {eyebrow}
          </p>
          <h1 className="font-poppins text-2xl font-semibold text-hz-dark">{title}</h1>
          <p className="mt-2 font-poppins text-sm leading-relaxed text-hz-muted">{description}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6 border-t border-hz-border pt-6 text-center font-poppins text-sm text-hz-muted">
            {footer}
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
  required?: boolean;
  autoComplete?: string;
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required,
  autoComplete,
}: FormFieldProps) {
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
        required={required}
        autoComplete={autoComplete}
        className={cn(
          'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
          'font-poppins text-sm text-hz-dark outline-none transition-colors',
          'placeholder:text-hz-muted/60 focus:border-hz-primary/60'
        )}
      />
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
      className="rounded-hz border border-hz-border bg-[#F8F8F8] px-4 py-3 font-poppins text-sm text-hz-body"
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
