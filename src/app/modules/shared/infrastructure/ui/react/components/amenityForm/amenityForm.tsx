'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { DynamicIcon, type LucideIconName } from '../dynamicIcon/dynamicIcon';
import { IconPicker } from '../iconPicker/iconPicker';

export interface Amenity {
  id: string;
  name: string;
  icon: LucideIconName;
}

type AmenityFormProps = {
  value?: Array<Amenity>;
  onValueChange?: (amenities: Array<Amenity>) => void;
  onSave?: (amenities: Array<Amenity>) => void;
  initialAmenities?: Array<Amenity>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

// eslint-disable-next-line max-lines-per-function
export const AmenityForm = ({
  value = [],
  onValueChange,
  onSave,
  initialAmenities = [],
  ...props
}: AmenityFormProps): React.ReactElement => {
  // Use controlled value if provided, otherwise use internal state
  const amenities = value.length > 0 ? value : initialAmenities;
  const [currentName, setCurrentName] = useState('');
  const [currentIcon, setCurrentIcon] = useState<LucideIconName>();

  const updateAmenities = useCallback(
    (updatedAmenities: Array<Amenity>): void => {
      onValueChange?.(updatedAmenities);
      onSave?.(updatedAmenities);
    },
    [onValueChange, onSave]
  );

  const handleAdd = useCallback((): void => {
    if (!currentName.trim() || !currentIcon) {
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
        <Label>Property Amenities</Label>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="amenity-name" className="text-sm font-medium">
              Amenity Name
            </Label>
            <Input
              id="amenity-name"
              placeholder="e.g. Pool, WiFi, Gym"
              value={currentName}
              onChange={e => setCurrentName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Associated Icon</Label>
            <IconPicker value={currentIcon} onSelect={handleIconSelect} />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAdd} disabled={!currentName.trim() || !currentIcon} className="w-full">
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
