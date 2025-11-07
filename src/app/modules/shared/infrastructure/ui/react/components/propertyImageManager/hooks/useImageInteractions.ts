import { useCallback, useRef, useState } from 'react';
import type { PropertyImage } from '../propertyImageManager';
import { processFiles } from './imageHelpers';

interface UseImageInteractionsProps {
  images: Array<PropertyImage>;
  setImages: (images: Array<PropertyImage>) => void;
  notifyChange: (images: Array<PropertyImage>) => void;
  maxImages: number;
  maxFileSize: number;
  acceptedTypes: Array<string>;
}

interface UseImageInteractionsReturn {
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  openFileDialog: () => void;
}

export const useImageInteractions = ({
  images,
  setImages,
  notifyChange,
  maxImages,
  maxFileSize,
  acceptedTypes,
}: UseImageInteractionsProps): UseImageInteractionsReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList) => {
      const { newImages, errors } = processFiles(files, images, acceptedTypes, maxFileSize, maxImages);

      if (errors.length > 0) {
        alert(errors.join('\n'));
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages].slice(0, maxImages);
        setImages(updatedImages);
        notifyChange(updatedImages);
      }
    },
    [images, acceptedTypes, maxFileSize, maxImages, setImages, notifyChange]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFiles(files);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    isDragging,
    fileInputRef,
    handleFileInput,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    openFileDialog,
  };
};
