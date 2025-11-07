import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import React from 'react';
import type { PropertyImage } from '../propertyImageManager';

const KB_SIZE = 1024;
const BYTES_IN_MB = KB_SIZE * KB_SIZE;
const DECIMAL_PLACES = 2;

interface ImageCarouselViewProps {
  images: Array<PropertyImage>;
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
  onRemoveImage: (id: string) => void;
}

export const ImageCarouselView = ({
  images,
  selectedImageIndex,
  onSelectImage,
  onRemoveImage,
}: ImageCarouselViewProps): React.ReactElement => {
  return (
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
                  onSelectImage(Math.max(0, selectedImageIndex - 1));
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
                  onSelectImage(Math.min(images.length - 1, selectedImageIndex + 1));
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
              onRemoveImage(images[selectedImageIndex].id);
            }}
            onMouseDown={e => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
