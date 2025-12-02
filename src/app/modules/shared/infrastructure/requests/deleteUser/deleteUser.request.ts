import type { DeleteUserRequest } from '@/modules/shared/domain/contracts/users-requests.contract';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const DELETE_USER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/users`;

export const deleteUserRequest: DeleteUserRequest = async ({ userId }): Promise<void> =>
  await api.delete<void>(`${DELETE_USER_REQUEST_URL}/${userId}`).json();
