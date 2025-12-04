import type { CreatePropertyInput, UpdatePropertyInput } from '../../domain/inputs/property.input';

export interface CreatePropertyCommand extends CreatePropertyInput {
  action: 'create';
}

export interface UpdatePropertyCommand extends UpdatePropertyInput {
  images: Array<string>;
  coverImage?: string;
  action: 'update';
}

export type PropertyCommand = CreatePropertyCommand | UpdatePropertyCommand;

export interface GetPropertiesByFilterCommand {
  name?: string;
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
  type?: string;
  status?: string;
  city?: string;
  country?: string;
}
