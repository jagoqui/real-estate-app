import type { CreateOwnerCommand } from '@/modules/shared/domain/commands/owner.command';
import type { Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToModel } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const createOwnerAdapter = async (args: CreateOwnerCommand): Promise<Owner> => {
  const ownerResponseDto = await api.post<OwnerResponseDto>(OWNER_ENDPOINTS.ROOT, { json: args }).json();

  const owner = mapOwnerToModel(ownerResponseDto);

  return ownerSchema.parse(owner);
};
