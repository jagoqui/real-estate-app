import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';
import React from 'react';
import type { PropertyImage } from '../propertyImageManager';

interface ImageGridViewProps {
  images: Array<PropertyImage>;
  onSelectImage: (index: number) => void;
  onRemoveImage: (id: string) => void;
  onShowCarousel: () => void;
}

export const ImageGridView = ({
  images,
  onSelectImage,
  onRemoveImage,
  onShowCarousel,
}: ImageGridViewProps): React.ReactElement => {
  return (
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
                onSelectImage(index);
                onShowCarousel();
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
                onRemoveImage(image.id);
              }}
              onMouseDown={e => e.stopPropagation()}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
