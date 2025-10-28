import type { PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import {
  PropertyImageManager,
  type PropertyImage,
} from '@/modules/shared/infrastructure/ui/react/components/propertyImageManager/propertyImageManager';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const createPropertyImage = (file: File, index: number, preview?: string): PropertyImage => ({
  id: `image-${index}`,
  file,
  preview: preview ?? URL.createObjectURL(file),
  name: file.name,
  size: file.size,
});

export const ImagesTab = (): React.ReactElement => {
  const form = useFormContext<PropertyFormValues>();
  const [propertyImages, setPropertyImages] = useState<Array<PropertyImage>>([]);

  const action = form.watch('action');
  const images = form.watch('images');
  const imagesFiles = form.watch('imagesFiles');

  useEffect(() => {
    if (action !== 'update') {
      return;
    }

    const loadImages = async (): Promise<void> => {
      const loadedImages = await Promise.all(
        images.map(async (url, index) => {
          const filename = url.substring(url.lastIndexOf('/') + 1);
          const file = await urlToFile({ url, fileName: filename });
          return createPropertyImage(file, index, url);
        })
      );
      setPropertyImages(loadedImages);
    };

    void loadImages();
  }, [images, action]);

  const handleImagesChange = (images: Array<PropertyImage>): void => {
    if (action === 'update') {
      form.setValue(
        'images',
        images.map(({ preview }) => preview)
      );
    } else {
      form.setValue(
        'imagesFiles',
        images.map(({ file }) => file)
      );
      setPropertyImages(imagesFiles.map((file, index) => createPropertyImage(file, index)));
    }
  };

  return (
    <div className="space-y-4">
      <PropertyImageManager value={propertyImages} onValueChange={handleImagesChange} />
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
