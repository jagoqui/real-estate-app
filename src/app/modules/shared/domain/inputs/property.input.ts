import type { Amenity } from '../models/amenity.model';
import type { Location } from '../models/location.model';
import type { PropertyStatus } from '../models/property-statutes.model';
import type { PropertyType } from '../models/property-types.model';
import type { Property } from '../models/property.model';

export interface CreatePropertyInput {
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
  views360Url: Array<string>;
  ownerId: string;
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  imagesFiles: Array<File>;
  coverImageFile: File;
}

export interface UpdatePropertyInput {
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
  views360Url: Array<string>;
  ownerId: string;
  status: PropertyStatus;
  type: PropertyType;
  featured: boolean;
  imagesFiles: Array<File>;
  coverImageFile: File;
}

export interface UpdatePropertyStatusInput {
  propertyId: string;
  status: Property['status'];
}

export interface GetPropertyByIdInput {
  propertyId: string;
}

export interface GetPropertiesByOwnerIdInput {
  ownerId: string;
}

export type GetPropertiesByFilterInput = Record<string, string>;

export interface DeletePropertyInput {
  propertyId: string;
}
