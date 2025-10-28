'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Amenity } from '@/modules/shared/domain/schemas/amenity.schema';
import type { LucideIconName } from '@/modules/shared/domain/schemas/lucideIcon.schema';
import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DynamicIcon } from '../dynamicIcon/dynamicIcon';
import { IconPicker } from '../iconPicker/iconPicker';

type AmenityFormProps = {
  onValidationChange?: (isValid: boolean) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

// eslint-disable-next-line max-lines-per-function
export const AmenityForm = ({ onValidationChange, ...props }: AmenityFormProps): React.ReactElement => {
  const form = useFormContext<PropertyFormValues>();
  const amenities = form.watch('amenities');

  const [currentName, setCurrentName] = useState('');
  const [currentIcon, setCurrentIcon] = useState<LucideIconName>();
  const [errorMessage, setErrorMessage] = useState('');

  // Check if there's an incomplete amenity (partial input)
  const hasIncompleteAmenity = Boolean(currentName.trim() || currentIcon);
  const isFormValid = !hasIncompleteAmenity;

  // Memoize excluded icons to prevent re-renders
  const excludedIcons = useMemo(() => amenities.map(amenity => amenity.icon), [amenities]);

  // Notify parent component about validation status changes
  useEffect(() => {
    onValidationChange?.(isFormValid);
  }, [isFormValid, onValidationChange]);

  const updateAmenities = useCallback(
    (updatedAmenities: Array<Amenity>): void => {
      form.setValue('amenities', updatedAmenities);
    },
    [form]
  );

  const handleAdd = useCallback((): void => {
    if (!currentName.trim() || !currentIcon) {
      setErrorMessage('Please fill in both name and icon');
      return;
    }

    // Check for duplicate names (case-insensitive)
    const normalizedName = currentName.trim().toLowerCase();
    const isDuplicate = amenities.some(amenity => amenity.name.toLowerCase() === normalizedName);

    if (isDuplicate) {
      setErrorMessage('This amenity already exists');
      return;
    }

    const newAmenity: Amenity = {
      id: crypto.randomUUID(),
      name: currentName.trim(),
      icon: currentIcon,
    };

    const updatedAmenities = [...amenities, newAmenity];
    updateAmenities(updatedAmenities);
    setCurrentName('');
    setCurrentIcon(undefined);
    setErrorMessage('');
  }, [currentName, currentIcon, amenities, updateAmenities]);

  const handleRemove = useCallback(
    (id: string): void => {
      const updatedAmenities = amenities.filter(a => a.id !== id);
      updateAmenities(updatedAmenities);
    },
    [amenities, updateAmenities]
  );

  const handleIconSelect = useCallback((icon: LucideIconName): void => {
    setCurrentIcon(icon);
  }, []);

  return (
    <div {...props}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Property Amenities</Label>
          {hasIncompleteAmenity && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Complete the amenity to save the form
            </span>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="amenity-name" className="text-sm font-medium">
              Amenity Name
            </Label>
            <Input
              id="amenity-name"
              placeholder="e.g. Pool, WiFi, Gym"
              value={currentName}
              onChange={e => {
                setCurrentName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
              className={errorMessage ? 'border-red-500' : ''}
            />
            {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Associated Icon</Label>
            <IconPicker value={currentIcon} onSelect={handleIconSelect} excludedIcons={excludedIcons} />
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={handleAdd} disabled={!currentName.trim() || !currentIcon} className="w-full">
              Add Amenity
            </Button>
          </div>
        </div>
      </div>

      {amenities.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {amenities.map(amenity => (
              <div key={amenity.id} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm">
                <DynamicIcon name={amenity.icon} className="h-4 w-4" />
                <span>{amenity.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleRemove(amenity.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
