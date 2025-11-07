import { Button } from '@/components/ui/button';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import { ImageIcon, Trash2, ZoomIn } from 'lucide-react';
import React from 'react';

const DEFAULT_MAX_VISIBLE = 3;

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
