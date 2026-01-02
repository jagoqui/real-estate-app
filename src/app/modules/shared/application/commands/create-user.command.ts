import type { CreateUserCommand } from '../../domain/commands/user.command';

export type CreateUserCommand2 = CreateUserCommand & {
  confirmPassword: string;
};
