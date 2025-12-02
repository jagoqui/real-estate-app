import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Sparkles, X } from 'lucide-react';
import React from 'react';

interface FeatureChipInputProps {
  newFeature: string;
  setNewFeature: (value: string) => void;
  featuresList: Array<string>;
  handleAddFeature: () => void;
  handleRemoveFeature: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage: string;
  clearError: () => void;
}

export const FeatureChipInput = ({
  newFeature,
  setNewFeature,
  featuresList,
  handleAddFeature,
  handleRemoveFeature,
  handleKeyDown,
  errorMessage,
  clearError,
}: FeatureChipInputProps): React.ReactElement => {
  return (
    <div className="space-y-2 sm:col-span-2">
      <Label htmlFor="highlightedFeatures">
        Highlighted Features <Sparkles className="inline w-4 h-4" />
      </Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="highlightedFeatures"
            value={newFeature}
            onChange={e => {
              setNewFeature(e.target.value);
              if (errorMessage) clearError();
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Pool, Garden, Garage"
            className={errorMessage ? 'border-red-500' : ''}
          />
          {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
        </div>
        <Button type="button" onClick={handleAddFeature} size="icon" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {featuresList.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {featuresList.map((feature, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1 pr-1">
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="ml-1 hover:bg-destructive/10 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${feature}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

FeatureChipInput.displayName = 'FeatureChipInput';
