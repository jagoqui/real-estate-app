import type { User } from '@/modules/shared/domain/models/user.model';
import { USER_ROLES_DTO } from '../../dtos/role.dto';
import type { UserDto } from '../../dtos/user.dto';
import { mapUserRoleToDto, mapUserRoleToModel } from '../user-role/user-role.mapper';

export const mapUserToModel = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  name: dto.name,
  photoUrl: dto.photoUrl,
  googleId: dto.googleId,
  role: mapUserRoleToModel(dto.role),
  isAdmin: dto.role === USER_ROLES_DTO.ADMIN,
  phone: dto.phoneNumber,
  bio: dto.bio,
});

export const mapUserToDto = (user: User): UserDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photoUrl: user.photoUrl,
  googleId: user.googleId,
  role: mapUserRoleToDto(user.role),
  phoneNumber: user.phone,
  bio: user.bio,
});
