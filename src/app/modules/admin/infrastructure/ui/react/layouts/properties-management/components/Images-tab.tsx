import type { PropertyFormValues } from '@/modules/shared/domain/models/property-form.model';
import { PropertyImageManager } from '@/modules/shared/infrastructure/ui/react/components/property-image-manager/property-image-manager';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export const ImagesTab = (): React.ReactElement => {
  const form = useFormContext<PropertyFormValues>();
  const images = form.watch('images');
  const coverImage = form.watch('coverImage');

  const handleFilesChange = useCallback(
    (files: Array<File>, previewUrls: Array<string>): void => {
      form.setValue('imagesFiles', files);
      form.setValue('images', previewUrls);
    },
    [form]
  );

  const handleCoverImageChange = useCallback(
    (file: File | null, previewUrl?: string | null): void => {
      form.setValue('coverImageFile', file as File);
      form.setValue('coverImage', previewUrl ?? undefined);
    },
    [form]
  );

  return (
    <div className="space-y-4">
      <PropertyImageManager
        initialUrls={images}
        initialCoverUrl={coverImage}
        onFilesChange={handleFilesChange}
        onCoverImageChange={handleCoverImageChange}
      />
    </div>
  );
};
