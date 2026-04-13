import type { DeletePropertyCommand } from '@/modules/shared/domain/commands/property.commands';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';

export const deletePropertyAdapter = async (args: DeletePropertyCommand): Promise<void> => {
  const url = PROPERTY_ENDPOINTS.BY_ID(args.propertyId);

  await api.delete(url);
};
