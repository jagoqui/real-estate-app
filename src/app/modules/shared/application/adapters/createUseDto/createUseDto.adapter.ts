import type { CreateUser } from '@/modules/shared/domain/schemas/user.schema';
import type { CreateUserDto } from '../../dtos/user.dto';
import { userRoleDtoAdapter } from '../userRoleDto/userRoleDto.adapter';

export const createUserAdapter = (data: CreateUser): CreateUserDto => {
  return {
    email: data.email,
    name: data.name,
    role: userRoleDtoAdapter(data.role),
    password: data.password,
  };
};
