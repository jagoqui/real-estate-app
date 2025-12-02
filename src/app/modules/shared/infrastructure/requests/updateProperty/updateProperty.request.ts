import type { UpdatePropertyRequest } from '@/modules/shared/domain/contracts/properties-requests.contract';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import { type Property } from '@/modules/shared/domain/models/property.model';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { propertyFormValueToDto } from '@/modules/shared/infrastructure/mappers/property-form-value/property-form-value.mapper';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const UPDATE_PROPERTY_REQUEST_URL = (propertyId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/${propertyId}`;

export const updatePropertyRequest: UpdatePropertyRequest = async (args): Promise<Property> => {
  const propertyDto = propertyFormValueToDto(args.data);
  const body = objectToFormDataHelper(propertyDto);

  const propertyResponseDto = await api
    .put<PropertyResponseDto>(`${UPDATE_PROPERTY_REQUEST_URL(args.propertyId)}`, { body })
    .json();

  const propertyResponse = mapPropertyToModel(propertyResponseDto);

  return propertySchema.parse(propertyResponse);
};
