import type { GetOwnerByUserIdRequest } from '@/modules/shared/domain/contracts/owners-request.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { mapOwnerToModel } from '../../mappers/owner/owner.mapper';

export const GET_OWNER_BY_USER_ID_REQUEST_URL = (userId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/owners/user/${userId}`;

export const getOwnerByUserIdRequest: GetOwnerByUserIdRequest = async ({ userId }): Promise<Array<Owner>> => {
  const ownersDTO = await api.get<Array<OwnerResponseDto>>(GET_OWNER_BY_USER_ID_REQUEST_URL(userId)).json();

  const owners = ownersDTO.map(mapOwnerToModel);

  return ownerSchema.array().parse(owners);
};
