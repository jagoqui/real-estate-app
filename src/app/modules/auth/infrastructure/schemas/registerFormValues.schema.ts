import { createUserSchema } from '@/modules/shared/infrastructure/schemas/user.schema';
import z from 'zod';
import type { RegisterFormValues } from '../../domain/models/registerFormValues.model';

export const registerFormValuesSchema = createUserSchema
  .extend({
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }) satisfies z.ZodType<RegisterFormValues>;
