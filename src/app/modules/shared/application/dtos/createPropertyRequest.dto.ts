import type { Amenity } from '../../domain/schemas/amenity.schema';
import type { Location } from '../../domain/schemas/location.schema';
import type { PropertyStatutes } from '../../domain/schemas/propertyStatutes.schema';
import type { PropertyTypes } from '../../domain/schemas/propertyTypes.schema';

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
