'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { DynamicIcon, type LucideIconName } from '../dynamicIcon/dynamicIcon';
import { IconPicker } from '../iconPicker/iconPicker';

export interface Amenity {
  id: string;
  name: string;
  icon: LucideIconName;
}

interface AmenityFormProps {
  onSave?: (amenities: Array<Amenity>) => void;
  initialAmenities?: Array<Amenity>;
}

// eslint-disable-next-line max-lines-per-function
export const AmenityForm = ({ onSave, initialAmenities = [] }: AmenityFormProps): React.ReactElement => {
  const [amenities, setAmenities] = useState<Array<Amenity>>(initialAmenities);
  const [currentName, setCurrentName] = useState('');
  const [currentIcon, setCurrentIcon] = useState<LucideIconName>();

  const handleAdd = (): void => {
    if (!currentName.trim() || !currentIcon) {
      return;
    }

    const newAmenity: Amenity = {
      id: crypto.randomUUID(),
      name: currentName.trim(),
      icon: currentIcon,
    };

    const updatedAmenities = [...amenities, newAmenity];
    setAmenities(updatedAmenities);
    setCurrentName('');
    setCurrentIcon(undefined);
  };

  const handleRemove = (id: string): void => {
    const updatedAmenities = amenities.filter(a => a.id !== id);
    setAmenities(updatedAmenities);
  };

  const handleSave = (): void => {
    onSave?.(amenities);

    console.log;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Property Amenities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 w-full">
        {/* Form to add a new amenity */}
        <div className="space-y-4">
          <div className="grid gap-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="amenity-name">Amenity Name</Label>
              <Input
                id="amenity-name"
                placeholder="e.g.: Pool, WiFi, Gym"
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
              <Label>Icon</Label>
              <IconPicker value={currentIcon} onSelect={setCurrentIcon} />
            </div>
          </div>
          <Button onClick={handleAdd} disabled={!currentName.trim() || !currentIcon}>
            Add Amenity
          </Button>
        </div>

        {amenities.length > 0 && (
          <div className="space-y-2">
            <Label>Added Amenities ({amenities.length})</Label>
            <div className="grid gap-2 w-full">
              {amenities.map(amenity => (
                <div key={amenity.id} className="flex items-center gap-2 rounded-md border p-3 bg-muted/50">
                  <DynamicIcon name={amenity.icon} className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1 text-sm truncate">{amenity.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={() => handleRemove(amenity.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {onSave && amenities.length > 0 && (
          <Button onClick={handleSave} className="w-full">
            Save Amenities
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
