import z from 'zod';
import type { UpdateUserData } from '../../domain/data/update-user.data';
import { type UserRole } from './../../domain/models/user-role.model';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MIN_PHONE_LENGTH = 7;
const MAX_PHONE_LENGTH = 15;
const MAX_BIO_LENGTH = 500;
const MAX_FILE_SIZE_MB = 5;
const BYTES_PER_KB = 1024;

export const updateUserFormValuesSchema = z.object({
  name: z
    .string()
    .min(MIN_NAME_LENGTH, 'Name must be at least 2 characters long')
    .max(MAX_NAME_LENGTH, 'Name must be at most 100 characters long')
    .optional(),
  email: z.email('Invalid email address').optional(),
  role: z.custom<UserRole>().optional(),
  phone: z
    .string()
    .min(MIN_PHONE_LENGTH, 'Phone number must be at least 7 characters long')
    .max(MAX_PHONE_LENGTH, 'Phone number must be at most 15 characters long')
    .optional(),
  bio: z.string().max(MAX_BIO_LENGTH, 'Bio must be at most 500 characters long').optional(),
  photoFile: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE_MB * BYTES_PER_KB * BYTES_PER_KB, 'File size must be less than 5MB')
    .optional()
    .nullable(),
}) satisfies z.ZodType<Partial<UpdateUserData>>;
