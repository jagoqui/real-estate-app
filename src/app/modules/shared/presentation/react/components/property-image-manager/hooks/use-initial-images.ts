import { urlToFile } from '@/modules/shared/domain/helpers/url-to-file/url-to-file.helper';
import React, { useState } from 'react';
import type { PropertyImage } from '../property-image-manager';

interface UseInitialImagesProps {
  initialUrls?: Array<string>;
  onFilesChange?: (files: Array<File>, previewUrls: Array<string>) => void;
}

interface UseInitialImagesReturn {
  images: Array<PropertyImage>;
  isLoadingInitial: boolean;
  setImages: React.Dispatch<React.SetStateAction<Array<PropertyImage>>>;
}

export const useInitialImages = ({ initialUrls, onFilesChange }: UseInitialImagesProps): UseInitialImagesReturn => {
  const [images, setImages] = useState<Array<PropertyImage>>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);

  React.useEffect(() => {
    if (!initialUrls || initialUrls.length === 0 || hasLoadedInitial) return;

    const loadInitialImages = async (): Promise<void> => {
      setIsLoadingInitial(true);
      try {
        const loadedImages = await Promise.all(
          initialUrls.map(async (url, index) => {
            const filename = url.substring(url.lastIndexOf('/') + 1) || 'image.jpg';
            const file = await urlToFile(url, filename);
            return {
              id: `initial-${index}-${Date.now()}`,
              file,
              preview: url,
              name: file.name,
              size: file.size,
            };
          })
        );
        setImages(loadedImages);
        setHasLoadedInitial(true);

        if (onFilesChange) {
          const files = loadedImages.map(img => img.file);
          const previewUrls = loadedImages.map(img => img.preview);
          onFilesChange(files, previewUrls);
        }
      } catch (error) {
        console.error('Failed to load initial images:', error);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    void loadInitialImages();
  }, [initialUrls, hasLoadedInitial, onFilesChange]);

  return {
    images,
    isLoadingInitial,
    setImages,
  };
};
