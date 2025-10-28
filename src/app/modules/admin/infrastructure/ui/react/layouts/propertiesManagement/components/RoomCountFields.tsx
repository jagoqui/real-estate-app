import { Label } from '@/components/ui/label';
import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const RoomCountFields = (): React.ReactElement => {
  const form = useFormContext<PropertyFormValues>();
  const bedrooms = form.watch('bedrooms');
  const bathrooms = form.watch('bathrooms');

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <FormattedInput
          id="bedrooms"
          formatType="number"
          value={bedrooms}
          onChange={form.setValue.bind(null, 'bedrooms')}
          placeholder="0"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bathrooms">Bathrooms</Label>
        <FormattedInput
          id="bathrooms"
          formatType="number"
          value={bathrooms}
          onChange={form.setValue.bind(null, 'bathrooms')}
          placeholder="0"
          required
        />
      </div>
    </>
  );
};

RoomCountFields.displayName = 'RoomCountFields';
