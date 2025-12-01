import z from 'zod';
import type { PropertyStatutes } from '../../domain/models/property-statutes.model';

export const propertyStatutesSchema = z.custom<PropertyStatutes>() satisfies z.ZodType<PropertyStatutes>;
