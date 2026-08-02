import { useEffect, useId, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { PROPERTY_FORM } from '@/data/property-form-fields';
import { cn } from '@/lib/utils';
import { reverseGeocode, searchLocations, type GeoSuggestion } from '@/services/geo.service';
import { useTheme } from '@/hooks/useTheme';
import type { LocationValue } from '@/components/forms/location-value';

export type { LocationValue } from '@/components/forms/location-value';

// Default Leaflet marker assets break under Vite bundling without this remap.
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationPickerProps {
  value: LocationValue;
  onChange: (next: LocationValue) => void;
  disabled?: boolean;
  required?: boolean;
  countryOptions?: readonly string[];
  className?: string;
}

function isAllowedCountry(code: string | null | undefined, options: readonly string[]): code is string {
  return Boolean(code && options.includes(code));
}

const DEFAULT_CENTER: [number, number] = [-6.1754, 106.8272]; // Jakarta
const DEFAULT_ZOOM = 11;
const PINNED_ZOOM = 15;

function MapViewport({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude == null || longitude == null) return;
    map.setView([latitude, longitude], Math.max(map.getZoom(), PINNED_ZOOM));
  }, [latitude, longitude, map]);

  return null;
}

function MapInteractions({
  disabled,
  onPick,
}: {
  disabled?: boolean;
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (disabled) return;
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

function composeLocationHint(value: LocationValue): string {
  const parts = [value.street, value.city].map((p) => p.trim()).filter(Boolean);
  const base = parts.join(', ');
  if (value.countryCode) {
    return base ? `${base} (${value.countryCode})` : `(${value.countryCode})`;
  }
  return base;
}

export function LocationPicker({
  value,
  onChange,
  disabled = false,
  required = false,
  countryOptions = PROPERTY_FORM.country.options,
  className,
}: LocationPickerProps) {
  const searchId = useId();
  const listId = `${searchId}-list`;
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoSuggestion[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [reverseBusy, setReverseBusy] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const skipReverseRef = useRef(false);

  const hasPin = value.latitude != null && value.longitude != null;
  const center: [number, number] = hasPin
    ? [value.latitude as number, value.longitude as number]
    : DEFAULT_CENTER;

  const { theme } = useTheme();
  const isNavy = theme === 'navy';
  const tileUrl = isNavy
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tileAttribution = isNavy
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  useEffect(() => {
    if (disabled) return;

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      return;
    }

    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      setSearching(true);
      void searchLocations(trimmed, value.countryCode || undefined)
        .then((items) => {
          setSuggestions(items);
          setSearchOpen(true);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setSearching(false));
    }, 350);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query, value.countryCode, disabled]);

  const visibleSuggestions = query.trim().length >= 2 ? suggestions : [];
  const showSuggestions = searchOpen && visibleSuggestions.length > 0;

  const applySuggestion = (item: GeoSuggestion) => {
    skipReverseRef.current = true;
    const country = isAllowedCountry(item.country_code, countryOptions)
      ? item.country_code
      : value.countryCode || 'ID';

    onChange({
      street: item.street || item.label,
      city: item.city || value.city,
      countryCode: country,
      latitude: item.latitude,
      longitude: item.longitude,
    });
    setQuery(item.label);
    setSuggestions([]);
    setSearchOpen(false);
  };

  const setPin = async (lat: number, lng: number, reverseFill: boolean) => {
    onChange({
      ...value,
      latitude: lat,
      longitude: lng,
    });

    if (!reverseFill || disabled || skipReverseRef.current) {
      skipReverseRef.current = false;
      return;
    }

    setReverseBusy(true);
    try {
      const result = await reverseGeocode(lat, lng);
      if (!result) return;

      const country = isAllowedCountry(result.country_code, countryOptions)
        ? result.country_code
        : value.countryCode;

      onChange({
        street: result.street || value.street,
        city: result.city || value.city,
        countryCode: country,
        latitude: lat,
        longitude: lng,
      });
      if (result.label) setQuery(result.label);
    } catch {
      // Keep typed address; pin coords still win.
    } finally {
      setReverseBusy(false);
    }
  };

  const fieldClass = cn(
    'h-11 w-full rounded-hz border border-hz-border px-3',
    'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
    disabled ? 'cursor-default bg-hz-bg-soft' : 'bg-hz-elevated'
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative space-y-1.5">
        <label htmlFor={searchId} className="font-poppins text-sm font-medium text-hz-dark">
          Search location
          {required ? <span className="text-hz-primary"> *</span> : null}
        </label>
        <input
          id={searchId}
          type="search"
          role="combobox"
          aria-expanded={searchOpen}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => visibleSuggestions.length > 0 && setSearchOpen(true)}
          onBlur={() => window.setTimeout(() => setSearchOpen(false), 150)}
          disabled={disabled}
          placeholder="Start typing an address or area…"
          autoComplete="off"
          className={fieldClass}
        />
        <p className="font-poppins text-xs text-hz-muted">
          {searching
            ? 'Searching…'
            : 'If the place is missing from search, pick nearby then drag the pin.'}
        </p>

        {showSuggestions ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-hz border border-hz-border bg-hz-elevated py-1 shadow-md"
          >
            {visibleSuggestions.map((item) => (
              <li key={`${item.label}-${item.latitude}-${item.longitude}`}>
                <button
                  type="button"
                  role="option"
                  className="block w-full px-3 py-2 text-left font-poppins text-sm text-hz-dark hover:bg-hz-bg-soft"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applySuggestion(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={PROPERTY_FORM.street.id} className="font-poppins text-sm font-medium text-hz-dark">
          {PROPERTY_FORM.street.label}
          {required ? <span className="text-hz-primary"> *</span> : null}
        </label>
        <input
          id={PROPERTY_FORM.street.id}
          type="text"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
          required={required}
          disabled={disabled}
          className={fieldClass}
        />
        <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.street.hint}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor={PROPERTY_FORM.city.id} className="font-poppins text-sm font-medium text-hz-dark">
            {PROPERTY_FORM.city.label}
            {required ? <span className="text-hz-primary"> *</span> : null}
          </label>
          <input
            id={PROPERTY_FORM.city.id}
            type="text"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            required={required}
            disabled={disabled}
            className={fieldClass}
          />
          <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.city.hint}</p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={PROPERTY_FORM.country.id}
            className="font-poppins text-sm font-medium text-hz-dark"
          >
            {PROPERTY_FORM.country.label}
            {required ? <span className="text-hz-primary"> *</span> : null}
          </label>
          <select
            id={PROPERTY_FORM.country.id}
            value={value.countryCode}
            onChange={(e) => onChange({ ...value, countryCode: e.target.value })}
            required={required}
            disabled={disabled}
            className={fieldClass}
          >
            {countryOptions.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <p className="font-poppins text-xs text-hz-muted">{PROPERTY_FORM.country.hint}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="font-poppins text-sm font-medium text-hz-dark">
          Map pin
          {required ? <span className="text-hz-primary"> *</span> : null}
        </p>
        <div
          className={cn(
            'overflow-hidden rounded-hz border border-hz-border',
            disabled ? 'pointer-events-none opacity-80' : null
          )}
        >
          <MapContainer
            key={isNavy ? 'navy' : 'light'}
            center={center}
            zoom={hasPin ? PINNED_ZOOM : DEFAULT_ZOOM}
            scrollWheelZoom={!disabled}
            style={{ height: 280, width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution={tileAttribution}
              url={tileUrl}
            />
            <MapViewport latitude={value.latitude} longitude={value.longitude} />
            <MapInteractions
              disabled={disabled}
              onPick={(lat, lng) => {
                void setPin(lat, lng, true);
              }}
            />
            {hasPin ? (
              <Marker
                position={[value.latitude as number, value.longitude as number]}
                draggable={!disabled}
                eventHandlers={{
                  dragend: (event) => {
                    const marker = event.target as L.Marker;
                    const pos = marker.getLatLng();
                    void setPin(pos.lat, pos.lng, true);
                  },
                }}
              />
            ) : null}
          </MapContainer>
        </div>
        <p className="font-poppins text-xs text-hz-muted">
          {hasPin
            ? `${composeLocationHint(value)} · ${value.latitude?.toFixed(5)}, ${value.longitude?.toFixed(5)}${
                reverseBusy ? ' · updating address…' : ''
              }`
            : 'Click the map to drop a pin (required).'}
        </p>
      </div>
    </div>
  );
}
