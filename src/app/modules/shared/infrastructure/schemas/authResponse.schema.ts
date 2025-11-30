import { tokenSchema } from '@/modules/shared/infrastructure/schemas/token.schema';
import type z from 'zod';
import type { AuthResponse } from '../../domain/models/authResponse.model';
import { userSchema } from './user.schema';

export const authResponseSchema = tokenSchema.extend({
  user: userSchema,
}) satisfies z.ZodType<AuthResponse>;
