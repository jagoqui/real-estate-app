import type { GetOwnersRequest } from '@/modules/shared/domain/contracts/owners-request.contract';
import { type Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { mapOwnerToModel } from '../../mappers/owner/owner.mapper';

export const GET_OWNERS_REQUEST_URL = `${VARIABLES.VITE_API_BASE_URL}/owners`;

export const getOwnersRequest: GetOwnersRequest = async (): Promise<Array<Owner>> => {
  const ownersDTO = await api.get<Array<OwnerResponseDto>>(GET_OWNERS_REQUEST_URL).json();

  const owners = ownersDTO.map(mapOwnerToModel);

  return ownerSchema.array().parse(owners);
};
