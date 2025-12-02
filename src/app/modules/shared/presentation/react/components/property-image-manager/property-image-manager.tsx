import React from 'react';
import { ImageDisplayArea, ImageLoadingState, ImageManagerHeader, ImageUploadArea } from './components';
import { CoverImageSection } from './components/cover-image-section';
import { useImageManager } from './hooks/use-image-manager';

// Constants
const DEFAULT_MAX_IMAGES = 20;
const DEFAULT_MAX_FILE_SIZE = 5; // MB

export interface PropertyImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  markedForDeletion?: boolean;
}

interface PropertyImageManagerProps {
  value?: Array<PropertyImage>;
  onValueChange?: (images: Array<PropertyImage>, pendingDeletions?: Set<string>) => void;
  initialUrls?: Array<string>;
  initialCoverUrl?: string;
  onFilesChange?: (files: Array<File>, previewUrls: Array<string>) => void;
  onCoverImageChange?: (file: File | null, previewUrl: string | null) => void;
  maxImages?: number;
  maxFileSize?: number;
  acceptedTypes?: Array<string>;
  className?: string;
}

// eslint-disable-next-line max-lines-per-function
export const PropertyImageManager = ({
  value,
  onValueChange,
  initialUrls,
  initialCoverUrl,
  onFilesChange,
  onCoverImageChange,
  maxImages = DEFAULT_MAX_IMAGES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
}: PropertyImageManagerProps): React.ReactElement => {
  const manager = useImageManager({
    value,
    onValueChange,
    initialUrls,
    initialCoverUrl,
    onFilesChange,
    onCoverImageChange,
    maxImages,
    maxFileSize,
    acceptedTypes,
  });

  if (manager.isLoadingInitial) {
    return <ImageLoadingState />;
  }

  const isUploadDisabled = manager.images.length >= maxImages;
  const remainingSlots = maxImages - manager.images.length;

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Cover Image Section */}
        <CoverImageSection
          coverImage={manager.coverImage}
          onCoverImageChange={manager.handleCoverImageChange}
          onRemoveCoverImage={manager.removeCoverImage}
          maxFileSize={maxFileSize}
          acceptedTypes={acceptedTypes}
        />

        {/* Gallery Images Section */}
        <div className="space-y-4">
          <ImageManagerHeader
            currentCount={manager.images.length}
            maxImages={maxImages}
            remainingSlots={remainingSlots}
          />

          <ImageUploadArea
            isUploadDisabled={isUploadDisabled}
            isDragging={manager.isDragging}
            maxFileSize={maxFileSize}
            remainingSlots={remainingSlots}
            onDrop={manager.handleDrop}
            onDragOver={manager.handleDragOver}
            onDragLeave={manager.handleDragLeave}
            onClick={manager.openFileDialog}
          />

          <input
            ref={manager.fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={manager.handleFileInput}
            className="hidden"
          />

          <ImageDisplayArea
            images={manager.images}
            showCarousel={manager.showCarousel}
            selectedImageIndex={manager.selectedImageIndex}
            onToggleCarousel={() => manager.setShowCarousel(!manager.showCarousel)}
            onSelectImage={manager.setSelectedImageIndex}
            onRemoveImage={manager.removeImage}
            onReorderImages={manager.reorderImages}
          />
        </div>
      </div>
    </div>
  );
};
