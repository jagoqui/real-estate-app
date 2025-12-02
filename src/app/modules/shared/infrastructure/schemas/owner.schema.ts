import {
  COMMONS_VALIDATIONS,
  objectIdSchema,
} from '@/modules/shared/infrastructure/schemas/commons-validations.schema';
import z from 'zod';
import type { CreateOwner, Owner } from '../../domain/models/owner.model';

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
}) satisfies z.ZodType<Owner>;

export const createOwnerSchema = ownerSchema.omit({ id: true, createdAt: true }) satisfies z.ZodType<
  Omit<Owner, 'id' | 'createdAt'>
> satisfies z.ZodType<CreateOwner>;
