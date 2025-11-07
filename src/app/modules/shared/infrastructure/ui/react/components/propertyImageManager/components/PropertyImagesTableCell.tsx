import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import React, { useState } from 'react';
import { ImagePreview } from './ImagePreview';

const DEFAULT_MAX_VISIBLE = 3;

interface PropertyImagesTableCellProps {
  images: Property['images'];
  propertyName: string;
}

export const PropertyImagesTableCell = ({ images, propertyName }: PropertyImagesTableCellProps): React.ReactElement => {
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
                <div key={image} className="relative group">
                  <img src={image} alt={image} className="w-full h-16 object-cover rounded border" />
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
