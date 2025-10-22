import { Label } from '@/components/ui/label';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import React from 'react';

interface RoomCountFieldsProps {
  bedrooms: string;
  bathrooms: string;
  onChange: (updates: { bedrooms?: string; bathrooms?: string }) => void;
}

export const RoomCountFields = ({ bedrooms, bathrooms, onChange }: RoomCountFieldsProps): React.ReactElement => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <FormattedInput
          id="bedrooms"
          formatType="number"
          value={bedrooms}
          onChange={(value: string) => onChange({ bedrooms: value })}
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
          onChange={(value: string) => onChange({ bathrooms: value })}
          placeholder="0"
          required
        />
      </div>
    </>
  );
};

RoomCountFields.displayName = 'RoomCountFields';
