/* eslint-disable complexity */
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, ImageIcon, Trash2, Upload, X, ZoomIn } from 'lucide-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

// Constants
const DEFAULT_MAX_VISIBLE = 3;
const DEFAULT_MAX_IMAGES = 10;
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
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: Array<string>;
  className?: string;
}

interface ImagePreviewProps {
  images: Array<PropertyImage>;
  onRemove?: (id: string) => void;
  onViewAll?: () => void;
  maxVisible?: number;
  showActions?: boolean;
}

// Component to show images in table (mini slider/preview)
export const ImagePreview = ({
  images,
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
          <img
            src={visibleImages[0].preview}
            alt={visibleImages[0].name}
            className="h-8 w-12 object-cover rounded border"
          />
        </div>
        {showActions && onRemove && (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemove(visibleImages[0].id)}>
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
          <div key={image.id} className="relative">
            <img
              src={image.preview}
              alt={image.name}
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
  maxImages = DEFAULT_MAX_IMAGES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
}: PropertyImageManagerProps): React.ReactElement => {
  const images = useMemo(() => value ?? [], [value]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [pendingDeletions, setPendingDeletions] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        onValueChange?.(updatedImages, pendingDeletions);
      }
    },
    [images, validateFile, createImageObject, maxImages, onValueChange, pendingDeletions]
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

  const markImageForDeletion = useCallback(
    (id: string) => {
      setPendingDeletions(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          // If already marked for deletion, unmark it (undo delete)
          newSet.delete(id);
          console.info('Restored image:', id);
        } else {
          // Mark for deletion
          newSet.add(id);
          console.info('Marked for deletion:', id);
        }

        // Notify parent component about the changes
        onValueChange?.(images, newSet);

        return newSet;
      });
    },
    [images, onValueChange]
  );

  // Get images that are not marked for deletion (for display)
  const visibleImages = images.filter(img => !pendingDeletions.has(img.id));

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={className}>
      <div className="space-y-4">
        <Label>Property Images</Label>

        {/* Upload Area */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={images.length < maxImages ? openFileDialog : undefined}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-muted-foreground">
              PNG, JPG, WebP up to {maxFileSize}MB ({images.length}/{maxImages})
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
              <Label className="text-sm">
                Property Images ({visibleImages.length}
                {pendingDeletions.size > 0 && ` • ${pendingDeletions.size} marked for deletion`})
              </Label>
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
                      className={`max-h-full max-w-full object-contain transition-all ${
                        pendingDeletions.has(images[selectedImageIndex]?.id || '') ? 'opacity-40 grayscale' : ''
                      }`}
                    />
                    {/* Deletion overlay */}
                    {pendingDeletions.has(images[selectedImageIndex]?.id || '') && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Marked for Deletion
                        </div>
                      </div>
                    )}

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
                      variant={pendingDeletions.has(images[selectedImageIndex]?.id || '') ? 'secondary' : 'destructive'}
                      size="sm"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        const imageToRemove = images[selectedImageIndex];
                        markImageForDeletion(imageToRemove.id);
                      }}
                      onMouseDown={e => e.stopPropagation()}
                    >
                      {pendingDeletions.has(images[selectedImageIndex]?.id || '') ? (
                        <>
                          <Upload className="h-4 w-4 mr-1" />
                          Restore
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </>
                      )}
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
                        } ${pendingDeletions.has(image.id) ? 'opacity-60' : ''}`}
                      >
                        <img
                          src={image.preview}
                          alt={image.name}
                          className={`w-16 h-12 object-cover transition-all ${
                            pendingDeletions.has(image.id) ? 'grayscale' : ''
                          }`}
                        />
                        {pendingDeletions.has(image.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-500/30">
                            <X className="h-3 w-3 text-white" />
                          </div>
                        )}
                        {/* Delete/Restore button for thumbnail */}
                        <div
                          className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 ${
                            pendingDeletions.has(image.id)
                              ? 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                              : 'bg-destructive hover:bg-destructive/80 text-destructive-foreground'
                          }`}
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            markImageForDeletion(image.id);
                          }}
                          onMouseDown={e => e.stopPropagation()}
                        >
                          {pendingDeletions.has(image.id) ? (
                            <Upload className="h-3 w-3" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Compact Grid View */
              <ScrollArea className="h-32">
                <div className="grid grid-cols-6 gap-2 pr-4">
                  {images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className={`w-full h-16 object-cover rounded border cursor-pointer hover:opacity-80 transition-all ${
                          pendingDeletions.has(image.id) ? 'opacity-40 grayscale' : ''
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedImageIndex(index);
                          setShowCarousel(true);
                        }}
                        onMouseDown={e => e.stopPropagation()}
                      />
                      <Button
                        variant={pendingDeletions.has(image.id) ? 'secondary' : 'destructive'}
                        size="icon"
                        className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          markImageForDeletion(image.id);
                        }}
                        onMouseDown={e => e.stopPropagation()}
                      >
                        {pendingDeletions.has(image.id) ? <Upload className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      </Button>
                      {/* Deletion overlay for grid view */}
                      {pendingDeletions.has(image.id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 rounded pointer-events-none">
                          <div className="bg-red-500 text-white px-1 py-0.5 rounded text-xs font-medium">Marked</div>
                        </div>
                      )}
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
  images: Array<PropertyImage>;
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
                <div key={image.id} className="relative group">
                  <img src={image.preview} alt={image.name} className="w-full h-16 object-cover rounded border" />
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
