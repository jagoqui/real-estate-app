import type { LucideIconName } from '@/modules/shared/infrastructure/ui/react/components/dynamicIcon/dynamicIcon';
import { z } from 'zod';
import { PROPERTY_TYPES, type Property } from '../types/property.types';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MIN_BUILD_YEAR = 1800;
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;
const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

// Schema for Amenity (simplified - actual validation happens in AmenityForm component)
const amenitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Amenity name is required'),
  icon: z.custom<LucideIconName>(), // LucideIconName - validated by AmenityForm component
});

// Schema for PropertyImage (simplified - actual File validation happens in PropertyImageManager)
const propertyImageSchema = z.object({
  id: z.string(),
  file: z.file(), // File object - validated by PropertyImageManager component
  preview: z.url('Invalid preview URL'),
  name: z.string().min(1, 'Image name is required'),
  size: z.number().positive('Image size must be positive'),
  markedForDeletion: z.boolean().optional(),
});

// Schema for Location
const locationSchema = z.object({
  lat: z.number().min(MIN_LATITUDE).max(MAX_LATITUDE),
  lng: z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE),
});

export const propertyFormSchema = z.object({
  name: z
    .string()
    .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters`)
    .max(MAX_NAME_LENGTH, `Name must be less than ${MAX_NAME_LENGTH} characters`),
  price: z
    .string()
    .min(1, 'Price is required')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a positive number',
    }),
  area: z
    .string()
    .min(1, 'Area is required')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Area must be a positive number',
    }),
  buildYear: z
    .string()
    .min(1, 'Build year is required')
    .refine(val => !isNaN(Number(val)) && Number(val) >= MIN_BUILD_YEAR && Number(val) <= new Date().getFullYear(), {
      message: `Build year must be between ${MIN_BUILD_YEAR} and ${new Date().getFullYear()}`,
    }),
  bedrooms: z
    .string()
    .min(1, 'Bedrooms is required')
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Bedrooms must be a positive number',
    }),
  bathrooms: z
    .string()
    .min(1, 'Bathrooms is required')
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: 'Bathrooms must be a positive number',
    }),
  description: z
    .string()
    .min(MIN_DESCRIPTION_LENGTH, `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`)
    .max(MAX_DESCRIPTION_LENGTH, 'Description is too long'),
  highlightedFeatures: z.string().min(1, 'At least one feature is required'),
  ownerId: z.string().min(1, 'Owner is required'),
  ownerName: z.string().optional(),
  status: z.enum(['available', 'sold', 'pending']),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.custom<Property['state']>(),
  type: z.enum(PROPERTY_TYPES, {
    message: 'Please select a valid property type',
  }),
  country: z.string().min(1, 'Country is required'),
  featured: z.boolean().default(false),
  amenities: z.array(amenitySchema),
  images: z.array(propertyImageSchema),
  location: locationSchema.optional(),
  virtualTours: z.array(z.url('Invalid virtual tour URL')),
});

export type PropertyFormSchema = z.infer<typeof propertyFormSchema>;
