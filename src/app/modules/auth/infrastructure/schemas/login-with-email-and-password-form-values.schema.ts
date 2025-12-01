import { createUserSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import z from 'zod';
import type { LoginWithEmailAndPasswordFormValues } from '../../domain/models/login-with-email-and-password-form-values.model';

export const loginWithEmailAndPasswordFormValuesSchema = createUserSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(1, 'Password is required'),
  }) satisfies z.ZodType<LoginWithEmailAndPasswordFormValues>;
