import type { DeletePropertyRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const DELETE_PROPERTY_REQUEST_URL = (propertyId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/${propertyId}`;

export const deletePropertyRequest: DeletePropertyRequest = async ({ propertyId }) => {
  await api.delete<void>(DELETE_PROPERTY_REQUEST_URL(propertyId));
};
