import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { PropertyImageManager } from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export const ImagesTab = (): React.ReactElement => {
  const form = useFormContext<PropertyFormValues>();
  const images = form.watch('images');

  const handleFilesChange = useCallback(
    (files: Array<File>): void => {
      form.setValue('imagesFiles', files, { shouldValidate: false });
    },
    [form]
  );

  return (
    <div className="space-y-4">
      <PropertyImageManager initialUrls={images} onFilesChange={handleFilesChange} />
    </div>
  );
};
