/* eslint-disable complexity */
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { urlToFile } from '@/modules/shared/domain/helpers/urlToFile/urlToFile.helper';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { ChevronLeft, ChevronRight, ImageIcon, Trash2, Upload, X, ZoomIn } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';

// Constants
const DEFAULT_MAX_VISIBLE = 3;
const DEFAULT_MAX_IMAGES = 20;
const DEFAULT_MAX_FILE_SIZE = 5; // MB
const KB_SIZE = 1024;
const BYTES_IN_MB = KB_SIZE * KB_SIZE;

const DECIMAL_PLACES = 2;

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

interface ImagePreviewProps {
  images: Property['images'];
  onRemove?: (id: string) => void;
  onViewAll?: () => void;
  maxVisible?: number;
  showActions?: boolean;
}

export const ImagePreview = ({
  images = [],
  onRemove,
  onViewAll,
  maxVisible = DEFAULT_MAX_VISIBLE,
  showActions = false,
}: ImagePreviewProps): React.ReactElement => {
  if (images.length === 0) {
    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <ImageIcon className="h-3 w-3" />
        <span>No images</span>
      </div>
    );
  }

  const visibleImages = images.slice(0, maxVisible);
  const remainingCount = Math.max(0, images.length - maxVisible);

  if (images.length === 1) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <img src={visibleImages[0]} alt={visibleImages[0]} className="h-8 w-12 object-cover rounded border" />
        </div>
        {showActions && onRemove && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemove(visibleImages[0])}>
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex -space-x-1">
        {visibleImages.map((image, index) => (
          <div key={image} className="relative">
            <img
              src={image}
              alt={image}
              className="h-8 w-8 object-cover rounded border-2 border-background"
              style={{ zIndex: maxVisible - index }}
            />
          </div>
        ))}
      </div>
      {remainingCount > 0 && (
        <div className="flex items-center justify-center h-8 w-8 bg-muted border-2 border-background rounded text-xs font-medium">
          +{remainingCount}
        </div>
      )}
      {onViewAll && (
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={onViewAll}>
          <ZoomIn className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

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

        {/* Upload Area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragging && !isUploadDisabled ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            ${isUploadDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'}
          `}
          onDrop={isUploadDisabled ? undefined : handleDrop}
          onDragOver={isUploadDisabled ? undefined : handleDragOver}
          onDragLeave={isUploadDisabled ? undefined : handleDragLeave}
          onClick={isUploadDisabled ? undefined : openFileDialog}
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

            {/* Carousel View */}
            {showCarousel ? (
              <div
                className="space-y-3 p-4 border rounded-lg bg-muted/20"
                onClick={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
              >
                {/* Main Image Display */}
                <div className="relative bg-background rounded-lg overflow-hidden border">
                  <div className="aspect-video relative flex items-center justify-center bg-muted/30">
                    <img
                      src={images[selectedImageIndex]?.preview}
                      alt={images[selectedImageIndex]?.name}
                      className="max-h-full max-w-full object-contain"
                    />

                    {/* Navigation Controls */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedImageIndex(Math.max(0, selectedImageIndex - 1));
                          }}
                          onMouseDown={e => e.stopPropagation()}
                          disabled={selectedImageIndex === 0}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedImageIndex(Math.min(images.length - 1, selectedImageIndex + 1));
                          }}
                          onMouseDown={e => e.stopPropagation()}
                          disabled={selectedImageIndex === images.length - 1}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Image Info Bar */}
                  <div className="p-3 bg-background border-t flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{images[selectedImageIndex]?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(images[selectedImageIndex]?.size / BYTES_IN_MB).toFixed(DECIMAL_PLACES)} MB • Image{' '}
                        {selectedImageIndex + 1} of {images.length}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const imageToRemove = images[selectedImageIndex];
                        removeImage(imageToRemove.id);
                      }}
                      onMouseDown={e => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedImageIndex(index);
                        }}
                        onMouseDown={e => e.stopPropagation()}
                        className={`group flex-shrink-0 border-2 rounded overflow-hidden transition-all hover:scale-105 relative ${
                          index === selectedImageIndex
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <img src={image.preview} alt={image.name} className="w-16 h-12 object-cover" />
                        {/* Delete button for thumbnail */}
                        <div
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          onMouseDown={e => e.stopPropagation()}
                        >
                          <Trash2 className="h-3 w-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Compact Grid View */
              <ScrollArea className="h-32">
                <div className="grid grid-cols-6 gap-2 pr-4 pt-5 pb-2">
                  {images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-16 object-cover rounded border cursor-pointer hover:opacity-80 transition-all"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedImageIndex(index);
                          setShowCarousel(true);
                        }}
                        onMouseDown={e => e.stopPropagation()}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Table cell component with popover
interface PropertyImagesTableCellProps {
  images: Property['images'];
  onImagesChange?: (images: Array<PropertyImage>) => void;
  propertyName: string;
}

export const PropertyImagesTableCell = ({
  images,
  propertyName,
}: Omit<PropertyImagesTableCellProps, 'onImagesChange'>): React.ReactElement => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <ImagePreview images={images} maxVisible={DEFAULT_MAX_VISIBLE} onViewAll={() => setIsPopoverOpen(true)} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-3">
          <div className="font-semibold text-sm">{propertyName} - Images</div>
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {images.map(image => (
                <div key={image} className="relative group">
                  <img src={image} alt={image} className="w-full h-16 object-cover rounded border" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">No images uploaded</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
