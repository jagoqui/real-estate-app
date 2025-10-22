import { type PropertyFormData } from '../hooks/usePropertyForm';
import { type Property } from '../types/property.types';

export const createPropertyFromFormData = (
  formData: PropertyFormData,
  editingProperty: Property | null,
  pendingImageDeletions: Set<string>
): Property => {
  // Process pending image deletions
  const finalImages = formData.images.filter(img => !pendingImageDeletions.has(img.id));

  // Clean up object URLs for deleted images
  formData.images
    .filter(img => pendingImageDeletions.has(img.id))
    .forEach(img => {
      if (img.preview.startsWith('blob:')) {
        URL.revokeObjectURL(img.preview);
      }
    });

  return {
    id: editingProperty?.id || Date.now().toString(),
    name: formData.name,
    address: formData.location?.display_name || '',
    city: formData.city,
    state: formData.state,
    country: formData.country,
    location: formData.location
      ? {
          lat: formData.location.lat,
          lon: formData.location.lon,
        }
      : undefined,
    price: Number(formData.price),
    bedrooms: Number(formData.bedrooms),
    bathrooms: Number(formData.bathrooms),
    area: Number(formData.area),
    buildYear: Number(formData.buildYear),
    description: formData.description,
    features: formData.features.split(',').map(f => f.trim()),
    amenities: formData.amenities,
    images: finalImages.map(img => img.preview),
    imageFiles: finalImages,
    views380Url: formData.views380Url,
    ownerId: formData.ownerId,
    ownerName: formData.ownerName,
    status: formData.status,
    createdAt: editingProperty?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
