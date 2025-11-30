import z from 'zod';
import type { Amenity } from '../../domain/models/amenity.model';
import { lucideIconNameSchema } from './lucideIcon.schema';

const AMENITIES_SCHEMA_VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;

export const amenitySchema = z.object({
  name: z.string().min(AMENITIES_SCHEMA_VALIDATION.NAME.MIN_LENGTH).max(AMENITIES_SCHEMA_VALIDATION.NAME.MAX_LENGTH),
  icon: lucideIconNameSchema,
}) satisfies z.ZodType<Amenity>;
