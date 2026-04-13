import type { ChangePasswordCommand } from '@/modules/shared/domain/commands/user.commands';

export const CHANGE_PASSWORD_COMMAND_MOCK: ChangePasswordCommand = {
  userId: '123',
  newPassword: 'new-pass-456',
};
