import type { UpdatePropertyCommand } from '@/modules/shared/domain/commands/property.commands';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import type { Property } from '@/modules/shared/domain/models/property.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import {
  mapCreatePropertyInputToPayload,
  mapPropertyToModel,
} from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertyResponseSchema } from '@/modules/shared/infrastructure/schemas/property-response.schema';

export const updatePropertyAdapter = async (args: UpdatePropertyCommand): Promise<Property> => {
  const url = `${PROPERTY_ENDPOINTS.BY_ID(args.id)}`;

  const propertyDto = mapCreatePropertyInputToPayload(args);
  const body = objectToFormDataHelper(propertyDto);

  const propertyResponseDto = await api.put<PropertyResponseDto>(url, { body }).json();

  const validPropertyResponseDto = propertyResponseSchema.parse(propertyResponseDto);

  return mapPropertyToModel(validPropertyResponseDto);
};
