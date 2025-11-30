import z from 'zod';
import type { Location } from '../../domain/models/location.model';

export const locationSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  displayName: z.string(),
}) satisfies z.ZodType<Location>;
