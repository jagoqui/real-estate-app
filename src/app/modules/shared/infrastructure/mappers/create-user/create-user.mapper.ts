import type { CreateUser } from '@/modules/shared/domain/models/user.model';
import type { CreateUserDto } from '../../dtos/user.dto';
import { mapUserRoleToDto } from '../user-role/user-role.mapper';

export const mapCreateUserToPayloadDto = (user: CreateUser): CreateUserDto => {
  return {
    email: user.email,
    name: user.name,
    role: mapUserRoleToDto(user.role),
    password: user.password,
  };
};
