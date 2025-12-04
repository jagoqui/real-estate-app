import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import type { CreatePropertyInput } from '@/modules/shared/domain/inputs/property.input';
import type { Property } from '@/modules/shared/domain/models/property.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import {
  mapCreatePropertyInputToPayload,
  mapPropertyToModel,
} from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertyResponseSchema } from '@/modules/shared/infrastructure/schemas/property-response.schema';

export const createPropertyAction = async (input: CreatePropertyInput): Promise<Property> => {
  const propertyDto = mapCreatePropertyInputToPayload(input);
  const body = objectToFormDataHelper(propertyDto);

  const propertyResponseDto = await api.post<PropertyResponseDto>(PROPERTY_ENDPOINTS.ROOT, { body }).json();

  const validPropertyResponseDto = propertyResponseSchema.parse(propertyResponseDto);

  return mapPropertyToModel(validPropertyResponseDto);
};
