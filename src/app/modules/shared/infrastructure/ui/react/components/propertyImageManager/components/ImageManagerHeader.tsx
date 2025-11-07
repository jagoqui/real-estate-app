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
    <div className="flex items-center justify-between gap-2">
      <Label className="text-sm sm:text-base">Property Images</Label>
      <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0">
        {currentCount} / {maxImages}
        <span className="hidden sm:inline"> images</span>
        {remainingSlots > 0 && (
          <>
            <span className="hidden xs:inline">
              {' '}
              • {remainingSlots} slot{remainingSlots !== 1 ? 's' : ''}
            </span>
          </>
        )}
      </span>
    </div>
  );
};
