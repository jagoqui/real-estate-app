import z from 'zod';
import type { AmenityResponseDto } from '../dtos/amenity-response.dto';

export const amenityResponseSchema = z.object({
  name: z.string(),
  icon: z.string(),
}) satisfies z.ZodType<AmenityResponseDto>;
