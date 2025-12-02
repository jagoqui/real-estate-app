import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { USER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/user-endpoints.constants';

export const deleteUserAction = async (userId: string): Promise<void> =>
  await api.delete<void>(`${USER_ENDPOINTS.BY_ID(userId)}`).json();
