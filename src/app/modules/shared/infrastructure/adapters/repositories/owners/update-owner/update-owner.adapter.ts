import type { UpdateOwnerCommand } from '@/modules/shared/domain/commands/owner.command';
import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import type { Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToModel } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const updateOwnerAdapter = async (args: UpdateOwnerCommand): Promise<Owner> => {
  const body = objectToFormDataHelper(args);

  const ownerResponseDto = await api.put<OwnerResponseDto>(OWNER_ENDPOINTS.BY_ID(args.id), { body }).json();

  const owner = mapOwnerToModel(ownerResponseDto);

  return ownerSchema.parse(owner);
};
