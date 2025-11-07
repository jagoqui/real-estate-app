import type { PropertyImage } from '../propertyImageManager';

const KB_SIZE = 1024;
const BYTES_IN_MB = KB_SIZE * KB_SIZE;

export const validateFile = (
  file: File,
  acceptedTypes: Array<string>,
  maxFileSize: number,
  currentImagesCount: number,
  maxImages: number
): string | null => {
  if (!acceptedTypes.includes(file.type)) {
    return `File type ${file.type} is not supported. Please use JPEG, PNG, or WebP.`;
  }

  if (file.size > maxFileSize * BYTES_IN_MB) {
    return `File size must be less than ${maxFileSize}MB.`;
  }

  if (currentImagesCount >= maxImages) {
    return `Maximum ${maxImages} images allowed.`;
  }

  return null;
};

export const createImageObject = (file: File): PropertyImage => {
  return {
    id: crypto.randomUUID(),
    file,
    preview: URL.createObjectURL(file),
    name: file.name,
    size: file.size,
  };
};

export const processFiles = (
  files: FileList,
  currentImages: Array<PropertyImage>,
  acceptedTypes: Array<string>,
  maxFileSize: number,
  maxImages: number
): { newImages: Array<PropertyImage>; errors: Array<string> } => {
  const newImages: Array<PropertyImage> = [];
  const errors: Array<string> = [];
  const availableSlots = maxImages - currentImages.length;

  if (availableSlots <= 0) {
    return { newImages, errors };
  }

  Array.from(files).forEach(file => {
    const error = validateFile(file, acceptedTypes, maxFileSize, currentImages.length, maxImages);
    if (error) {
      errors.push(`${file.name}: ${error}`);
    } else {
      newImages.push(createImageObject(file));
    }
  });

  return { newImages, errors };
};

/**
 * Sets an image as cover by moving it to the first position
 */
export const setImageAsCover = (images: Array<PropertyImage>, imageId: string): Array<PropertyImage> => {
  const imageIndex = images.findIndex(img => img.id === imageId);

  if (imageIndex === -1 || imageIndex === 0) {
    return images; // Image not found or already is cover
  }

  const newImages = [...images];
  const [imageToMove] = newImages.splice(imageIndex, 1);
  newImages.unshift(imageToMove);

  return newImages;
};
