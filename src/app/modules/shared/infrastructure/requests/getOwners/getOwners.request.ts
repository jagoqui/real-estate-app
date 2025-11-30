import type { GetOwnersRequest } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { ownerDtoAdapter } from '@/modules/shared/infrastructure/mappers/ownerDto/ownerDto.adapter';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';

export const GET_OWNERS_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/owners`;

export const getOwnersRequest: GetOwnersRequest = async (): Promise<Array<Owner>> => {
  const ownersDTO = await api.get<Array<OwnerResponseDto>>(GET_OWNERS_REQUEST_URL).json();

  const owners = ownersDTO.map(ownerDtoAdapter);

  return ownerSchema.array().parse(owners);
};
