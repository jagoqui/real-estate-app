import { LocationPicker } from '@/modules/shared//presentation/react/components/location-picker/location-picker';
import type { PropertyCommand } from '@/modules/shared/application/commands/property.command';
import type { Location } from '@/modules/shared/domain/models/location.model';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const LocationTab = (): React.ReactElement => {
  const form = useFormContext<PropertyCommand>();
  const location = form.watch('location') || { lat: '0', lng: '0' };

  const handleLocationChange = (location: Location | undefined): void => {
    if (!location) return;
    const parts = location.displayName.split(',').map(part => part.trim());
    form.setValue('location', location);
    form.setValue('address', location.displayName);
    form.setValue('city', parts[0] || '');
    form.setValue('state', parts[1] || '');
    form.setValue('country', parts[parts.length - 1] || '');
  };

  const currentValue: Location | undefined = location.lat && location.lon ? location : undefined;

  return (
    <div className="space-y-4">
      <LocationPicker value={currentValue} onValueChange={handleLocationChange} />
    </div>
  );
};

LocationTab.displayName = 'LocationTab';
