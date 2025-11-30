import type { CreateOwnerRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { ownerDtoAdapter } from '@/modules/shared/infrastructure/mappers/ownerDto/ownerDto.adapter';
import { createOwnerSchema, ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const CREATE_OWNER_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/owners`;

export const createOwnerRequest: CreateOwnerRequest = async (owner): Promise<Owner> => {
  const ownerResponseDto = await api
    .post<OwnerResponseDto>(CREATE_OWNER_REQUEST_URL, { json: createOwnerSchema.parse(owner) })
    .json();

  const ownerResponse = ownerDtoAdapter(ownerResponseDto);

  return ownerSchema.parse(ownerResponse);
};
