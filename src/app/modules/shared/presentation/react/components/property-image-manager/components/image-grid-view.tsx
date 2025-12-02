import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GripVertical, X } from 'lucide-react';
import React from 'react';

import { useDragAndDrop } from '../hooks/use-drag-and-Drop';

import type { PropertyImage } from '../property-image-manager';

interface ImageGridViewProps {
  images: Array<PropertyImage>;
  onSelectImage: (index: number) => void;
  onRemoveImage: (id: string) => void;
  onShowCarousel: () => void;
  onReorderImages: (startIndex: number, endIndex: number) => void;
}

export const ImageGridView = ({
  images,
  onSelectImage,
  onRemoveImage,
  onShowCarousel,
  onReorderImages,
}: ImageGridViewProps): React.ReactElement => {
  const { draggedIndex, dragOverIndex, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd } =
    useDragAndDrop({ onReorder: onReorderImages });

  return (
    <ScrollArea className="h-32">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pr-4 pt-2 pb-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            draggable
            onDragStart={e => handleDragStart(e, index)}
            onDragOver={e => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative group cursor-move ${draggedIndex === index ? 'opacity-50' : ''} ${dragOverIndex === index ? 'ring-2 ring-primary rounded' : ''}`}
          >
            {/* Drag Handle */}
            <div className="absolute top-0.5 left-0.5 bg-black/60 text-white rounded p-0.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-3 w-3" />
            </div>

            <img
              src={image.preview}
              alt={image.name}
              className="w-full h-16 sm:h-16 object-cover rounded border cursor-pointer hover:opacity-80 transition-all touch-manipulation"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onSelectImage(index);
                onShowCarousel();
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity z-10 touch-manipulation"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveImage(image.id);
              }}
              aria-label="Delete image"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
