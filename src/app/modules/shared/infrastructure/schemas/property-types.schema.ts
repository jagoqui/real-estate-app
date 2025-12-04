import z from 'zod';
import type { PropertyType } from '../../domain/models/property-types.model';

export const propertyTypesSchema = z.custom<PropertyType>() satisfies z.ZodType<PropertyType>;
