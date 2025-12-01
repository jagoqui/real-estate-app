import z from 'zod';
import type { PropertyTypes } from '../../domain/models/property-types.model';

export const propertyTypesSchema = z.custom<PropertyTypes>() satisfies z.ZodType<PropertyTypes>;
