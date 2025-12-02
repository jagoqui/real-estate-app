import { api } from '../../clients/ky/ky.client';
import { USER_ENDPOINTS } from '../../constants/user-endpoints.constants';

export const deleteUserAction = async (userId: string): Promise<void> =>
  await api.delete<void>(`${USER_ENDPOINTS.BY_ID(userId)}`).json();
