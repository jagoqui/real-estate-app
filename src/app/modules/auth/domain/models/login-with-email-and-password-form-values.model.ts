import type { CreateUser } from '@/modules/shared/domain/models/user.model';

export type LoginWithEmailAndPasswordFormValues = Pick<CreateUser, 'email'> & {
  password: string;
};
