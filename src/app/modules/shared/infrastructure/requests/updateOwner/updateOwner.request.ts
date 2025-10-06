import { ownerAdapter } from '@/modules/shared/application/adapters/owner/owner.adapter';
import { ownerDtoAdapter } from '@/modules/shared/application/adapters/ownerDto/ownerDto.adapter';
import type { OwnerDto } from '@/modules/shared/application/dtos/owner.dto';
import type { UpdateOwnerRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner, ownerSchema } from '@/modules/shared/domain/schemas/owner.schema';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const UPDATE_USER_REQUEST_URL = (ownerId: string): string => `${VARIABLES.VITE_API_BASE_URL}/owner/${ownerId}`;

export const updateOwnerRequest: UpdateOwnerRequest = async (owner): Promise<Owner> => {
  const ownerDto = ownerAdapter(owner);

  const ownerResponseDto = await api.put<OwnerDto>(`${UPDATE_USER_REQUEST_URL(owner.id)}`, { json: ownerDto }).json();

  const ownerResponse = ownerDtoAdapter(ownerResponseDto);

  return ownerSchema.parse(ownerResponse);
};
