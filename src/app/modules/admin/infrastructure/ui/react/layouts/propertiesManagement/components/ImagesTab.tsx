import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { PropertyImageManager } from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * ImagesTab - Manages property images in both create and update modes
 *
 * Flow:
 * 1. If images[] exists (update mode or after adding images), pass to PropertyImageManager as initialUrls
 * 2. PropertyImageManager converts URLs to Files and creates previews
 * 3. User adds/removes images -> updates images[] with URLs (blob or server URLs)
 * 4. Before submit, convert all images[] URLs to Files and store in imagesFiles[]
 */
export const ImagesTab = (): React.ReactElement => {
  const form = useFormContext<PropertyFormValues>();
  const watchedImages = form.watch('images');
  const images = useMemo(() => watchedImages || [], [watchedImages]);

  const convertImagesToFiles = async (): Promise<void> => {
    if (!images.length) {
      form.setValue('imagesFiles', []);
      return;
    }

    try {
      const files = await Promise.all(
        images.map(async url => {
          const filename = url.substring(url.lastIndexOf('/') + 1) || 'image.jpg';
          return await urlToFile({ url, fileName: filename });
        })
      );

      form.setValue('imagesFiles', files);
    } catch (error) {
      console.error('Error converting images to files:', error);
    }
  };

  // Handle image changes from PropertyImageManager
  const handleImagesChange = async (imageUrls: Array<string>): Promise<void> => {
    // Update images array with URLs (blob URLs for new images, server URLs for existing)
    form.setValue('images', imageUrls);
    await convertImagesToFiles();
  };

  return (
    <div className="space-y-4">
      <PropertyImageManager
        initialUrls={images.length > 0 ? images : undefined}
        onImagesChange={imageUrls => void handleImagesChange(imageUrls)}
      />
    </div>
  );
};

interface UrlToFileProps {
  url: string;
  fileName: string;
  mimeType?: string;
}

const urlToFile = async ({ url, fileName, mimeType }: UrlToFileProps): Promise<File> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType ?? blob.type });
  } catch (error) {
    console.error('Error converting URL to File:', error);
    throw error;
  }
};
