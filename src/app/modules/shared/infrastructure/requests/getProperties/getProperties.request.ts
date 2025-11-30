import type { GetPropertiesRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/propertyResponse.dto';
import { propertyAdapter } from '@/modules/shared/infrastructure/mappers/property/property.dto';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTIES_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/properties`;

export const getPropertiesRequest: GetPropertiesRequest = async () => {
  const propertyDto = await api.get<Array<PropertyResponseDto>>(GET_PROPERTIES_REQUEST_URL).json();

  const properties = propertyDto.map(propertyAdapter);

  return propertySchema.array().parse(properties);
};
