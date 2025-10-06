import type { DeleteOwnerRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const DELETE_USER_REQUEST_URL = (ownerId: string): string => `${VARIABLES.VITE_API_BASE_URL}/owners/${ownerId}`;

export const deleteOwnerRequest: DeleteOwnerRequest = async ({ id }): Promise<void> => {
  await api.delete<void>(DELETE_USER_REQUEST_URL(id));
};
