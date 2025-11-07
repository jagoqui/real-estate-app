import { Upload } from 'lucide-react';
import React from 'react';

interface ImageUploadAreaProps {
  isUploadDisabled: boolean;
  isDragging: boolean;
  maxFileSize: number;
  remainingSlots: number;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onClick?: () => void;
}

export const ImageUploadArea = ({
  isUploadDisabled,
  isDragging,
  maxFileSize,
  remainingSlots,
  onDrop,
  onDragOver,
  onDragLeave,
  onClick,
}: ImageUploadAreaProps): React.ReactElement => {
  return (
    <div
      className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-colors
        ${isDragging && !isUploadDisabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
        ${isUploadDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'}
      `}
      onDrop={isUploadDisabled ? undefined : onDrop}
      onDragOver={isUploadDisabled ? undefined : onDragOver}
      onDragLeave={isUploadDisabled ? undefined : onDragLeave}
      onClick={isUploadDisabled ? undefined : onClick}
    >
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm">
          {isUploadDisabled ? (
            <span className="font-medium">Maximum images reached</span>
          ) : (
            <>
              <span className="font-medium">Click to upload</span> or drag and drop
            </>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {isUploadDisabled ? (
            `Remove some images to upload more`
          ) : (
            <>
              PNG, JPG, WebP up to {maxFileSize}MB • {remainingSlots} remaining
            </>
          )}
        </div>
      </div>
    </div>
  );
};
