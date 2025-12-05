import z from 'zod';
import type { PropertyStatus } from '../../domain/models/property-statutes.model';

export const propertyStatutesSchema = z.custom<PropertyStatus>() satisfies z.ZodType<PropertyStatus>;
