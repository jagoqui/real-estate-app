import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import z from 'zod';

export const getPropertiesCountByOwnerIdAction = async (ownerId: string): Promise<number> => {
  const response = await api.get<{ count: number }>(OWNER_ENDPOINTS.PROPERTIES_COUNT(ownerId)).json();

  return z.number().parse(response.count);
};
