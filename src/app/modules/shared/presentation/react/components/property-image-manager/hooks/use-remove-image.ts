import { useCallback } from 'react';
import type { PropertyImage } from '../property-image-manager';

interface UseRemoveImageProps {
  images: Array<PropertyImage>;
  setImages: (images: Array<PropertyImage>) => void;
  notifyChange: (images: Array<PropertyImage>) => void;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
}

export const useRemoveImage = ({
  images,
  setImages,
  notifyChange,
  selectedImageIndex,
  setSelectedImageIndex,
}: UseRemoveImageProps): ((id: string) => void) => {
  return useCallback(
    (id: string) => {
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      notifyChange(updatedImages);

      const imageToRemove = images.find(img => img.id === id);
      if (imageToRemove?.preview.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      if (selectedImageIndex >= updatedImages.length && updatedImages.length > 0) {
        setSelectedImageIndex(updatedImages.length - 1);
      }
    },
    [images, notifyChange, selectedImageIndex, setImages, setSelectedImageIndex]
  );
};
