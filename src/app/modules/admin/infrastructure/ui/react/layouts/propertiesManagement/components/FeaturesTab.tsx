import { Label } from '@/components/ui/label';
import { AmenityForm, type Amenity } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import React from 'react';

import { useFeatureChips } from '../hooks/useFeatureChips';
import { FeatureChipInput } from './FeatureChipInput';
import { RoomCountFields } from './RoomCountFields';

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
  const { newFeature, setNewFeature, featuresList, handleAddFeature, handleRemoveFeature, handleKeyDown } =
    useFeatureChips({
      features: formData.features,
      onChange: (features: string) => onChange({ features }),
    });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FeatureChipInput
        newFeature={newFeature}
        setNewFeature={setNewFeature}
        featuresList={featuresList}
        handleAddFeature={handleAddFeature}
        handleRemoveFeature={handleRemoveFeature}
        handleKeyDown={handleKeyDown}
      />

      <div className="space-y-2 sm:col-span-2">
        <Label>Amenities</Label>
        <AmenityForm
          value={formData.amenities}
          onValueChange={(amenities: Array<Amenity>) => onChange({ amenities })}
        />
      </div>

      <RoomCountFields bedrooms={formData.bedrooms} bathrooms={formData.bathrooms} onChange={onChange} />
    </div>
  );
};

FeaturesTab.displayName = 'FeaturesTab';
