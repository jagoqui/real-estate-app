import type { OwnerDto } from '@/modules/shared/application/dtos/owner.dto';
import type { Owner } from '@/modules/shared/domain/schemas/owner.schema';

export const ownerAdapter = (owner: Owner): OwnerDto => ({
  idOwner: owner.id,
  userId: owner.userId,
  name: owner.name,
  address: owner.address,
  phone: owner.phone,
  email: owner.email,
  photo: owner.photoUrl,
  birthday: owner.birthday,
  createdAt: owner.createdAt,
});
