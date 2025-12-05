import z from 'zod';
import type { LocationResponseDto } from '../dtos/location-response.dto';

export const locationResponseSchema = z.object({
  lat: z.string(),
  lon: z.string(),
  displayName: z.string(),
}) satisfies z.ZodType<LocationResponseDto>;
