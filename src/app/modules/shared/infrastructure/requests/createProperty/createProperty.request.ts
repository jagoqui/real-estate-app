import { propertyAdapter } from '@/modules/shared/application/adapters/property/property.dto';
import { propertyFormValueDtoAdapter } from '@/modules/shared/application/adapters/propertyFormValueDto/propertyFormValueDto.adapter';
import type { PropertyResponseDto } from '@/modules/shared/application/dtos/propertyResponse.dto';
import type { CreatePropertyRequest } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/dataToFormDataHelper/dataToFormDataHelper.helper';
import { propertySchema } from '@/modules/shared/domain/schemas/property.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { api } from '../../clients/ky/ky.client';

const CREATE_PROPERTY_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/properties`;

export const createPropertyRequest: CreatePropertyRequest = async propertyData => {
  const propertyDto = propertyFormValueDtoAdapter(propertyData);
  const body = objectToFormDataHelper(propertyDto);

  const propertyResponseDto = await api
    .post<PropertyResponseDto>(CREATE_PROPERTY_REQUEST_URL, {
      body,
    })
    .json();

  const property = propertyAdapter(propertyResponseDto);

  return propertySchema.parse(property);
};
