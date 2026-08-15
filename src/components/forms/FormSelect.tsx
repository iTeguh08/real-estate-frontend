import { cn } from '@/lib/utils';

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly FormSelectOption[] | readonly string[];
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}

function normalizeOptions(
  options: readonly FormSelectOption[] | readonly string[],
): FormSelectOption[] {
  return options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  );
}

/** Lightweight native select — best for short fixed lists (inquiry type, currency). */
export function FormSelect({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  disabled,
  required,
  error,
  hint,
  placeholder,
  className,
}: FormSelectProps) {
  const items = normalizeOptions(options);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="font-poppins text-sm font-medium text-hz-dark">
        {label}
        {required ? <span className="text-hz-primary"> *</span> : null}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          'h-11 w-full rounded-hz border bg-hz-elevated px-3',
          'font-poppins text-sm text-hz-dark outline-none transition-colors',
          'focus:border-hz-primary/60 disabled:cursor-not-allowed disabled:opacity-60',
          error ? 'border-hz-primary/70' : 'border-hz-border',
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
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
