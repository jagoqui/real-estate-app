import type { CreateUser } from '@/modules/shared/domain/models/user.model';

export type RegisterFormValues = CreateUser & {
  confirmPassword: string;
};
