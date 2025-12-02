import type { ChangePasswordInput } from '@/modules/shared/domain/inputs/change-password.input';
import { api } from '../../clients/ky/ky.client';
import { USER_ENDPOINTS } from '../../constants/user-endpoints.constants';

export const changeUserPasswordAction = async (input: ChangePasswordInput): Promise<void> => {
  await api.post(`${USER_ENDPOINTS.BY_ID(input.userId)}/change-password`, {
    json: { newPassword: input.newPassword },
  });
};
