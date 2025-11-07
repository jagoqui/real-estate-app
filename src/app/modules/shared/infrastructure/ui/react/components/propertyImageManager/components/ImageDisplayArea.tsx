import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, ZoomIn } from 'lucide-react';
import React from 'react';
import { ImageCarouselView, ImageGridView, ImageThumbnails } from '../components';
import type { PropertyImage } from '../propertyImageManager';

interface ImageDisplayAreaProps {
  images: Array<PropertyImage>;
  showCarousel: boolean;
  selectedImageIndex: number;
  onToggleCarousel: () => void;
  onSelectImage: (index: number) => void;
  onRemoveImage: (id: string) => void;
  onSetAsCover: (id: string) => void;
}

export const ImageDisplayArea = ({
  images,
  showCarousel,
  selectedImageIndex,
  onToggleCarousel,
  onSelectImage,
  onRemoveImage,
  onSetAsCover,
}: ImageDisplayAreaProps): React.ReactElement | null => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs sm:text-sm truncate">Property Images ({images.length})</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleCarousel}
          className="gap-1 sm:gap-2 shrink-0"
        >
          {showCarousel ? (
            <>
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Hide</span>
            </>
          ) : (
            <>
              <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Preview</span>
            </>
          )}
        </Button>
      </div>

      {showCarousel ? (
        <>
          <ImageCarouselView
            images={images}
            selectedImageIndex={selectedImageIndex}
            onSelectImage={onSelectImage}
            onRemoveImage={onRemoveImage}
            onSetAsCover={onSetAsCover}
          />
          <ImageThumbnails
            images={images}
            selectedImageIndex={selectedImageIndex}
            onSelectImage={onSelectImage}
            onRemoveImage={onRemoveImage}
          />
        </>
      ) : (
        <ImageGridView
          images={images}
          onSelectImage={onSelectImage}
          onRemoveImage={onRemoveImage}
          onSetAsCover={onSetAsCover}
          onShowCarousel={onToggleCarousel}
        />
      )}
    </div>
  );
};
