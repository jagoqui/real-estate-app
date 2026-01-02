import type { Property } from '@/modules/shared/domain/models/property.model';
import type { GetPropertiesByFilterQuery } from '@/modules/shared/domain/queries/property.queries';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertyResponseSchema } from '@/modules/shared/infrastructure/schemas/property-response.schema';

export const getPropertiesByFilterAdapter = async (args: GetPropertiesByFilterQuery): Promise<Array<Property>> => {
  const url = `${PROPERTY_ENDPOINTS.ROOT}/filter`;

  const propertiesResponseDto = await api
    .get<Array<PropertyResponseDto>>(url, { searchParams: args as Record<string, string> })
    .json();

  const validPropertiesResponseDto = propertyResponseSchema.array().parse(propertiesResponseDto);

  return validPropertiesResponseDto.map(mapPropertyToModel);
};
