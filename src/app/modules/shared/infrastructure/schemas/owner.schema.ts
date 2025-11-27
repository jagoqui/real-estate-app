import { COMMONS_VALIDATIONS, objectIdSchema } from '@/modules/shared/infrastructure/schemas/commonsValidations.schema';
import z from 'zod';

export const ownerSchema = z.object({
  id: objectIdSchema,
  userId: objectIdSchema,
  name: z.string().min(COMMONS_VALIDATIONS.NAME.min).max(COMMONS_VALIDATIONS.NAME.max),
  address: z.string().max(COMMONS_VALIDATIONS.ADDRESS.max).optional(),
  phone: z.string().regex(COMMONS_VALIDATIONS.PHONE.pattern).or(z.literal('')).optional(),
  email: z.email().min(COMMONS_VALIDATIONS.EMAIL.min).max(COMMONS_VALIDATIONS.EMAIL.max).optional(),
  photoUrl: z.string().optional(),
  birthday: z.string().optional(),
  createdAt: z.iso.datetime().optional(),
});

export type Owner = z.infer<typeof ownerSchema>;

export const createOwnerSchema = ownerSchema.omit({ id: true, createdAt: true });

export type CreateOwner = z.infer<typeof createOwnerSchema>;
