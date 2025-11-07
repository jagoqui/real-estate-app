import React, { useCallback, useState } from 'react';
import type { PropertyImage } from '../propertyImageManager';
import { useImageInteractions } from './useImageInteractions';
import { useInitialImages } from './useInitialImages';
import { useRemoveImage } from './useRemoveImage';
import { useSetAsCover } from './useSetAsCover';

interface UseImageManagerProps {
  value?: Array<PropertyImage>;
  onValueChange?: (images: Array<PropertyImage>, pendingDeletions?: Set<string>) => void;
  initialUrls?: Array<string>;
  onFilesChange?: (files: Array<File>, previewUrls: Array<string>) => void;
  maxImages: number;
  maxFileSize: number;
  acceptedTypes: Array<string>;
}

interface UseImageManagerReturn {
  images: Array<PropertyImage>;
  isDragging: boolean;
  selectedImageIndex: number;
  showCarousel: boolean;
  isLoadingInitial: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  setSelectedImageIndex: (index: number) => void;
  setShowCarousel: (show: boolean) => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  removeImage: (id: string) => void;
  openFileDialog: () => void;
  setAsCover: (imageId: string) => void;
}

export const useImageManager = ({
  value,
  onValueChange,
  initialUrls,
  onFilesChange,
  maxImages,
  maxFileSize,
  acceptedTypes,
}: UseImageManagerProps): UseImageManagerReturn => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);

  const { images, isLoadingInitial, setImages } = useInitialImages({
    initialUrls,
    onFilesChange,
  });

  React.useEffect(() => {
    if (value) {
      setImages(value);
    }
  }, [value, setImages]);

  const notifyImagesChange = useCallback(
    (updatedImages: Array<PropertyImage>) => {
      if (onFilesChange) {
        const files = updatedImages.map(img => img.file);
        const previewUrls = updatedImages.map(img => img.preview);
        onFilesChange(files, previewUrls);
      }
      if (onValueChange) {
        onValueChange(updatedImages, new Set());
      }
    },
    [onFilesChange, onValueChange]
  );

  const interactions = useImageInteractions({
    images,
    setImages,
    notifyChange: notifyImagesChange,
    maxImages,
    maxFileSize,
    acceptedTypes,
  });

  const removeImage = useRemoveImage({
    images,
    setImages,
    notifyChange: notifyImagesChange,
    selectedImageIndex,
    setSelectedImageIndex,
  });

  const setAsCover = useSetAsCover({
    images,
    setImages,
    notifyChange: notifyImagesChange,
    setSelectedImageIndex,
  });

  return {
    images,
    isDragging: interactions.isDragging,
    selectedImageIndex,
    showCarousel,
    isLoadingInitial,
    fileInputRef: interactions.fileInputRef,
    setSelectedImageIndex,
    setShowCarousel,
    handleFileInput: interactions.handleFileInput,
    handleDrop: interactions.handleDrop,
    handleDragOver: interactions.handleDragOver,
    handleDragLeave: interactions.handleDragLeave,
    removeImage,
    openFileDialog: interactions.openFileDialog,
    setAsCover,
  };
};
