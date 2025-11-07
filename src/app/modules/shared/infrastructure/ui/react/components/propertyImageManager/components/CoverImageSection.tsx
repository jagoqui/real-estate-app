import { Label } from '@/components/ui/label';
import React from 'react';

import { useCoverImageUpload } from '../hooks/useCoverImageUpload';

import { CoverImagePreview } from './CoverImagePreview';
import { CoverImageUploadArea } from './CoverImageUploadArea';

interface CoverImageSectionProps {
  coverImage: { file: File; preview: string } | null;
  onCoverImageChange: (file: File) => void;
  onRemoveCoverImage: () => void;
  maxFileSize: number;
  acceptedTypes: Array<string>;
}

export const CoverImageSection = ({
  coverImage,
  onCoverImageChange,
  onRemoveCoverImage,
  maxFileSize,
  acceptedTypes,
}: CoverImageSectionProps): React.ReactElement => {
  const { fileInputRef, isDragging, handleFileChange, handleClick, handleDragOver, handleDragLeave, handleDrop } =
    useCoverImageUpload({ onCoverImageChange, acceptedTypes });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Cover Image</Label>
        <span className="text-xs text-muted-foreground">Main property image</span>
      </div>

      {coverImage ? (
        <CoverImagePreview preview={coverImage.preview} fileName={coverImage.file.name} onRemove={onRemoveCoverImage} />
      ) : (
        <CoverImageUploadArea
          isDragging={isDragging}
          maxFileSize={maxFileSize}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
