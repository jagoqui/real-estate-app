import { Label } from '@/components/ui/label';
import React from 'react';

interface ImageManagerHeaderProps {
  currentCount: number;
  maxImages: number;
  remainingSlots: number;
}

export const ImageManagerHeader = ({
  currentCount,
  maxImages,
  remainingSlots,
}: ImageManagerHeaderProps): React.ReactElement => {
  return (
    <div className="flex items-center justify-between">
      <Label>Property Images</Label>
      <span className="text-xs text-muted-foreground">
        {currentCount} / {maxImages} images
        {remainingSlots > 0 && ` • ${remainingSlots} slot${remainingSlots !== 1 ? 's' : ''} available`}
      </span>
    </div>
  );
};
