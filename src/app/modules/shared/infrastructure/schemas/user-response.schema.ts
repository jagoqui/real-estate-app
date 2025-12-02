import z from 'zod';
import type { UserResponseDto } from '../dtos/user.dto';
import { COMMONS_VALIDATIONS, objectIdSchema } from './commons-validations.schema';
import { userRoleResponseSchema } from './user-role-response.schema';

export const userResponseSchema = z.object({
  id: objectIdSchema,
  email: z.email(),
  name: z.string().min(COMMONS_VALIDATIONS.NAME.min).max(COMMONS_VALIDATIONS.NAME.max).optional(),
  photoUrl: z.url().min(COMMONS_VALIDATIONS.PHOTO.min).optional(),
  googleId: z.string().optional(),
  role: userRoleResponseSchema,
  phoneNumber: z.string().regex(COMMONS_VALIDATIONS.PHONE.pattern).optional(),
  bio: z.string().min(COMMONS_VALIDATIONS.BIO.min).max(COMMONS_VALIDATIONS.BIO.max).optional(),
}) satisfies z.ZodType<UserResponseDto>;
