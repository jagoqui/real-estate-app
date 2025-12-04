import type { CreatePropertyInput } from '@/modules/shared/domain/inputs/property.input';
import type { Property } from '@/modules/shared/domain/models/property.model';
import type { CreatePropertyPayloadDto } from '../../dtos/create-property-payload.dto';
import type { PropertyResponseDto } from '../../dtos/property-response.dto';
import { mapAmenityToModel } from '../amenity/amenity.mapper';
import { mapPropertyStatusToModel } from '../property-status/property-status.mapper';
import { mapPropertyTypeToModel } from '../property-type/property-type.mapper';

export const mapPropertyToModel = (propertyDto: PropertyResponseDto): Property => ({
  name: propertyDto.name,
  address: propertyDto.address,
  price: propertyDto.price,
  buildYear: propertyDto.year,
  description: propertyDto.description,
  bathrooms: propertyDto.bathrooms,
  bedrooms: propertyDto.bedrooms,
  area: propertyDto.areaSqm,
  highlightedFeatures: propertyDto.highlightedFeatures,
  amenities: propertyDto.amenities.map(mapAmenityToModel),
  featured: propertyDto.featured,
  images: propertyDto.images,
  coverImage: propertyDto.coverImage,
  views360Url: propertyDto.views360Url,
  city: propertyDto.city,
  state: propertyDto.state,
  country: propertyDto.country,
  location: propertyDto.location,
  ownerId: propertyDto.idOwner,
  status: mapPropertyStatusToModel(propertyDto.status),
  type: mapPropertyTypeToModel(propertyDto.type),
  id: propertyDto.id,
  internalCode: propertyDto.codeInternal,
  createdAt: propertyDto.createdAt,
  updatedAt: propertyDto.updatedAt,
});

export const mapCreatePropertyInputToPayload = (input: CreatePropertyInput): CreatePropertyPayloadDto => ({
  name: input.name,
  address: input.address,
  price: input.price,
  year: input.buildYear,
  description: input.description,
  bathrooms: input.bathrooms,
  bedrooms: input.bedrooms,
  areaSqm: input.area,
  highlightedFeatures: input.highlightedFeatures,
  amenities: input.amenities,
  featured: input.featured,
  imagesFiles: input.imagesFiles,
  coverImage: input.coverImageFile,
  views360Url: input.views360Url,
  city: input.city,
  state: input.state,
  country: input.country,
  location: input.location,
  idOwner: input.ownerId,
  status: input.status,
  type: input.type,
});
