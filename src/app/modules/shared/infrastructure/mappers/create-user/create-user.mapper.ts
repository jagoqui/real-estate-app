import type { CreateUser } from '@/modules/shared/domain/models/user.model';
import type { CreateUserDto } from '../../dtos/user.dto';
import { mapUserRoleToDto } from '../user-role/user-role.mapper';

export const mapCreateUserToDto = (dto: CreateUser): CreateUserDto => {
  return {
    email: dto.email,
    name: dto.name,
    role: mapUserRoleToDto(dto.role),
    password: dto.password,
  };
};
