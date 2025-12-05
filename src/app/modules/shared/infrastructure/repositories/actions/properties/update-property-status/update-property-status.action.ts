import type { UpdatePropertyStatusInput } from '@/modules/shared/domain/inputs/property.input';
import type { Property } from '@/modules/shared/domain/models/property.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertyResponseSchema } from '@/modules/shared/infrastructure/schemas/property-response.schema';

export const updatePropertyStatusAction = async (input: UpdatePropertyStatusInput): Promise<Property> => {
  const url = `${PROPERTY_ENDPOINTS.BY_ID(input.propertyId)}/status`;

  const propertyResponseDto = await api.patch<PropertyResponseDto>(url, { json: { status: input.status } }).json();

  const validPropertyResponseDto = propertyResponseSchema.parse(propertyResponseDto);

  return mapPropertyToModel(validPropertyResponseDto);
};
