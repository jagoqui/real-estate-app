import type { PropertyStatutes } from './property-statutes.model';
import type { PropertyTypes } from './property-types.model';

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
  type?: PropertyTypes;
  status?: PropertyStatutes;
}
