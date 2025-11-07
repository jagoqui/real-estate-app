import { useCallback, useRef, useState } from 'react';

interface UseCoverImageUploadProps {
  onCoverImageChange: (file: File) => void;
  acceptedTypes: Array<string>;
}

interface UseCoverImageUploadReturn {
  fileInputRef: React.RefObject<HTMLInputElement>;
  isDragging: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export const useCoverImageUpload = ({
  onCoverImageChange,
  acceptedTypes,
}: UseCoverImageUploadProps): UseCoverImageUploadReturn => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file) {
        onCoverImageChange(file);
      }
    },
    [onCoverImageChange]
  );

  const handleClick = useCallback((): void => {
    fileInputRef.current?.click();
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && acceptedTypes.some(type => file.type.includes(type.replace('image/', '')))) {
        onCoverImageChange(file);
      }
    },
    [acceptedTypes, onCoverImageChange]
  );

  return {
    fileInputRef,
    isDragging,
    handleFileChange,
    handleClick,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
