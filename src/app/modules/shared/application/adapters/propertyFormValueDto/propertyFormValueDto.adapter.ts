import type { PropertyFormValues } from '@/modules/shared/domain/models/propertyForm.model';
import type { CreatePropertyRequestDto } from '../../dtos/createPropertyRequest.dto';

export const propertyFormValueDtoAdapter = (formValues: PropertyFormValues): CreatePropertyRequestDto => ({
  name: formValues.name,
  address: formValues.address,
  price: formValues.price,
  year: formValues.buildYear,
  description: formValues.description,
  bathrooms: formValues.bathrooms,
  bedrooms: formValues.bedrooms,
  areaSqm: formValues.area,
  highlightedFeatures: formValues.highlightedFeatures,
  amenities: formValues.amenities,
  featured: formValues.featured,
  images: formValues.imagesFiles,
  coverImage: formValues.coverImageFile,
  views360Url: formValues.views360Url,
  city: formValues.city,
  state: formValues.state,
  country: formValues.country,
  location: formValues.location,
  idOwner: formValues.ownerId,
  status: formValues.status,
  type: formValues.type,
});
