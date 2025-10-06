import { ownerDtoAdapter } from '@/modules/shared/application/adapters/ownerDto/ownerDto.adapter';
import type { OwnerDto } from '@/modules/shared/application/dtos/owner.dto';
import type { GetOwnerByUserIdRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner, ownerSchema } from '@/modules/shared/domain/schemas/owner.schema';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const GET_OWNER_BY_USER_ID_REQUEST_URL = (userId: string): string =>
  `${VARIABLES.VITE_API_BASE_URL}/owners/user/${userId}`;

export const getOwnerByUserIdRequest: GetOwnerByUserIdRequest = async ({ userId }): Promise<Array<Owner>> => {
  const ownersDTO = await api.get<Array<OwnerDto>>(GET_OWNER_BY_USER_ID_REQUEST_URL(userId!)).json();

  const owners = ownersDTO.map(ownerDtoAdapter);

  return ownerSchema.array().parse(owners);
};
