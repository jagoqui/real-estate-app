import z from 'zod';
import { COMMONS_VALIDATIONS, objectIdSchema } from './commonsValidations.schema';
import { userRoleSchema } from './userRole.schema';

export const userSchema = z.object({
  id: objectIdSchema,
  email: z.email(),
  name: z.string().min(COMMONS_VALIDATIONS.NAME.min).max(COMMONS_VALIDATIONS.NAME.max).optional(),
  photoUrl: z.url().min(COMMONS_VALIDATIONS.PHOTO.min).optional(),
  googleId: z.string().optional(),
  role: userRoleSchema,
  isAdmin: z.boolean(),
  phone: z.string().regex(COMMONS_VALIDATIONS.PHONE.pattern).optional(),
  bio: z.string().min(COMMONS_VALIDATIONS.BIO.min).max(COMMONS_VALIDATIONS.BIO.max).optional(),
});

export const createUserSchema = userSchema
  .pick({
    email: true,
    name: true,
  })
  .extend({
    password: z.string().regex(COMMONS_VALIDATIONS.PASSWORD.pattern, {
      message:
        'Password must include uppercase, lowercase, number, and special character and be between 6 and 18 characters long.',
    }),
  });

export const loginUserWithEmailAndPasswordSchema = createUserSchema.pick({
  email: true,
  password: true,
});

export type User = z.infer<typeof userSchema>;

export type UpdateUser = Omit<User, 'photoUrl'>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type LoginUserWithEmailAndPassword = z.infer<typeof loginUserWithEmailAndPasswordSchema>;

export type ChangeUserPassword = Pick<User, 'id'> & { newPassword: string };
