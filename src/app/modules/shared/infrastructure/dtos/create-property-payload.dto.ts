import type { Amenity } from '../../domain/models/amenity.model';
import type { Location } from '../../domain/models/location.model';
import type { PropertyStatus } from '../../domain/models/property-statutes.model';
import type { PropertyType } from '../../domain/models/property-types.model';

export interface CreatePropertyPayloadDto {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  location: Location;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  year: number;
  description: string;
  highlightedFeatures: Array<string>;
  amenities: Array<Amenity>;
  coverImage?: File;
  views360Url: Array<string>;
  idOwner: string;
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  imagesFiles: Array<File>;
}
