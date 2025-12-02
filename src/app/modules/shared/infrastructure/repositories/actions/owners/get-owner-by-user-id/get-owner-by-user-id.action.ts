import type { Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToModel } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const getOwnerByUserIdAction = async (userId: string): Promise<Array<Owner>> => {
  const ownersDTO = await api.get<Array<OwnerResponseDto>>(OWNER_ENDPOINTS.BY_USER_ID(userId)).json();

  const owners = ownersDTO.map(mapOwnerToModel);

  return ownerSchema.array().parse(owners);
};
