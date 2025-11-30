import type { UpdatePropertyRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/dataToFormDataHelper/dataToFormDataHelper.helper';
import { type Property } from '@/modules/shared/domain/models/property.model';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/propertyResponse.dto';
import { propertyAdapter } from '@/modules/shared/infrastructure/mappers/property/property.dto';
import { propertyFormValueDtoAdapter } from '@/modules/shared/infrastructure/mappers/propertyFormValueDto/propertyFormValueDto.adapter';
import { propertySchema } from '@/modules/shared/infrastructure/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

export const UPDATE_PROPERTY_REQUEST_URL = (propertyId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/properties/${propertyId}`;

export const updatePropertyRequest: UpdatePropertyRequest = async (args): Promise<Property> => {
  const propertyDto = propertyFormValueDtoAdapter(args.data);
  const body = objectToFormDataHelper(propertyDto);

  const propertyResponseDto = await api
    .put<PropertyResponseDto>(`${UPDATE_PROPERTY_REQUEST_URL(args.propertyId)}`, { body })
    .json();

  const propertyResponse = propertyAdapter(propertyResponseDto);

  return propertySchema.parse(propertyResponse);
};
