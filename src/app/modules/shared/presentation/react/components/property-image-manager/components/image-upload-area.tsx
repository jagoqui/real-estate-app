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
        border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-colors touch-manipulation
        ${isDragging && !isUploadDisabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
        ${isUploadDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5 active:bg-primary/10'}
      `}
      onDrop={isUploadDisabled ? undefined : onDrop}
      onDragOver={isUploadDisabled ? undefined : onDragOver}
      onDragLeave={isUploadDisabled ? undefined : onDragLeave}
      onClick={isUploadDisabled ? undefined : onClick}
      role="button"
      aria-label="Upload images"
      tabIndex={isUploadDisabled ? -1 : 0}
    >
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
        <div className="text-xs sm:text-sm">
          {isUploadDisabled ? (
            <span className="font-medium">Maximum images reached</span>
          ) : (
            <>
              <span className="font-medium">Click to upload</span>
              <span className="hidden sm:inline"> or drag and drop</span>
            </>
          )}
        </div>
        <div className="text-[10px] sm:text-xs text-muted-foreground">
          {isUploadDisabled ? (
            `Remove some images to upload more`
          ) : (
            <>
              <span className="hidden sm:inline">PNG, JPG, WebP up to {maxFileSize}MB • </span>
              {remainingSlots} slot{remainingSlots !== 1 ? 's' : ''} remaining
            </>
          )}
        </div>
      </div>
    </div>
  );
};
