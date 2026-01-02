import type { RegisterCommand } from '../../domain/commands/auth.command';

export type RegisterCommand2 = RegisterCommand & {
  confirmPassword: string;
};
