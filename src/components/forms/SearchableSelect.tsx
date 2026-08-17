import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly SearchableSelectOption[];
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}

/**
 * Tiny filterable select (no cmdk). Type to narrow → Enter / click to pick.
 * Use for medium lists (countries). Prefer FormSelect for ≤8 fixed options.
 */
export function SearchableSelect({
  id: idProp,
  label,
  value,
  onChange,
  onBlur,
  options,
  disabled,
  required,
  error,
  hint,
  placeholder = 'Search or select…',
  className,
}: SearchableSelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const listId = `${id}-list`;
  const errorId = error ? `${id}-error` : undefined;

  const selected = options.find((o) => o.value === value);
  const selectedLabel = selected?.label ?? '';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(selectedLabel);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // While closed the field always mirrors the committed selection, so an external
  // `value` change needs no state sync — the draft query only matters when open.
  const displayValue = open ? query : selectedLabel;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...options];
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [options, query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery(selectedLabel);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [onBlur, selectedLabel]);

  const pick = (opt: SearchableSelectOption) => {
    onChange(opt.value);
    setQuery(opt.label);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && filtered[highlight]) {
        e.preventDefault();
        pick(filtered[highlight]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery(selectedLabel);
    }
  };

  return (
    <div ref={rootRef} className={cn('relative space-y-1.5', className)}>
      <label htmlFor={id} className="font-poppins text-sm font-medium text-hz-dark">
        {label}
        {required ? <span className="text-hz-primary"> *</span> : null}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          autoComplete="off"
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onBlur={() => {
            // Delay so click on option can fire first.
            window.setTimeout(() => {
              if (!rootRef.current?.contains(document.activeElement)) {
                setOpen(false);
                setQuery(selectedLabel);
                onBlur?.();
              }
            }, 120);
          }}
          onKeyDown={onKeyDown}
          className={cn(
            'h-11 w-full rounded-hz border bg-hz-elevated py-2 pr-10 pl-3',
            'font-poppins text-sm text-hz-dark outline-none transition-colors',
            'placeholder:text-hz-muted/60 focus:border-hz-primary/60',
            'disabled:cursor-not-allowed disabled:opacity-60',
            error ? 'border-hz-primary/70' : 'border-hz-border',
          )}
        />
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-hz-muted"
          aria-hidden
        />
      </div>

      {open && !disabled ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-52 w-full overflow-auto rounded-hz border border-hz-border bg-hz-elevated py-1 shadow-hz-md"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 font-poppins text-sm text-hz-muted">No matches</li>
          ) : (
            filtered.map((opt, index) => (
              <li key={opt.value} role="option" aria-selected={opt.value === value}>
                <button
                  type="button"
                  className={cn(
                    'flex w-full px-3 py-2 text-left font-poppins text-sm transition-colors',
                    index === highlight || opt.value === value
                      ? 'bg-hz-sunken text-hz-ink'
                      : 'text-hz-body hover:bg-hz-sunken/70',
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => pick(opt)}
                >
                  {opt.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}

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
