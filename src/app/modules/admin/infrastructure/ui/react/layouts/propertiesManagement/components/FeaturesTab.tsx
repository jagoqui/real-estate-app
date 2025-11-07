import { Label } from '@/components/ui/label';
import { AmenityForm } from '@/modules/shared/infrastructure/ui/react/components/amenityForm/amenityForm';
import React from 'react';

import { useFeatureChips } from '../hooks/useFeatureChips';
import { FeatureChipInput } from './FeatureChipInput';

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
