import { propertyAdapter } from '@/modules/shared/application/adapters/property/property.dto';
import type { PropertyResponseDto } from '@/modules/shared/application/dtos/propertyResponse.dto';
import type { GetPropertyByIdRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { propertySchema } from '@/modules/shared/domain/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const GET_PROPERTY_BY_ID_REQUEST_URL = (propertyId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/${propertyId}`;

export const getPropertyByIdRequest: GetPropertyByIdRequest = async ({ propertyId }) => {
  const propertyDto = await api.get<PropertyResponseDto>(GET_PROPERTY_BY_ID_REQUEST_URL(propertyId)).json();

  const property = propertyAdapter(propertyDto);

  return propertySchema.parse(property);
};
