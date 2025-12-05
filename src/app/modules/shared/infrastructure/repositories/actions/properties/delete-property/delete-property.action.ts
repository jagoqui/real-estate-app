import type { DeletePropertyInput } from '@/modules/shared/domain/inputs/property.input';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';

export const deletePropertyAction = async (input: DeletePropertyInput): Promise<void> => {
  const url = PROPERTY_ENDPOINTS.BY_ID(input.propertyId);

  await api.delete(url);
};
