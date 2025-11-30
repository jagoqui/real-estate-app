import type { GetPropertiesByOwnerIdRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTIES_BY_OWNER_ID_REQUEST_URL = (ownerId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/owner/${ownerId}`;

export const getPropertiesByOwnerIdRequest: GetPropertiesByOwnerIdRequest = async ({ ownerId }) => {
  const propertyDto = await api.get<Array<PropertyResponseDto>>(GET_PROPERTIES_BY_OWNER_ID_REQUEST_URL(ownerId)).json();

  const properties = propertyDto.map(mapPropertyToModel);

  return propertySchema.array().parse(properties);
};
