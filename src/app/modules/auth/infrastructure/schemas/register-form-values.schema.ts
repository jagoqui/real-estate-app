import type { RegisterCommand } from '@/modules/shared/application/commands/register.command';
import { userRoleSchema } from '@/modules/shared/infrastructure/schemas/user-role.schema';
import z from 'zod';

const MIN_PASSWORD_LENGTH = 6;

export const registerFormValuesSchema = z
  .object({
    email: z.email().min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    role: userRoleSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }) satisfies z.ZodType<RegisterCommand>;
