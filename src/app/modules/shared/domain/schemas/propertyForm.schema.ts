import { propertySchema, PropertySchemaValidations } from '@/modules/shared/domain/schemas/property.schema';
import z from 'zod';

const fileCountLimit = PropertySchemaValidations.IMAGES.MAX_ITEMS;
const MAX_FILE_SIZE_MB = 5;
const BYTES_PER_KB = 1024;
const fileSizeLimit = MAX_FILE_SIZE_MB * BYTES_PER_KB * BYTES_PER_KB; // 5MB
const allowedTypes: Record<string, boolean> = {
  'image/jpeg': true,
  'image/png': true,
  'image/webp': true,
};

export const filesUploadSchema = z.object({
  imagesFiles: z
    .array(z.file())
    .refine(list => list.length > 0, 'No files selected')
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
});

export const createPropertyFormValuesSchema = propertySchema
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
  });

export const updatePropertyFormValuesSchema = propertySchema.extend({
  action: z.literal('update'),
  ...filesUploadSchema.shape,
});

const _propertyFormValuesSchema = z.discriminatedUnion('action', [
  createPropertyFormValuesSchema,
  updatePropertyFormValuesSchema,
]);

export type CreatePropertyFormValues = z.infer<typeof createPropertyFormValuesSchema>;

export type UpdatePropertyFormValues = z.infer<typeof updatePropertyFormValuesSchema>;

export type PropertyFormValues = z.infer<typeof _propertyFormValuesSchema>;
