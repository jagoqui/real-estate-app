import { propertyAdapter } from '@/modules/shared/application/adapters/property/property.dto';
import type { PropertyResponseDto } from '@/modules/shared/application/dtos/propertyResponse.dto';
import type { UpdatePropertyStatusRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const UPDATE_PROPERTY_STATUS_REQUEST_URL = (propertyId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/${propertyId}/status`;

export const updatePropertyStatusRequest: UpdatePropertyStatusRequest = async ({ propertyId, status }) => {
  const propertyDto = await api
    .patch<PropertyResponseDto>(UPDATE_PROPERTY_STATUS_REQUEST_URL(propertyId), {
      json: { status },
    })
    .json();

  const property = propertyAdapter(propertyDto);

  return propertySchema.parse(property);
};
