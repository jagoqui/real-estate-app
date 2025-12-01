import type { Amenity } from '../../domain/models/amenity.model';
import type { Location } from '../../domain/models/location.model';
import type { PropertyStatutes } from '../../domain/models/property-statutes.model';
import type { PropertyTypes } from '../../domain/models/property-types.model';

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
