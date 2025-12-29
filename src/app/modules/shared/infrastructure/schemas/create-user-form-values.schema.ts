import z from 'zod';
import type { CreateUserCommand } from '../../application/commands/create-user.command';
import { userRoleSchema } from './user-role.schema';

const MIN_PASSWORD_LENGTH = 6;

export const createUserFormValuesSchema = z
  .object({
    email: z.email().min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    role: userRoleSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  }) satisfies z.ZodType<CreateUserCommand>;
