import { api } from '@/app/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/app/variables/infrastructure/constants/variables.constants';
import { ownerDtoAdapter } from '@/modules/shared/application/adapters/ownerDto/ownerDto.adapter';

import { type OwnerResponseDto } from '@/modules/shared/application/dtos/owner.dto';
import type { GetOwnerByIdRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { ownerSchema, type Owner } from '@/modules/shared/domain/schemas/owner.schema';

export const OWNER_BY_ID_REQUEST_URL = (id: string): string => `${VARIABLES.VITE_API_BASE_URL}/owners/${id}`;

export const getOwnerByIdRequest: GetOwnerByIdRequest = async ({ id }): Promise<Owner> => {
  const ownerDTO = await api.get<OwnerResponseDto>(OWNER_BY_ID_REQUEST_URL(id)).json();

  const owner = ownerDtoAdapter(ownerDTO);

  return ownerSchema.parse(owner);
};
