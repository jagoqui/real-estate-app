import type { GetPropertyByIdRequest } from '@/modules/shared/domain/contracts/properties-requests.contract';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTY_BY_ID_REQUEST_URL = (propertyId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/${propertyId}`;

export const getPropertyByIdRequest: GetPropertyByIdRequest = async ({ propertyId }) => {
  const propertyDto = await api.get<PropertyResponseDto>(GET_PROPERTY_BY_ID_REQUEST_URL(propertyId)).json();

  const property = mapPropertyToModel(propertyDto);

  return propertySchema.parse(property);
};
