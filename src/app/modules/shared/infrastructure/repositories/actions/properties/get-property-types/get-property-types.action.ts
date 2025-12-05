import type { PropertyType } from '@/modules/shared/domain/models/property-types.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { mapPropertyTypeToModel } from '@/modules/shared/infrastructure/mappers/property-type/property-type.mapper';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import z from 'zod';

const GET_PROPERTY_TYPES_URL = `${VARIABLES.VITE_API_BASE_URL}/properties/types`;

export const getPropertyTypesAction = async (): Promise<Array<PropertyType>> => {
  const propertyTypesResponseDto = await api.get<Array<string>>(GET_PROPERTY_TYPES_URL).json();

  const validPropertyTypesResponseDto = z.array(z.string()).parse(propertyTypesResponseDto);

  return validPropertyTypesResponseDto.map(mapPropertyTypeToModel);
};
