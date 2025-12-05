import type { PropertyStatus } from '@/modules/shared/domain/models/property-statutes.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { mapPropertyStatusToModel } from '@/modules/shared/infrastructure/mappers/property-status/property-status.mapper';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import z from 'zod';

const GET_PROPERTY_STATUSES_URL = `${VARIABLES.VITE_API_BASE_URL}/properties/statuses`;

export const getPropertyStatusesAction = async (): Promise<Array<PropertyStatus>> => {
  const propertyStatusesResponseDto = await api.get<Array<string>>(GET_PROPERTY_STATUSES_URL).json();

  const validPropertyStatusesResponseDto = z.array(z.string()).parse(propertyStatusesResponseDto);

  return validPropertyStatusesResponseDto.map(mapPropertyStatusToModel);
};
