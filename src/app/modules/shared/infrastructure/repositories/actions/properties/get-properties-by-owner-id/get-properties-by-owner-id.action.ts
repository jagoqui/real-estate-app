import type { GetPropertiesByOwnerIdInput } from '@/modules/shared/domain/inputs/property.input';
import type { Property } from '@/modules/shared/domain/models/property.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertyResponseSchema } from '@/modules/shared/infrastructure/schemas/property-response.schema';

export const getPropertiesByOwnerIdAction = async (input: GetPropertiesByOwnerIdInput): Promise<Array<Property>> => {
  const url = PROPERTY_ENDPOINTS.BY_OWNER_ID(input.ownerId);

  const propertiesResponseDto = await api.get<Array<PropertyResponseDto>>(url).json();

  const validPropertiesResponseDto = propertyResponseSchema.array().parse(propertiesResponseDto);

  return validPropertiesResponseDto.map(mapPropertyToModel);
};
