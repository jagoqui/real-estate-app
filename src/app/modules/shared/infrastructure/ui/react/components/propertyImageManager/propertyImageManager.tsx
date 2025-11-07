import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { urlToFile } from '@/modules/shared/domain/helpers/urlToFile/urlToFile.helper';
import { X, ZoomIn } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { ImageCarouselView, ImageGridView, ImageThumbnails, ImageUploadArea } from './components';

// Constants
const DEFAULT_MAX_IMAGES = 20;
const DEFAULT_MAX_FILE_SIZE = 5; // MB
const KB_SIZE = 1024;
const BYTES_IN_MB = KB_SIZE * KB_SIZE;

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
  initialUrls?: Array<string>; // URLs from server for update mode
  onFilesChange?: (files: Array<File>, previewUrls: Array<string>) => void; // Callback with Files and their preview URLs
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: Array<string>;
  className?: string;
}

// Main component for managing property images with inline carousel
// eslint-disable-next-line max-lines-per-function
export const PropertyImageManager = ({
  value,
  onValueChange,
  initialUrls,
  onFilesChange,
  maxImages = DEFAULT_MAX_IMAGES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
}: PropertyImageManagerProps): React.ReactElement => {
  const [images, setImages] = React.useState<Array<PropertyImage>>(value ?? []);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial images from URLs ONLY ONCE (for update mode)
  React.useEffect(() => {
    if (!initialUrls || initialUrls.length === 0 || hasLoadedInitial) return;

    const loadInitialImages = async (): Promise<void> => {
      setIsLoadingInitial(true);
      try {
        const loadedImages = await Promise.all(
          initialUrls.map(async (url, index) => {
            const filename = url.substring(url.lastIndexOf('/') + 1) || 'image.jpg';
            const file = await urlToFile(url, filename);
            return {
              id: `initial-${index}-${Date.now()}`,
              file,
              preview: url, // Use server URL as preview
              name: file.name,
              size: file.size,
            };
          })
        );
        setImages(loadedImages);
        setHasLoadedInitial(true); // Mark as loaded, won't load again

        // Notify parent with Files and preview URLs
        if (onFilesChange) {
          const files = loadedImages.map(img => img.file);
          const previewUrls = loadedImages.map(img => img.preview);
          onFilesChange(files, previewUrls);
        }
      } catch (error) {
        console.error('Failed to load initial images:', error);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    void loadInitialImages();
  }, [initialUrls, hasLoadedInitial, onFilesChange]);

  // Sync with external value changes
  React.useEffect(() => {
    if (value) {
      setImages(value);
    }
  }, [value]);

  // Notify parent when images change (send Files and preview URLs)
  const notifyImagesChange = React.useCallback(
    (updatedImages: Array<PropertyImage>) => {
      if (onFilesChange) {
        const files = updatedImages.map(img => img.file);
        const previewUrls = updatedImages.map(img => img.preview);
        onFilesChange(files, previewUrls);
      }
      if (onValueChange) {
        onValueChange(updatedImages, new Set()); // Empty set since we remove directly
      }
    },
    [onFilesChange, onValueChange]
  );

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `File type ${file.type} is not supported. Please use JPEG, PNG, or WebP.`;
      }

      if (file.size > maxFileSize * BYTES_IN_MB) {
        return `File size must be less than ${maxFileSize}MB.`;
      }

      if (images.length >= maxImages) {
        return `Maximum ${maxImages} images allowed.`;
      }

      return null;
    },
    [acceptedTypes, maxFileSize, maxImages, images.length]
  );

  const createImageObject = useCallback((file: File): PropertyImage => {
    return {
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    };
  }, []);

  const handleFiles = useCallback(
    (files: FileList) => {
      const newImages: Array<PropertyImage> = [];
      const errors: Array<string> = [];
      const availableSlots = maxImages - images.length;

      if (availableSlots <= 0) {
        return; // No slots available
      }

      Array.from(files).forEach(file => {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          newImages.push(createImageObject(file));
        }
      });

      if (errors.length > 0) {
        alert(errors.join('\n'));
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages].slice(0, maxImages);
        setImages(updatedImages);
        notifyImagesChange(updatedImages);
      }
    },
    [images, validateFile, createImageObject, maxImages, notifyImagesChange]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFiles(files);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = useCallback(
    (id: string) => {
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      notifyImagesChange(updatedImages);

      // Revoke blob URL if it exists
      const imageToRemove = images.find(img => img.id === id);
      if (imageToRemove?.preview.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      // Adjust selected index if needed
      if (selectedImageIndex >= updatedImages.length && updatedImages.length > 0) {
        setSelectedImageIndex(updatedImages.length - 1);
      }
    },
    [images, notifyImagesChange, selectedImageIndex]
  );

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const isUploadDisabled = images.length >= maxImages;
  const remainingSlots = maxImages - images.length;

  if (isLoadingInitial) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">Loading images...</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Property Images</Label>
          <span className="text-xs text-muted-foreground">
            {images.length} / {maxImages} images
            {remainingSlots > 0 && ` • ${remainingSlots} slot${remainingSlots !== 1 ? 's' : ''} available`}
          </span>
        </div>

        <ImageUploadArea
          isUploadDisabled={isUploadDisabled}
          isDragging={isDragging}
          maxFileSize={maxFileSize}
          remainingSlots={remainingSlots}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Inline Image Carousel */}
        {images.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Property Images ({images.length})</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCarousel(!showCarousel);
                }}
                onMouseDown={e => e.stopPropagation()}
                onMouseUp={e => e.stopPropagation()}
                className="gap-2"
              >
                {showCarousel ? (
                  <>
                    <X className="h-4 w-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <ZoomIn className="h-4 w-4" />
                    Show Preview
                  </>
                )}
              </Button>
            </div>

            {showCarousel ? (
              <>
                <ImageCarouselView
                  images={images}
                  selectedImageIndex={selectedImageIndex}
                  onSelectImage={setSelectedImageIndex}
                  onRemoveImage={removeImage}
                />
                <ImageThumbnails
                  images={images}
                  selectedImageIndex={selectedImageIndex}
                  onSelectImage={setSelectedImageIndex}
                  onRemoveImage={removeImage}
                />
              </>
            ) : (
              <ImageGridView
                images={images}
                onSelectImage={setSelectedImageIndex}
                onRemoveImage={removeImage}
                onShowCarousel={() => setShowCarousel(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
