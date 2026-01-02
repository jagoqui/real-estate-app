import type { Amenity } from '../models/amenity.model';
import type { GeoCoordinates } from '../models/geo-coordinates.model';
import type { PropertyStatus } from '../models/property-statutes.model';
import type { PropertyType } from '../models/property-types.model';
import type { Property } from '../models/property.model';

export interface CreatePropertyCommand {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  location: GeoCoordinates;
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

export interface UpdatePropertyCommand {
  id: string;
  internalCode?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  location: GeoCoordinates;
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

export interface UpdatePropertyStatusCommand {
  propertyId: string;
  status: Property['status'];
}

export interface GetPropertyByIdCommand {
  propertyId: string;
}

export interface GetPropertiesByOwnerIdCommand {
  ownerId: string;
}

export interface DeletePropertyCommand {
  propertyId: string;
}
