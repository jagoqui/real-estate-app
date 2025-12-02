import type { UpdateUserInput } from '@/modules/shared/domain/inputs/users/update-user.input';
import type { User } from '@/modules/shared/domain/models/user.model';
import { USER_ROLES_DTO } from '../../dtos/role.dto';
import type { UserPayloadDto, UserResponseDto } from '../../dtos/user.dto';
import { mapUserRoleToDto, mapUserRoleToModel } from '../user-role/user-role.mapper';

export const mapUserResponseToModel = (dto: UserResponseDto): User => ({
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

export const mapUserToPayloadDto = (user: UpdateUserInput): UserPayloadDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photoFile: user.photoFile,
  role: user.role ? mapUserRoleToDto(user.role) : undefined,
  phoneNumber: user.phone,
  bio: user.bio,
});
