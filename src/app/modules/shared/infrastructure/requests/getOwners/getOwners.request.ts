import { ownerDtoAdapter } from '@/modules/shared/application/adapters/ownerDto/ownerDto.adapter';
import type { OwnerDto } from '@/modules/shared/application/dtos/owner.dto';
import type { GetOwnersRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner, ownerSchema } from '@/modules/shared/domain/schemas/owner.schema';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const GET_OWNERS_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/owners`;

export const getOwnersRequest: GetOwnersRequest = async (): Promise<Array<Owner>> => {
  const ownersDTO = await api.get<Array<OwnerDto>>(GET_OWNERS_REQUEST_URL).json();

  const owners = ownersDTO.map(ownerDtoAdapter);

  return ownerSchema.array().parse(owners);
};
