/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable max-lines-per-function */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import L, { type LeafletMouseEvent } from 'leaflet';
import { Loader2, MapPin, Navigation, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: (() => string) | undefined })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface SearchSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationPickerProps {
  value?: SearchSuggestion;
  onValueChange?: (location: SearchSuggestion | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface NominatimResult extends SearchSuggestion {
  place_id: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];
  class: string;
  type: string;
  importance: number;
}

// Component to handle map clicks
const MapClickHandler = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lon: number) => void;
}): React.ReactElement | null => {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// Component to update map view without recreating the map
const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }): React.ReactElement | null => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

export const LocationPicker = ({
  value,
  onValueChange,
  placeholder = 'Search for an address...',
  disabled = false,
  className = '',
}: LocationPickerProps): React.ReactElement => {
  const SEARCH_DELAY_MS = 500;
  const MAP_HEIGHT = 400;
  const DEFAULT_ZOOM = 13;
  const SEARCH_ZOOM = 15;

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<NominatimResult>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<SearchSuggestion | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]); // Default: NYC
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Reverse geocode coordinates to get address
  const reverseGeocode = useCallback(
    async (lat: number, lon: number): Promise<void> => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );
        const data = (await response.json()) as NominatimResult;

        if (data?.display_name) {
          const location: SearchSuggestion = {
            display_name: data.display_name,
            lat: lat.toString(),
            lon: lon.toString(),
          };
          setCurrentLocation(location);
          onValueChange?.(location);
        }
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
      }
    },
    [onValueChange]
  );

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation && !value) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setMapCenter([lat, lon]);
          void reverseGeocode(lat, lon);
          setIsGettingLocation(false);
        },
        error => {
          console.warn('Could not get current location:', error);
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
      );
    }
  }, [value, reverseGeocode]);

  // Initialize with value if provided
  useEffect(() => {
    if (value) {
      setCurrentLocation(value);
      setMapCenter([parseFloat(value.lat), parseFloat(value.lon)]);
      setMapZoom(SEARCH_ZOOM);
    }
  }, [value]);

  // Search for addresses using Nominatim API
  const searchAddresses = useCallback(async (query: string): Promise<void> => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const json = (await response.json()) as unknown;
      const data: Array<NominatimResult> = Array.isArray(json) ? (json as Array<NominatimResult>) : [];
      setSuggestions(data);
    } catch (error) {
      console.error('Address search failed:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input changes with debouncing
  const handleSearchChange = useCallback(
    (query: string): void => {
      setSearchQuery(query);
      setShowSuggestions(true);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        void searchAddresses(query);
      }, SEARCH_DELAY_MS);
    },
    [searchAddresses]
  );

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: NominatimResult): void => {
      const location: SearchSuggestion = {
        display_name: suggestion.display_name,
        lat: suggestion.lat,
        lon: suggestion.lon,
      };

      setSearchQuery(suggestion.display_name);
      setCurrentLocation(location);
      setMapCenter([parseFloat(suggestion.lat), parseFloat(suggestion.lon)]);
      setMapZoom(SEARCH_ZOOM);
      setShowSuggestions(false);
      onValueChange?.(location);
    },
    [onValueChange]
  );

  // Handle map click
  const handleMapClick = useCallback(
    (lat: number, lon: number): void => {
      void reverseGeocode(lat, lon);
      setMapCenter([lat, lon]);
    },
    [reverseGeocode]
  );

  // Handle current location button
  const [showPermissionError, setShowPermissionError] = useState(false);

  const requestGeolocationPermission = useCallback(async (): Promise<GeolocationPosition> => {
    try {
      await navigator.permissions.query({ name: 'geolocation' });

      return await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            setShowPermissionError(false);
            resolve(position);
          },
          error => {
            if (error.code === 1) {
              // PERMISSION_DENIED
              setShowPermissionError(true);
              reject(new Error('Location permission denied. Please enable location access in your browser settings.'));
            } else {
              reject(new Error(error.message));
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });
    } catch {
      setShowPermissionError(true);
      throw new Error('Failed to request location permission');
    }
  }, []);

  const handleGetCurrentLocation = useCallback(async (): Promise<void> => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    try {
      setIsGettingLocation(true);
      const position = await requestGeolocationPermission();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Update map immediately
      setMapCenter([lat, lon]);
      setMapZoom(SEARCH_ZOOM);

      // Reverse geocode the coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address details');
      }

      const data = (await response.json()) as NominatimResult;

      if (data?.display_name) {
        const location: SearchSuggestion = {
          display_name: data.display_name,
          lat: lat.toString(),
          lon: lon.toString(),
        };

        // Update all relevant state
        setCurrentLocation(location);
        setSearchQuery(data.display_name);
        setShowSuggestions(false);
        onValueChange?.(location);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsGettingLocation(false);
    }
  }, [onValueChange, SEARCH_ZOOM, requestGeolocationPermission]);

  // Clear selection
  const handleClear = useCallback((): void => {
    setSearchQuery('');
    setCurrentLocation(null);
    setShowSuggestions(false);
    onValueChange?.(undefined);
  }, [onValueChange]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return (): void => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="space-y-2">
        <Label>Search Address</Label>
        <div className="relative">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="pr-20"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay hiding suggestions to allow clicking on them
                setTimeout(() => setShowSuggestions(false), 150);
              }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isSearching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              {searchQuery && (
                <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleClear}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-popover border rounded-md shadow-md" style={{ zIndex: 1000 }}>
              <ScrollArea className="max-h-48">
                <div className="p-1">
                  {suggestions.map(suggestion => (
                    <button
                      key={suggestion.place_id}
                      className="w-full text-left p-2 hover:bg-accent rounded-sm text-sm"
                      onMouseDown={e => {
                        // Prevent input from losing focus
                        e.preventDefault();
                        handleSuggestionSelect(suggestion);
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{suggestion.display_name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>

      {/* Selected Location Display */}
      <div className="space-y-2">
        <Label>Selected Location</Label>
        <div className="relative">
          <Input
            value={currentLocation?.display_name || ''}
            readOnly
            placeholder="No location selected"
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              void handleGetCurrentLocation();
            }}
            disabled={isGettingLocation}
            title="Use current location"
          >
            {isGettingLocation ? <Loader2 className="h-3 w-3 animate-spin" /> : <Navigation className="h-3 w-3" />}
          </Button>
          {showPermissionError && (
            <div className="mt-2 text-sm text-destructive flex items-center gap-2">
              <span>
                Location access was denied. Please enable location access in your browser settings and try again.
              </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto font-medium hover:underline"
                onClick={() => {
                  // Detect browser and show specific instructions
                  const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
                  const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

                  let instructions = '';
                  if (isChrome) {
                    instructions =
                      '1. Click the lock icon 🔒 in the address bar\n2. Click "Site settings"\n3. Allow location access\n4. Reload the page';
                  } else if (isFirefox) {
                    instructions =
                      '1. Click the lock icon 🔒 in the address bar\n2. Clear the "Block" setting for Location\n3. Reload the page';
                  } else {
                    instructions =
                      'Please enable location access in your browser settings:\n1. Look for the lock icon 🔒 in the address bar\n2. Check location permissions\n3. Reload the page after enabling';
                  }

                  alert(instructions);
                  setShowPermissionError(false);
                }}
              >
                How to enable?
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="space-y-2">
        <Label>Map (Click to select exact location)</Label>
        <div className="rounded-md overflow-hidden border">
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: MAP_HEIGHT, width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            <MapClickHandler onLocationSelect={handleMapClick} />
            {currentLocation && (
              <Marker position={[parseFloat(currentLocation.lat), parseFloat(currentLocation.lon)]}>
                <Popup>
                  <div className="text-sm max-w-xs">
                    <strong>Selected Location:</strong>
                    <br />
                    {currentLocation.display_name}
                    <br />
                    <small className="text-muted-foreground">
                      {currentLocation.lat}, {currentLocation.lon}
                    </small>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Coordinates Display (for debugging) */}
      {currentLocation && (
        <div className="text-xs text-muted-foreground">
          Coordinates: {parseFloat(currentLocation.lat).toFixed(6)}, {parseFloat(currentLocation.lon).toFixed(6)}
        </div>
      )}
    </div>
  );
};
