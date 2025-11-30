import z from 'zod';
import type { PropertyStatutes } from '../../domain/models/propertyStatutes.model';

export const propertyStatutesSchema = z.custom<PropertyStatutes>() satisfies z.ZodType<PropertyStatutes>;
