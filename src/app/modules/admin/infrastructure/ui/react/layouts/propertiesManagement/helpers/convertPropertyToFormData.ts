import { propertySchema, type Property } from '@/modules/shared/domain/schemas/property.schema';
import { propertyFormValuesSchema, type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';

export const convertPropertyToFormData = (property: Property): PropertyFormValues => {
  const formData = {
    ...property,
    action: 'update',
  };
  return propertyFormValuesSchema.parse(formData);
};

export const convertPropertyFormDataToProperty = (data: PropertyFormValues): Property => {
  const property: Property = {
    id: data.id,
    name: data.name,
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    location: { lat: '', lon: '' },
    price: Number(data.price),
    bedrooms: Number(data.bedrooms),
    bathrooms: Number(data.bathrooms),
    area: Number(data.area),
    buildYear: Number(data.buildYear),
    description: data.description,
    highlightedFeatures: data.highlightedFeatures,
    amenities: data.amenities,
    images: 'images' in data ? data.images : [],
    views360Url: data.views360Url,
    ownerId: data.ownerId,
    ownerName: data.ownerName,
    status: data.status,
    type: data.type,
    featured: false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  return propertySchema.parse(property);
};
