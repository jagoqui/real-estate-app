import type { Owner } from '@/app/modules/owners/domain/schemas/owner.schema';
import type { OwnerDto } from '../../dtos/owner.dto';

export const ownerDtoAdapter = (ownerDTO: OwnerDto): Owner => ({
  id: ownerDTO.idOwner,
  name: ownerDTO.name,
  address: ownerDTO.address,
  photoUrl: ownerDTO.photo,
  birthday: ownerDTO.birthday,
});
