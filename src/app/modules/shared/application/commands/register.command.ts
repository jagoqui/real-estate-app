import type { RegisterInput } from '../../domain/inputs/auth.input';

export type RegisterCommand = RegisterInput & {
  confirmPassword: string;
};
