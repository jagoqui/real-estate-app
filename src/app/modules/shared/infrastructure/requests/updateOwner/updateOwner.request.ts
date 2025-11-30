import { ownerAdapter } from '@/modules/shared/application/adapters/owner/owner.adapter';
import { ownerDtoAdapter } from '@/modules/shared/application/adapters/ownerDto/ownerDto.adapter';
import type { OwnerResponseDto } from '@/modules/shared/application/dtos/owner.dto';
import type { UpdateOwnerRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const UPDATE_USER_REQUEST_URL = (ownerId: string): string => `${VARIABLES.VITE_API_BASE_URL}/owners/${ownerId}`;

export const updateOwnerRequest: UpdateOwnerRequest = async (owner): Promise<Owner> => {
  const ownerDto = ownerAdapter(owner);

  const ownerResponseDto = await api
    .put<OwnerResponseDto>(`${UPDATE_USER_REQUEST_URL(owner.id)}`, { json: ownerDto })
    .json();

  const ownerResponse = ownerDtoAdapter(ownerResponseDto);

  return ownerSchema.parse(ownerResponse);
};
