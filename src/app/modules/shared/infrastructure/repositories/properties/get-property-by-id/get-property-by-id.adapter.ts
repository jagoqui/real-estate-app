import type { GetPropertyByIdCommand } from '@/modules/shared/domain/commands/property.commands';
import type { Property } from '@/modules/shared/domain/models/property.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { PROPERTY_ENDPOINTS } from '@/modules/shared/infrastructure/constants/property-endpoints.constants';
import type { PropertyResponseDto } from '@/modules/shared/infrastructure/dtos/property-response.dto';
import { mapPropertyToModel } from '@/modules/shared/infrastructure/mappers/property/property.mapper';
import { propertyResponseSchema } from '@/modules/shared/infrastructure/schemas/property-response.schema';

export const getPropertyByIdAdapter = async (args: GetPropertyByIdCommand): Promise<Property> => {
  const url = PROPERTY_ENDPOINTS.BY_ID(args.propertyId);

  const propertyResponseDto = await api.get<PropertyResponseDto>(url).json();

  const validPropertyResponseDto = propertyResponseSchema.parse(propertyResponseDto);

  return mapPropertyToModel(validPropertyResponseDto);
};
