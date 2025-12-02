import type { Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToModel } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const getOwnerByIdAction = async (ownerId: string): Promise<Owner> => {
  const ownerDTO = await api.get<OwnerResponseDto>(OWNER_ENDPOINTS.BY_ID(ownerId)).json();

  const owner = mapOwnerToModel(ownerDTO);

  return ownerSchema.parse(owner);
};
