import { GripVertical, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import type { PropertyImage } from '../property-image-manager';

interface ImageThumbnailsProps {
  images: Array<PropertyImage>;
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
  onRemoveImage: (id: string) => void;
  onReorderImages: (startIndex: number, endIndex: number) => void;
}

export const ImageThumbnails = ({
  images,
  selectedImageIndex,
  onSelectImage,
  onRemoveImage,
  onReorderImages,
}: ImageThumbnailsProps): React.ReactElement => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (images.length <= 1) {
    return <></>;
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (): void => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number): void => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorderImages(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = (): void => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {images.map((image, index) => (
        <div
          key={image.id}
          draggable
          onDragStart={e => handleDragStart(e, index)}
          onDragOver={e => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={e => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`group flex-shrink-0 border-2 rounded overflow-hidden transition-all relative touch-manipulation cursor-move ${
            index === selectedImageIndex
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-muted hover:border-primary/50'
          } ${draggedIndex === index ? 'opacity-50' : ''} ${dragOverIndex === index ? 'border-primary ring-2 ring-primary' : ''}`}
        >
          {/* Drag Handle */}
          <div className="absolute top-0.5 left-0.5 bg-black/60 text-white rounded p-0.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-3 w-3" />
          </div>

          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onSelectImage(index);
            }}
            className="w-14 h-11 sm:w-16 sm:h-12"
            aria-label={`Select image ${index + 1}`}
          >
            <img src={image.preview} alt={image.name} className="w-full h-full object-cover" />
          </button>

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
        </div>
      ))}
    </div>
  );
};
