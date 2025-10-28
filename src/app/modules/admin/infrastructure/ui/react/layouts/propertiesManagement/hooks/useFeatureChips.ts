import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface UseFeatureChipsReturn {
  newFeature: string;
  setNewFeature: (value: string) => void;
  featuresList: Array<string>;
  handleAddFeature: () => void;
  handleRemoveFeature: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage: string;
  clearError: () => void;
}

export const useFeatureChips = (): UseFeatureChipsReturn => {
  const [newFeature, setNewFeature] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useFormContext<PropertyFormValues>();

  const features = form.watch('highlightedFeatures');

  const clearError = (): void => {
    setErrorMessage('');
  };

  const handleAddFeature = (): void => {
    if (!newFeature.trim()) {
      setErrorMessage('Please enter a feature');
      return;
    }

    // Check for duplicates (case-insensitive)
    const normalizedNewFeature = newFeature.trim().toLowerCase();
    const isDuplicate = features.some(feature => feature.toLowerCase() === normalizedNewFeature);

    if (isDuplicate) {
      setErrorMessage('This feature already exists');
      return;
    }

    const updatedFeatures = [...features, newFeature.trim()];
    form.setValue('highlightedFeatures', updatedFeatures);
    setNewFeature('');
    setErrorMessage('');
  };

  const handleRemoveFeature = (index: number): void => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    form.setValue('highlightedFeatures', updatedFeatures);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  return {
    newFeature,
    setNewFeature,
    featuresList: features,
    handleAddFeature,
    handleRemoveFeature,
    handleKeyDown,
    errorMessage,
    clearError,
  };
};
