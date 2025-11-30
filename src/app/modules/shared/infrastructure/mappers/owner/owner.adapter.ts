import type { Owner } from '@/modules/shared/domain/models/owner.model';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';

export const ownerAdapter = (owner: Owner): OwnerResponseDto => ({
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
