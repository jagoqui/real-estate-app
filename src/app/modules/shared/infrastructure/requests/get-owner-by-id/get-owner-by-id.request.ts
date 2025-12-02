import { api } from '@/app/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/app/variables/infrastructure/constants/variables.constants';
import { mapOwnerToModel } from '../../mappers/owner/owner.mapper';

import type { GetOwnerByIdRequest } from '@/modules/shared/domain/contracts/owners-request.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { type OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const OWNER_BY_ID_REQUEST_URL = (id: string): string => `${VARIABLES.VITE_API_BASE_URL}/owners/${id}`;

export const getOwnerByIdRequest: GetOwnerByIdRequest = async ({ id }): Promise<Owner> => {
  const ownerDTO = await api.get<OwnerResponseDto>(OWNER_BY_ID_REQUEST_URL(id)).json();

  const owner = mapOwnerToModel(ownerDTO);

  return ownerSchema.parse(owner);
};
