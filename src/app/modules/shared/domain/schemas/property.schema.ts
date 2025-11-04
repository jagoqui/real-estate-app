import z from 'zod';
import { amenitySchema } from './amenity.schema';
import { locationSchema } from './location.schema';
import { propertyStatutesSchema } from './propertyStatutes.schema';
import { propertyTypesSchema } from './propertyTypes.schema';

export const PropertySchemaValidations = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  ADDRESS: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200,
  },
  CITY: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  STATE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  COUNTRY: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  BEDROOMS: {
    MAX: 100,
  },
  BATHROOMS: {
    MAX: 100,
  },
  BUILD_YEAR: {
    MIN: 1800,
    MAX: new Date().getFullYear(),
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  HIGHLIGHTED_FEATURES: {
    MAX_ITEMS: 15,
    MAX_LENGTH: 200,
  },
  IMAGES: {
    MAX_ITEMS: 20,
  },
  VIEWS_380_URL: {
    MAX_ITEMS: 10,
  },
} as const;

export const propertySchema = z.object({
  id: z.string().readonly(),
  internalCode: z.string().optional().readonly(),
  name: z.string().min(PropertySchemaValidations.NAME.MIN_LENGTH).max(PropertySchemaValidations.NAME.MAX_LENGTH),
  address: z
    .string()
    .min(PropertySchemaValidations.ADDRESS.MIN_LENGTH)
    .max(PropertySchemaValidations.ADDRESS.MAX_LENGTH),
  city: z.string().min(PropertySchemaValidations.CITY.MIN_LENGTH).max(PropertySchemaValidations.CITY.MAX_LENGTH),
  state: z.string().min(PropertySchemaValidations.STATE.MIN_LENGTH).max(PropertySchemaValidations.STATE.MAX_LENGTH),
  country: z
    .string()
    .min(PropertySchemaValidations.COUNTRY.MIN_LENGTH)
    .max(PropertySchemaValidations.COUNTRY.MAX_LENGTH),
  location: locationSchema,
  price: z.number().positive(),
  bedrooms: z.number().positive().max(PropertySchemaValidations.BEDROOMS.MAX),
  bathrooms: z.number().min(0).max(PropertySchemaValidations.BATHROOMS.MAX),
  area: z.number().positive(),
  buildYear: z.number().min(PropertySchemaValidations.BUILD_YEAR.MIN).max(PropertySchemaValidations.BUILD_YEAR.MAX),
  description: z
    .string()
    .min(PropertySchemaValidations.DESCRIPTION.MIN_LENGTH)
    .max(PropertySchemaValidations.DESCRIPTION.MAX_LENGTH),
  highlightedFeatures: z
    .array(z.string().min(1).max(PropertySchemaValidations.HIGHLIGHTED_FEATURES.MAX_LENGTH))
    .max(PropertySchemaValidations.HIGHLIGHTED_FEATURES.MAX_ITEMS)
    .default([]),
  amenities: amenitySchema.array().default([]),
  images: z.array(z.string()).max(PropertySchemaValidations.IMAGES.MAX_ITEMS).default([]),
  views360Url: z.array(z.string()).max(PropertySchemaValidations.VIEWS_380_URL.MAX_ITEMS).default([]),
  ownerId: z.string(),
  status: propertyStatutesSchema,
  type: propertyTypesSchema,
  featured: z.boolean().default(false),
  createdAt: z
    .string()
    .refine(date => !isNaN(Date.parse(date)))
    .readonly(),
  updatedAt: z
    .string()
    .refine(date => !isNaN(Date.parse(date)))
    .readonly(),
});

export type Property = z.infer<typeof propertySchema>;
