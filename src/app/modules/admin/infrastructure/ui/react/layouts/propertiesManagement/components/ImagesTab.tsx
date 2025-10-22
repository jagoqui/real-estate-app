import {
  PropertyImageManager,
  type PropertyImage,
} from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import React from 'react';

interface ImagesTabProps {
  formData: {
    images: Array<PropertyImage>;
  };
  onChange: (updates: Partial<ImagesTabProps['formData']>) => void;
}

export const ImagesTab = React.memo(({ formData, onChange }: ImagesTabProps) => {
  const handleImagesChange = (images: Array<PropertyImage>): void => {
    onChange({ images });
  };

  return (
    <div className="space-y-4">
      <PropertyImageManager value={formData.images} onValueChange={handleImagesChange} />
    </div>
  );
});

ImagesTab.displayName = 'ImagesTab';
