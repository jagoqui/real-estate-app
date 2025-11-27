import type { PropertyFormValues } from '@/modules/shared/infrastructure/schemas/propertyForm.schema';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ERROR_DISPLAY_DURATION = 3000;
const MAX_FEATURES = 12;

const processFeaturesInput = (
  input: string,
  existingFeatures: Array<string>
): { unique: Array<string>; duplicates: Array<string> } => {
  const newFeatures = input
    .split(',')
    .map(f => f.trim())
    .filter(Boolean);

  const normalizedExisting = existingFeatures.map(f => f.toLowerCase());
  const duplicates: Array<string> = [];
  const unique: Array<string> = [];

  newFeatures.forEach(feature => {
    const normalized = feature.toLowerCase();
    const isDuplicate =
      normalizedExisting.includes(normalized) || unique.map(f => f.toLowerCase()).includes(normalized);

    if (isDuplicate) {
      duplicates.push(feature);
    } else {
      unique.push(feature);
    }
  });

  return { unique, duplicates };
};

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

    const { unique, duplicates } = processFeaturesInput(newFeature, features);

    if (unique.length === 0 && duplicates.length === 0) {
      setErrorMessage('Please enter at least one valid feature');
      return;
    }

    if (duplicates.length > 0 && unique.length === 0) {
      const pluralFeatures = duplicates.length > 1 ? 's' : '';
      const pluralVerb = duplicates.length === 1 ? 's' : '';
      setErrorMessage(`Feature${pluralFeatures} already exist${pluralVerb}: ${duplicates.join(', ')}`);
      return;
    }

    // Check max features limit
    const totalFeatures = features.length + unique.length;
    if (totalFeatures > MAX_FEATURES) {
      const remaining = MAX_FEATURES - features.length;
      setErrorMessage(
        `Maximum ${MAX_FEATURES} features allowed. You can add ${remaining} more feature${remaining !== 1 ? 's' : ''}.`
      );
      return;
    }

    form.setValue('highlightedFeatures', [...features, ...unique]);
    setNewFeature('');

    if (duplicates.length > 0) {
      const plural = unique.length > 1 ? 's' : '';
      setErrorMessage(`Added ${unique.length} feature${plural}. Skipped duplicates: ${duplicates.join(', ')}`);
      setTimeout(() => setErrorMessage(''), ERROR_DISPLAY_DURATION);
    } else {
      setErrorMessage('');
    }
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
