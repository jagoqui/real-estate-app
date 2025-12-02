import z from 'zod';
import type { PropertyFilters } from '../../domain/models/property-filters.model';
import { propertyStatutesSchema } from './property-statutes.schema';
import { propertyTypesSchema } from './property-types.schema';

export const propertyFiltersSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  minBedrooms: z.number().positive().optional(),
  maxBedrooms: z.number().positive().optional(),
  minBathrooms: z.number().positive().optional(),
  maxBathrooms: z.number().positive().optional(),
  minArea: z.number().positive().optional(),
  maxArea: z.number().positive().optional(),
  minYear: z.number().positive().optional(),
  maxYear: z.number().positive().optional(),
  type: propertyTypesSchema.optional(),
  status: propertyStatutesSchema.optional(),
}) satisfies z.ZodType<PropertyFilters>;
