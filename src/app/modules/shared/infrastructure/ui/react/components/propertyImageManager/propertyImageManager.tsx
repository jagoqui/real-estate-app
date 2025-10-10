import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, ImageIcon, Trash2, Upload, X } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';

// Constants
const DEFAULT_MAX_VISIBLE = 3;
const DEFAULT_MAX_IMAGES = 10;
const DEFAULT_MAX_FILE_SIZE = 5; // MB
const KB_SIZE = 1024;
const BYTES_IN_MB = KB_SIZE * KB_SIZE;
const PREVIOUS_INDEX_OFFSET = 2;

export interface PropertyImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
}

interface PropertyImageManagerProps {
  value?: Array<PropertyImage>;
  onValueChange?: (images: Array<PropertyImage>) => void;
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
          <Eye className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

// Main component for managing property images
// eslint-disable-next-line max-lines-per-function
export const PropertyImageManager = ({
  value = [],
  onValueChange,
  maxImages = DEFAULT_MAX_IMAGES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
}: PropertyImageManagerProps): React.ReactElement => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `File type ${file.type} is not supported. Please use JPEG, PNG, or WebP.`;
      }

      if (file.size > maxFileSize * BYTES_IN_MB) {
        return `File size must be less than ${maxFileSize}MB.`;
      }

      if (value.length >= maxImages) {
        return `Maximum ${maxImages} images allowed.`;
      }

      return null;
    },
    [acceptedTypes, maxFileSize, maxImages, value.length]
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
        const updatedImages = [...value, ...newImages].slice(0, maxImages);
        onValueChange?.(updatedImages);
      }
    },
    [value, validateFile, createImageObject, maxImages, onValueChange]
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
      const updatedImages = value.filter(img => img.id !== id);
      onValueChange?.(updatedImages);

      // Clean up object URL
      const imageToRemove = value.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
    },
    [value, onValueChange]
  );

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const openPreviewDialog = useCallback((index: number = 0) => {
    setSelectedImageIndex(index);
    setPreviewDialogOpen(true);
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
            ${value.length >= maxImages ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={value.length < maxImages ? openFileDialog : undefined}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium">Click to upload</span> or drag and drop
            </div>
            <div className="text-xs text-muted-foreground">
              PNG, JPG, WebP up to {maxFileSize}MB ({value.length}/{maxImages})
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

        {/* Images Grid */}
        {value.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Uploaded Images ({value.length})</Label>
              <Button variant="outline" size="sm" onClick={() => openPreviewDialog(0)} className="gap-2">
                <Eye className="h-4 w-4" />
                View All
              </Button>
            </div>

            <ScrollArea className="h-32">
              <div className="grid grid-cols-6 gap-2 pr-4">
                {value.map((image, index) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-16 object-cover rounded border cursor-pointer"
                      onClick={() => openPreviewDialog(index)}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={e => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              Property Images ({selectedImageIndex + 1} of {value.length})
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            {value.length > 0 && (
              <>
                <div className="relative flex justify-center">
                  <img
                    src={value[selectedImageIndex]?.preview}
                    alt={value[selectedImageIndex]?.name}
                    className="max-h-96 max-w-full object-contain rounded"
                  />
                </div>

                {value.length > 1 && (
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                      disabled={selectedImageIndex === 0}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center text-sm text-muted-foreground">
                      {selectedImageIndex + 1} / {value.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedImageIndex(Math.min(value.length - 1, selectedImageIndex + 1))}
                      disabled={selectedImageIndex === value.length - 1}
                    >
                      Next
                    </Button>
                  </div>
                )}

                <ScrollArea className="h-20">
                  <div className="flex gap-2 pb-2">
                    {value.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`
                          flex-shrink-0 border-2 rounded overflow-hidden transition-all
                          ${index === selectedImageIndex ? 'border-primary' : 'border-transparent'}
                        `}
                      >
                        <img src={image.preview} alt={image.name} className="w-16 h-12 object-cover" />
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{value[selectedImageIndex]?.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      removeImage(value[selectedImageIndex].id);
                      if (selectedImageIndex >= value.length - 1) {
                        setSelectedImageIndex(Math.max(0, value.length - PREVIOUS_INDEX_OFFSET));
                      }
                      if (value.length <= 1) {
                        setPreviewDialogOpen(false);
                      }
                    }}
                  >
                    Delete Image
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
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
