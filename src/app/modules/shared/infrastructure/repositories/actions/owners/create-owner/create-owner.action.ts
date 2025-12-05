import type { CreateOwnerInput } from '@/modules/shared/domain/inputs/owner.input';
import type { Owner } from '@/modules/shared/domain/models/owner.model';
import { api } from '@/modules/shared/infrastructure/clients/ky/ky.client';
import { OWNER_ENDPOINTS } from '@/modules/shared/infrastructure/constants/owner-endpoints.constants';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';
import { mapOwnerToModel } from '@/modules/shared/infrastructure/mappers/owner/owner.mapper';
import { ownerSchema } from '@/modules/shared/infrastructure/schemas/owner.schema';

export const createOwnerAction = async (input: CreateOwnerInput): Promise<Owner> => {
  const payload = {
    userId: input.userId,
    name: input.name,
    address: input.address,
    phone: input.phone,
    email: input.email,
    birthday: input.birthday,
  };

  const ownerResponseDto = await api.post<OwnerResponseDto>(OWNER_ENDPOINTS.ROOT, { json: payload }).json();

  const owner = mapOwnerToModel(ownerResponseDto);

  return ownerSchema.parse(owner);
};
