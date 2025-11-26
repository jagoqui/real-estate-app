import { tokenSchema } from '@/modules/shared/domain/schemas/token.schema';
import type z from 'zod';
import { userSchema } from './user.schema';

export const authResponseSchema = tokenSchema.extend({
  user: userSchema,
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
