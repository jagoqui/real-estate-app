import { type PropertyFormSchema } from '../schemas/propertyForm.schema';
import { type Property } from '../types/property.types';

export const convertPropertyToFormData = (property: Property): PropertyFormSchema => {
  return {
    name: property.name,
    price: property.price.toString(),
    area: property.area.toString(),
    buildYear: property.buildYear.toString(),
    bedrooms: property.bedrooms.toString(),
    bathrooms: property.bathrooms.toString(),
    description: property.description,
    features: property.features.join(', '),
    ownerId: property.ownerId,
    ownerName: property.ownerName,
    status: property.status,
    address: property.address,
    city: property.city,
    state: property.state,
    country: property.country,
    amenities: property.amenities ?? [],
    images: property.images.map(imageUrl => ({
      id: imageUrl,
      file: new File([], ''),
      preview: imageUrl,
      name: imageUrl.split('/').pop() ?? '',
      size: 0,
      markedForDeletion: false,
    })),
    virtualTours: property.views380Url,
  };
};
