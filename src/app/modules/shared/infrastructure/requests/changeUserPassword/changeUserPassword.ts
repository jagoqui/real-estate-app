import type { ChangeUserPasswordRequest } from '@/modules/shared/domain/contracts/users-requests.contract';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const CHANGE_USER_PASSWORD_REQUEST_URL = (userId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/users/${userId}/change-password`;

export const changeUserPasswordRequest: ChangeUserPasswordRequest = async (args): Promise<void> =>
  await api
    .post<void>(CHANGE_USER_PASSWORD_REQUEST_URL(args.id), {
      json: args,
    })
    .json();
