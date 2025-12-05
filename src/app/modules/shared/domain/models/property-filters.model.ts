import type { PropertyStatus } from './property-statutes.model';
import type { PropertyType } from './property-types.model';

export interface PropertyFilters {
  name?: string;
  address?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  minYear?: number;
  maxYear?: number;
  type?: PropertyType;
  status?: PropertyStatus;
}
