import { z } from 'zod';
import type { PropertyResponseDto } from '../dtos/property-response.dto';

import { amenityResponseSchema } from './amenity-response.schema';
import { locationResponseSchema } from './location-response.schema';
import { resilientNumber } from './zod-resilient.schema';

export const propertyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  price: resilientNumber,
  year: resilientNumber,
  description: z.string(),
  bathrooms: resilientNumber,
  bedrooms: resilientNumber,
  areaSqm: resilientNumber,
  highlightedFeatures: z.array(z.string()).default([]),
  amenities: z.array(amenityResponseSchema).default([]),
  featured: z.boolean(),
  views360Url: z.array(z.string()).default([]),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  location: locationResponseSchema,
  idOwner: z.string(),
  status: z.string(),
  type: z.string(),
  images: z.array(z.string()).default([]),
  coverImage: z.string(),
  codeInternal: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<PropertyResponseDto>;
