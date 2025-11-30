import type { GetPropertiesByFilterRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { propertyFiltersSchema } from '@/modules/shared/infrastructure/schemas/propertyFilters.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTIES_BY_FILTER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/properties/filter`;

export const getPropertiesByFilterRequest: GetPropertiesByFilterRequest = async filter => {
  const propertyDto = await api
    .get<Array<PropertyResponseDto>>(GET_PROPERTIES_BY_FILTER_REQUEST_URL, {
      searchParams: propertyFiltersSchema.parse(filter),
    })
    .json();

  const property = propertyDto.map(mapPropertyToModel);

  return propertySchema.array().parse(property);
};
