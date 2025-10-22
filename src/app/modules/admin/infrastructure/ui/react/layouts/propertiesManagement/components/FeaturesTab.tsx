import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AmenityForm, type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import React from 'react';

interface FeaturesTabProps {
  formData: {
    features: string;
    amenities: Array<Amenity>;
    bedrooms: string;
    bathrooms: string;
  };
  onChange: (updates: Partial<FeaturesTabProps['formData']>) => void;
}

export const FeaturesTab = ({ formData, onChange }: FeaturesTabProps): React.ReactElement => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="features">Features</Label>
        <Input
          id="features"
          value={formData.features}
          onChange={e => onChange({ features: e.target.value })}
          placeholder="e.g., Pool, Garden, Garage"
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label>Amenities</Label>
        <AmenityForm
          value={formData.amenities}
          onValueChange={(amenities: Array<Amenity>) => onChange({ amenities })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <FormattedInput
          id="bedrooms"
          formatType="number"
          value={formData.bedrooms}
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
          value={formData.bathrooms}
          onChange={(value: string) => onChange({ bathrooms: value })}
          placeholder="0"
          required
        />
      </div>
    </div>
  );
};

FeaturesTab.displayName = 'FeaturesTab';
