import { COMMONS_VALIDATIONS, objectIdSchema } from '@/modules/shared/domain/schemas/commonsValidations.schema';
import z from 'zod';

export const ownerSchema = z.object({
  id: objectIdSchema,
  name: z.string().min(COMMONS_VALIDATIONS.NAME.min).max(COMMONS_VALIDATIONS.NAME.max),
  address: z.string().min(COMMONS_VALIDATIONS.ADDRESS.min).max(COMMONS_VALIDATIONS.ADDRESS.max),
  photoUrl: z.url().min(COMMONS_VALIDATIONS.PHOTO.min),
  birthday: z.iso.datetime(),
});

export type Owner = z.infer<typeof ownerSchema>;

export type CreateOwner = z.infer<typeof ownerSchema.omit<{ id: true }>>;
