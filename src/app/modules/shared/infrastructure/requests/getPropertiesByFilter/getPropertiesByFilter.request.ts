import { propertyAdapter } from '@/modules/shared/application/adapters/property/property.dto';
import type { PropertyResponseDto } from '@/modules/shared/application/dtos/propertyResponse.dto';
import type { GetPropertiesByFilterRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { propertySchema } from '@/modules/shared/domain/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTIES_BY_FILTER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/properties/filter`;

export const getPropertiesByFilterRequest: GetPropertiesByFilterRequest = async filter => {
  const propertyDto = await api
    .post<Array<PropertyResponseDto>>(GET_PROPERTIES_BY_FILTER_REQUEST_URL, {
      json: filter,
    })
    .json();

  const property = propertyDto.map(propertyAdapter);

  return propertySchema.array().parse(property);
};
