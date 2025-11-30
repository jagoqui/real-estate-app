import type { GetPropertiesStatusesRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { type PropertyStatutes } from '@/modules/shared/domain/models/propertyStatutes.model';
import { propertyStatutesSchema } from '@/modules/shared/infrastructure/schemas/propertyStatutes.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTIES_STATUSES_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/properties/statuses`;

export const getPropertiesStatusesRequest: GetPropertiesStatusesRequest = async () => {
  const response = await api.get<Array<PropertyStatutes>>(GET_PROPERTIES_STATUSES_REQUEST_URL).json();

  return propertyStatutesSchema.array().parse(response);
};
