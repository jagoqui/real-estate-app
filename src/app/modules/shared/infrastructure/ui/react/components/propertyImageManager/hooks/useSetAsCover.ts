import { useCallback } from 'react';
import type { PropertyImage } from '../propertyImageManager';
import { setImageAsCover } from './imageHelpers';

interface UseSetAsCoverProps {
  images: Array<PropertyImage>;
  setImages: (images: Array<PropertyImage>) => void;
  notifyChange: (images: Array<PropertyImage>) => void;
  setSelectedImageIndex: (index: number) => void;
}

export const useSetAsCover = ({
  images,
  setImages,
  notifyChange,
  setSelectedImageIndex,
}: UseSetAsCoverProps): ((imageId: string) => void) => {
  return useCallback(
    (imageId: string): void => {
      const updatedImages = setImageAsCover(images, imageId);
      setImages(updatedImages);

      // Reset selected index to show new cover image
      setSelectedImageIndex(0);

      // Notify parent
      notifyChange(updatedImages);
    },
    [images, setImages, notifyChange, setSelectedImageIndex]
  );
};
