import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';

export const deleteOwnerAction = async (ownerId: string): Promise<void> => {
  await api.delete(OWNER_ENDPOINTS.BY_ID(ownerId));
};
