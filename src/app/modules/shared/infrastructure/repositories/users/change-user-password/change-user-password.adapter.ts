import type { ChangePasswordCommand } from '@/modules/shared/domain/commands/user.commands';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';

export const changeUserPasswordAdapter = async (args: ChangePasswordCommand): Promise<void> => {
  await api.post(`${USER_ENDPOINTS.BY_ID(args.userId)}/change-password`, {
    json: { newPassword: args.newPassword },
  });
};
