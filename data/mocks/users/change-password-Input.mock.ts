import type { ChangePasswordCommand } from '@/modules/shared/domain/commands/user.command';

export const CHANGE_PASSWORD_INPUT_MOCK: ChangePasswordCommand = {
  userId: '123',
  newPassword: 'new-pass-456',
};
