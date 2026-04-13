import z from 'zod';
import type { GeoCoordinates } from '../../domain/models/geo-coordinates.model';

export const locationSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  displayName: z.string(),
}) satisfies z.ZodType<GeoCoordinates>;
