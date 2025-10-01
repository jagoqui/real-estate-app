import {createUserSchema} from '@/modules/shared/domain/schemas/user.schema';
import z from 'zod';

export const loginWithEmailAndPasswordFormValuesSchema = createUserSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(1, 'Password is required'),
  });

export type LoginWithEmailAndPasswordFormValues = z.infer<
  typeof loginWithEmailAndPasswordFormValuesSchema
>;
