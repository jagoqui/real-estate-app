import type { Owner } from '@/modules/shared/domain/schemas/owner.schema';
import type { OwnerDto } from '../../../../shared/application/dtos/owner.dto';

export const ownerDtoAdapter = (ownerDTO: OwnerDto): Owner => ({
  id: ownerDTO.idOwner,
  userId: ownerDTO.userId,
  name: ownerDTO.name,
  address: ownerDTO.address,
  phone: ownerDTO.phone,
  email: ownerDTO.email,
  photoUrl: ownerDTO.photo,
  birthday: ownerDTO.birthday,
  createdAt: ownerDTO.createdAt,
});
