import { objectToFormDataHelper } from '@/modules/shared/domain/helpers/data-to-form-data/data-to-form-data.helper';
import type { UpdateOwnerInput } from '@/modules/shared/domain/inputs/owner.input';
import type { Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToModel } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const updateOwnerAction = async (input: UpdateOwnerInput): Promise<Owner> => {
  const payload = {
    userId: input.userId,
    name: input.name,
    address: input.address,
    phone: input.phone,
    email: input.email,
    birthday: input.birthday,
    photoFile: input.photoFile,
  };

  const body = objectToFormDataHelper(payload);

  const ownerResponseDto = await api.put<OwnerResponseDto>(OWNER_ENDPOINTS.BY_ID(input.id), { body }).json();

  const owner = mapOwnerToModel(ownerResponseDto);

  return ownerSchema.parse(owner);
};
