import type { CreatePropertyCommand, UpdatePropertyCommand } from '../../domain/commands/property.command';

export interface CreatePropertyCommand2 extends CreatePropertyCommand {
  action: 'create';
}

export interface UpdatePropertyCommand2 extends UpdatePropertyCommand {
  images: Array<string>;
  coverImage?: string;
  action: 'update';
}

export type PropertyCommand2 = CreatePropertyCommand2 | UpdatePropertyCommand2;

export interface GetPropertiesByFilterCommand2 {
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
