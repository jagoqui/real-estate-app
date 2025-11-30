import type { PropertyStatutes } from './propertyStatutes.model';
import type { PropertyTypes } from './propertyTypes.model';

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
