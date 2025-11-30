import type { Owner } from '@/modules/shared/domain/models/owner.model';
import type { OwnerResponseDto } from '@/modules/shared/infrastructure/dtos/owner.dto';

export const mapOwnerToDto = (owner: Owner): OwnerResponseDto => ({
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

export const mapOwnerToModel = (ownerDTO: OwnerResponseDto): Owner => ({
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
