import type { Amenity } from './amenity.model';
import type { Location } from './location.model';
import type { PropertyStatus } from './property-statutes.model';
import type { PropertyType } from './property-types.model';

export interface Property {
  id: string;
  internalCode?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  location: Location;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  buildYear: number;
  description: string;
  highlightedFeatures: Array<string>;
  amenities: Array<Amenity>;
  images: Array<string>;
  coverImage?: string;
  views360Url: Array<string>;
  ownerId: string;
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
