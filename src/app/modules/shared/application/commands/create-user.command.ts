import type { CreateUserInput } from '../../domain/inputs/user.input';

export type CreateUserCommand = CreateUserInput & {
  confirmPassword: string;
};
