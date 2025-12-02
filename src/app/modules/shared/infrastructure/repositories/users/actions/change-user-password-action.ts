import type { ChangePasswordInput } from '@/modules/shared/domain/inputs/users/change-password.input';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';

export const changeUserPasswordAction = async (input: ChangePasswordInput): Promise<void> => {
  await api.post(`${USER_ENDPOINTS.BY_ID(input.userId)}/change-password`, {
    json: { newPassword: input.newPassword },
  });
};
