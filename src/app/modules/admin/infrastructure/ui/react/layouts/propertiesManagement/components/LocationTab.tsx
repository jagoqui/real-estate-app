import {
  LocationPicker,
  type SearchSuggestion,
} from '@/modules/shared/infrastructure/ui/react/components/locationPicker/locationPicker';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface LocationFormData {
  address: string;
  city: string;
  state: string;
  country: string;
  location: { lat: number; lng: number };
}

export const LocationTab = (): React.ReactElement => {
  const form = useFormContext<LocationFormData>();
  const location = form.watch('location') || { lat: 0, lng: 0 };

  const handleLocationChange = (location: SearchSuggestion | undefined): void => {
    if (!location) return;
    const parts = location.display_name.split(',').map(part => part.trim());
    form.setValue('location', { lat: parseFloat(location.lat), lon: parseFloat(location.lon) });
    form.setValue('address', location.display_name);
    form.setValue('city', parts[0] || '');
    form.setValue('state', parts[1] || '');
    form.setValue('country', parts[parts.length - 1] || '');
  };

  const currentValue: SearchSuggestion | undefined =
    location.lat && location.lng
      ? {
          lat: location.lat.toString(),
          lon: location.lng.toString(),
          display_name: '',
        }
      : undefined;

  return (
    <div className="space-y-4">
      <LocationPicker value={currentValue} onValueChange={handleLocationChange} />
    </div>
  );
};

LocationTab.displayName = 'LocationTab';
