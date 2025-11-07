import { Star, Trash2 } from 'lucide-react';
import React from 'react';
import type { PropertyImage } from '../propertyImageManager';

interface ImageThumbnailsProps {
  images: Array<PropertyImage>;
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
  onRemoveImage: (id: string) => void;
}

export const ImageThumbnails = ({
  images,
  selectedImageIndex,
  onSelectImage,
  onRemoveImage,
}: ImageThumbnailsProps): React.ReactElement => {
  if (images.length <= 1) {
    return <></>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onSelectImage(index);
          }}
          className={`group flex-shrink-0 border-2 rounded overflow-hidden transition-all hover:scale-105 active:scale-95 relative touch-manipulation ${
            index === selectedImageIndex
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-muted hover:border-primary/50'
          }`}
          aria-label={`Select image ${index + 1}`}
        >
          {/* Cover Icon - Solo un icono pequeño */}
          {index === 0 && (
            <div className="absolute top-0.5 left-0.5 bg-primary text-primary-foreground rounded-full p-0.5 z-10">
              <Star className="h-2 w-2 sm:h-2.5 sm:w-2.5 fill-current" />
            </div>
          )}

          <img src={image.preview} alt={image.name} className="w-14 h-11 sm:w-16 sm:h-12 object-cover" />

          {/* Delete button */}
          <div
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 active:opacity-100 bg-destructive hover:bg-destructive/80 text-destructive-foreground z-10 touch-manipulation"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveImage(image.id);
            }}
            role="button"
            aria-label="Delete image"
          >
            <Trash2 className="h-3 w-3" />
          </div>
        </button>
      ))}
    </div>
  );
};
