import type { GetPropertiesCountByOwnerIdRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import z from 'zod';

export const GET_PROPERTIES_COUNT_BY_OWNER_ID_REQUEST_URL = (ownerId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/owners/${ownerId}/properties-count`;

export const getPropertiesCountByOwnerIdRequest: GetPropertiesCountByOwnerIdRequest = async ({
  ownerId,
}): Promise<number> => {
  const response = await api.get<{ count: number }>(GET_PROPERTIES_COUNT_BY_OWNER_ID_REQUEST_URL(ownerId)).json();

  return z.number().parse(response.count);
};
