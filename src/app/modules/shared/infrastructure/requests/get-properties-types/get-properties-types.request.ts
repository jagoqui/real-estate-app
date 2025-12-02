import type { GetPropertiesTypesRequest } from '@/modules/shared/domain/contracts/properties-requests.contract';
import { type PropertyTypes } from '@/modules/shared/domain/models/property-types.model';
import { propertyTypesSchema } from '@/modules/shared/infrastructure/schemas/property-types.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTIES_TYPES_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/properties/types`;

export const getPropertiesTypesRequest: GetPropertiesTypesRequest = async () => {
  const response = await api.get<Array<PropertyTypes>>(GET_PROPERTIES_TYPES_REQUEST_URL).json();

  return propertyTypesSchema.array().parse(response);
};
