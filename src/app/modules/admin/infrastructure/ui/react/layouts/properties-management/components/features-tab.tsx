import { Label } from '@/components/ui/label';
import { AmenityForm } from '@/modules/shared/infrastructure/ui/react/components/amenity-form/amenity-form';
import React from 'react';

import { useFeatureChips } from '../hooks/use-feature-chips';
import { FeatureChipInput } from './feature-chipInput';

export const FeaturesTab = (): React.ReactElement => {
  const {
    newFeature,
    setNewFeature,
    featuresList,
    handleAddFeature,
    handleRemoveFeature,
    handleKeyDown,
    errorMessage,
    clearError,
  } = useFeatureChips();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FeatureChipInput
        newFeature={newFeature}
        setNewFeature={setNewFeature}
        featuresList={featuresList}
        handleAddFeature={handleAddFeature}
        handleRemoveFeature={handleRemoveFeature}
        handleKeyDown={handleKeyDown}
        errorMessage={errorMessage}
        clearError={clearError}
      />

      <div className="space-y-2 sm:col-span-2">
        <Label>Amenities</Label>
        <AmenityForm />
      </div>
    </div>
  );
};

FeaturesTab.displayName = 'FeaturesTab';
