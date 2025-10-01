import {createUserSchema} from '@/modules/shared/domain/schemas/user.schema';
import z from 'zod';

export const registerFormValuesSchema = createUserSchema
  .extend({
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerFormValuesSchema>;
