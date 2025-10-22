import { useState } from 'react';

interface UseFeatureChipsProps {
  features: string;
  onChange: (features: string) => void;
}

interface UseFeatureChipsReturn {
  newFeature: string;
  setNewFeature: (value: string) => void;
  featuresList: Array<string>;
  handleAddFeature: () => void;
  handleRemoveFeature: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const useFeatureChips = ({ features, onChange }: UseFeatureChipsProps): UseFeatureChipsReturn => {
  const [newFeature, setNewFeature] = useState('');

  // Parse features from comma-separated string
  const featuresList = features
    ? features
        .split(',')
        .map(f => f.trim())
        .filter(Boolean)
    : [];

  const handleAddFeature = (): void => {
    if (!newFeature.trim()) return;

    const updatedFeatures = [...featuresList, newFeature.trim()];
    onChange(updatedFeatures.join(', '));
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number): void => {
    const updatedFeatures = featuresList.filter((_, i) => i !== index);
    onChange(updatedFeatures.join(', '));
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
    featuresList,
    handleAddFeature,
    handleRemoveFeature,
    handleKeyDown,
  };
};
