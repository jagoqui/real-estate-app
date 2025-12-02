import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import React from 'react';
import type { PropertyImage } from '../property-image-manager';

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
    <div className="space-y-3 p-4 border rounded-lg bg-muted/20" onClick={e => e.stopPropagation()}>
      <div className="relative bg-background rounded-lg overflow-hidden border">
        <div className="group aspect-video relative flex items-center justify-center bg-muted/30">
          <img
            src={images[selectedImageIndex]?.preview}
            alt={images[selectedImageIndex]?.name}
            className="max-h-full max-w-full object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectImage(Math.max(0, selectedImageIndex - 1));
                }}
                disabled={selectedImageIndex === 0}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectImage(Math.min(images.length - 1, selectedImageIndex + 1));
                }}
                disabled={selectedImageIndex === images.length - 1}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </>
          )}
        </div>
        <div className="p-3 bg-background border-t flex justify-between items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm truncate">{images[selectedImageIndex]?.name}</p>
            <p className="text-xs text-muted-foreground">
              {(images[selectedImageIndex]?.size / BYTES_IN_MB).toFixed(DECIMAL_PLACES)} MB • Image{' '}
              {selectedImageIndex + 1} of {images.length}
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="shrink-0"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveImage(images[selectedImageIndex].id);
            }}
          >
            <Trash2 className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
