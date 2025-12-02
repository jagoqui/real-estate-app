import React, { useCallback, useState } from 'react';
import type { PropertyImage } from '../property-image-manager';
import { useImageInteractions } from './use-image-interactions';
import { useInitialImages } from './use-initial-images';
import { useRemoveImage } from './use-remove-image';

interface UseImageManagerProps {
  value?: Array<PropertyImage>;
  onValueChange?: (images: Array<PropertyImage>, pendingDeletions?: Set<string>) => void;
  initialUrls?: Array<string>;
  initialCoverUrl?: string;
  onFilesChange?: (files: Array<File>, previewUrls: Array<string>) => void;
  onCoverImageChange?: (file: File | null, previewUrl: string | null) => void;
  maxImages: number;
  maxFileSize: number;
  acceptedTypes: Array<string>;
}

interface UseImageManagerReturn {
  images: Array<PropertyImage>;
  coverImage: { file: File; preview: string } | null;
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
  reorderImages: (startIndex: number, endIndex: number) => void;
  handleCoverImageChange: (file: File) => void;
  removeCoverImage: () => void;
}

// eslint-disable-next-line max-lines-per-function
export const useImageManager = ({
  value,
  onValueChange,
  initialUrls,
  initialCoverUrl,
  onFilesChange,
  onCoverImageChange,
  maxImages,
  maxFileSize,
  acceptedTypes,
}: UseImageManagerProps): UseImageManagerReturn => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [coverImage, setCoverImage] = useState<{ file: File; preview: string } | null>(null);

  const { images, isLoadingInitial, setImages } = useInitialImages({
    initialUrls,
    onFilesChange,
  });

  // Load initial cover image
  React.useEffect(() => {
    const loadCoverImage = async (): Promise<void> => {
      if (initialCoverUrl && !coverImage) {
        try {
          const response = await fetch(initialCoverUrl);
          const blob = await response.blob();
          const fileName = initialCoverUrl.substring(initialCoverUrl.lastIndexOf('/') + 1) || 'cover.jpg';
          const file = new File([blob], fileName, { type: blob.type });
          setCoverImage({ file, preview: initialCoverUrl });
        } catch (error) {
          console.error('Error loading cover image:', error);
        }
      }
    };
    void loadCoverImage();
  }, [initialCoverUrl, coverImage]);

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

  const reorderImages = useCallback(
    (startIndex: number, endIndex: number): void => {
      const updatedImages = [...images];
      const [movedImage] = updatedImages.splice(startIndex, 1);
      updatedImages.splice(endIndex, 0, movedImage);
      setImages(updatedImages);
      notifyImagesChange(updatedImages);
    },
    [images, setImages, notifyImagesChange]
  );

  const handleCoverImageChange = useCallback(
    (file: File): void => {
      const preview = URL.createObjectURL(file);
      setCoverImage({ file, preview });
      if (onCoverImageChange) {
        onCoverImageChange(file, preview);
      }
    },
    [onCoverImageChange]
  );

  const removeCoverImage = useCallback((): void => {
    if (coverImage) {
      URL.revokeObjectURL(coverImage.preview);
      setCoverImage(null);
      if (onCoverImageChange) {
        onCoverImageChange(null, null);
      }
    }
  }, [coverImage, onCoverImageChange]);

  return {
    images,
    coverImage,
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
    reorderImages,
    handleCoverImageChange,
    removeCoverImage,
  };
};
