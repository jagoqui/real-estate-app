import type { Amenity } from '../../domain/models/amenity.model';
import type { Location } from '../../infrastructure/schemas/location.schema';
import type { PropertyStatutes } from '../../infrastructure/schemas/propertyStatutes.schema';
import type { PropertyTypes } from '../../infrastructure/schemas/propertyTypes.schema';

export interface CreatePropertyRequestDto {
  name: string;
  address: string;
  price: number;
  year: number;
  description: string;
  bathrooms: number;
  bedrooms: number;
  areaSqm: number;
  highlightedFeatures: Array<string>;
  amenities: Array<Amenity>;
  featured: boolean;
  images: Array<File>;
  coverImage: File;
  views360Url: Array<string>;
  city: string;
  state: string;
  country: string;
  location: Location;
  idOwner: string;
  status: PropertyStatutes;
  type: PropertyTypes;
}
