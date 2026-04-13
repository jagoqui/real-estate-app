import z from 'zod';
import type { ChangePasswordData } from '../../domain/data/change-password.data';

const MIN_PASSWORD_LENGTH = 8;

export const changePasswordFormValuesSchema = z
  .object({
    userId: z.string().min(1, 'User ID is required'),
    newPassword: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, 'Confirm Password must be at least 8 characters long'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }) satisfies z.ZodType<ChangePasswordData>;
