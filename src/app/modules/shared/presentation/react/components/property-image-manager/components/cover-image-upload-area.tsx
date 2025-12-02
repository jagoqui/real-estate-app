import { ImagePlus } from 'lucide-react';
import React from 'react';

interface CoverImageUploadAreaProps {
  isDragging: boolean;
  maxFileSize: number;
  onClick: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const CoverImageUploadArea = ({
  isDragging,
  maxFileSize,
  onClick,
  onDragOver,
  onDragLeave,
  onDrop,
}: CoverImageUploadAreaProps): React.ReactElement => {
  return (
    <button
      type="button"
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`w-full h-48 sm:h-64 border-2 border-dashed rounded-lg transition-colors flex flex-col items-center justify-center gap-3 group ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
      }`}
    >
      <div
        className={`rounded-full p-4 transition-colors ${
          isDragging ? 'bg-primary/30' : 'bg-primary/10 group-hover:bg-primary/20'
        }`}
      >
        <ImagePlus className="h-8 w-8 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          {isDragging ? 'Drop cover image here' : 'Click to upload cover image'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          <span className="hidden sm:inline">{isDragging ? 'Release to upload' : 'or drag and drop • '}</span>
          PNG, JPG, WebP up to {maxFileSize}MB
        </p>
      </div>
    </button>
  );
};
