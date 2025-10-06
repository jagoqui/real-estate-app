import { ownerDtoAdapter } from '@/modules/shared/application/adapters/ownerDto/ownerDto.adapter';
import type { OwnerDto } from '@/modules/shared/application/dtos/owner.dto';
import type { CreateOwnerRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner, ownerSchema } from '@/modules/shared/domain/schemas/owner.schema';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const CREATE_OWNER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/owner`;

export const createOwnerRequest: CreateOwnerRequest = async (owner): Promise<Owner> => {
  const ownerResponseDto = await api.post<OwnerDto>(CREATE_OWNER_REQUEST_URL, { json: owner }).json();

  const ownerResponse = ownerDtoAdapter(ownerResponseDto);

  return ownerSchema.parse(ownerResponse);
};
