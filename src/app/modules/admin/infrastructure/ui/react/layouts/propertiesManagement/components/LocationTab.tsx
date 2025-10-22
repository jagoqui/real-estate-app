import {
  LocationPicker,
  type SearchSuggestion,
} from '@/modules/shared/infrastructure/ui/react/components/locationPicker/locationPicker';
import React from 'react';

interface LocationTabProps {
  formData: {
    city: string;
    state: string;
    country: string;
    location: { lat: number; lng: number };
  };
  onChange: (updates: Partial<LocationTabProps['formData']>) => void;
}

export const LocationTab = React.memo(({ formData, onChange }: LocationTabProps) => {
  const handleLocationChange = (location: SearchSuggestion | undefined): void => {
    if (!location) return;

    // Parse address parts from display_name
    const parts = location.display_name.split(',').map(part => part.trim());
    onChange({
      location: { lat: parseFloat(location.lat), lng: parseFloat(location.lon) },
      city: parts[0] || '',
      state: parts[1] || '',
      country: parts[parts.length - 1] || '',
    });
  };

  const currentValue: SearchSuggestion | undefined =
    formData.location.lat && formData.location.lng
      ? {
          lat: formData.location.lat.toString(),
          lon: formData.location.lng.toString(),
          display_name: `${formData.city}, ${formData.state}, ${formData.country}`,
        }
      : undefined;

  return (
    <div className="space-y-4">
      <LocationPicker value={currentValue} onValueChange={handleLocationChange} />
    </div>
  );
});

LocationTab.displayName = 'LocationTab';
