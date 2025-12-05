import z from 'zod';
import type {
  CreatePropertyCommand,
  PropertyCommand,
  UpdatePropertyCommand,
} from '../../application/commands/property.command';
import { PROPERTY_RULES } from '../../domain/constants/property-validation.constants';
import { amenitySchema } from './amenity.schema';
import { locationSchema } from './location.schema';
import { propertyStatutesSchema } from './property-statutes.schema';
import { propertyTypesSchema } from './property-types.schema';

const fileCountLimit = PROPERTY_RULES.IMAGES.MAX_ITEMS;
const MAX_FILE_SIZE_MB = 5;
const BYTES_PER_KB = 1024;
const fileSizeLimit = MAX_FILE_SIZE_MB * BYTES_PER_KB * BYTES_PER_KB; // 5MB
const allowedTypes: Record<string, boolean> = {
  'image/jpeg': true,
  'image/png': true,
  'image/webp': true,
};

interface FilesUpload {
  imagesFiles: Array<File>;
  coverImageFile: File;
}

const filesUploadSchema = z.object({
  imagesFiles: z
    .array(z.file())
    .refine(list => list.length <= fileCountLimit, `Maximum ${fileCountLimit} files allowed`)
    .transform(list => Array.from(list))
    .refine(
      files => {
        return files.every(file => allowedTypes[file.type]);
      },
      { message: 'Invalid file type. Allowed types: JPG, PNG, WEBP' }
    )
    .refine(
      files => {
        return files.every(file => file.size <= fileSizeLimit);
      },
      {
        message: 'File size should not exceed 5MB',
      }
    )
    .default([]),
  coverImageFile: z
    .file()
    .refine(
      file => {
        return allowedTypes[file.type];
      },
      { message: 'Invalid file type. Allowed types: JPG, PNG, WEBP' }
    )
    .refine(
      file => {
        return file.size <= fileSizeLimit;
      },
      {
        message: 'File size should not exceed 5MB',
      }
    ),
}) satisfies z.ZodType<FilesUpload>;

const propertySchema = z.object({
  id: z.string().readonly(),
  internalCode: z.string().optional().readonly(),
  name: z.string().min(PROPERTY_RULES.NAME.MIN_LENGTH).max(PROPERTY_RULES.NAME.MAX_LENGTH),
  address: z.string().min(PROPERTY_RULES.ADDRESS.MIN_LENGTH).max(PROPERTY_RULES.ADDRESS.MAX_LENGTH),
  city: z.string().min(PROPERTY_RULES.CITY.MIN_LENGTH).max(PROPERTY_RULES.CITY.MAX_LENGTH),
  state: z.string().min(PROPERTY_RULES.STATE.MIN_LENGTH).max(PROPERTY_RULES.STATE.MAX_LENGTH),
  country: z.string().min(PROPERTY_RULES.COUNTRY.MIN_LENGTH).max(PROPERTY_RULES.COUNTRY.MAX_LENGTH),
  location: locationSchema,
  price: z.number().positive(),
  bedrooms: z.number().positive().max(PROPERTY_RULES.BEDROOMS.MAX),
  bathrooms: z.number().min(0).max(PROPERTY_RULES.BATHROOMS.MAX),
  area: z.number().positive(),
  buildYear: z.number().min(PROPERTY_RULES.BUILD_YEAR.MIN).max(PROPERTY_RULES.BUILD_YEAR.MAX),
  description: z.string().min(PROPERTY_RULES.DESCRIPTION.MIN_LENGTH).max(PROPERTY_RULES.DESCRIPTION.MAX_LENGTH),
  highlightedFeatures: z
    .array(z.string().min(1).max(PROPERTY_RULES.HIGHLIGHTED_FEATURES.MAX_LENGTH))
    .max(PROPERTY_RULES.HIGHLIGHTED_FEATURES.MAX_ITEMS)
    .default([]),
  amenities: amenitySchema.array().default([]),
  images: z.array(z.string()).max(PROPERTY_RULES.IMAGES.MAX_ITEMS).default([]),
  coverImage: z.string().optional(),
  views360Url: z.array(z.string()).max(PROPERTY_RULES.VIEWS_380_URL.MAX_ITEMS).default([]),
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

export const createPropertyFormSchema = propertySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    internalCode: true,
    images: true,
  })
  .extend({
    action: z.literal('create'),
    ...filesUploadSchema.shape,
  }) satisfies z.ZodType<CreatePropertyCommand>;

export const updatePropertyFormSchema = propertySchema.extend({
  action: z.literal('update'),
  ...filesUploadSchema.shape,
}) satisfies z.ZodType<UpdatePropertyCommand>;

export const _propertyFormValuesSchema = z.discriminatedUnion('action', [
  createPropertyFormSchema,
  updatePropertyFormSchema,
]) satisfies z.ZodType<PropertyCommand>;
