import type { UpdateOwnerRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToDto } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { mapOwnerToModel } from '../../mappers/owner/owner.mapper';

export const UPDATE_USER_REQUEST_URL = (ownerId: string): string => `${VARIABLES.VITE_API_BASE_URL}/owners/${ownerId}`;

export const updateOwnerRequest: UpdateOwnerRequest = async (owner): Promise<Owner> => {
  const ownerDto = mapOwnerToDto(owner);

  const ownerResponseDto = await api
    .put<OwnerResponseDto>(`${UPDATE_USER_REQUEST_URL(owner.id)}`, { json: ownerDto })
    .json();

  const ownerResponse = mapOwnerToModel(ownerResponseDto);

  return ownerSchema.parse(ownerResponse);
};
