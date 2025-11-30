import type { UserRoleDto } from './role.dto';

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  photoUrl?: string;
  googleId?: string;
  role: UserRoleDto;
  phoneNumber?: string;
  bio?: string;
}

export type CreateUserDto = Pick<UserDto, 'email' | 'name' | 'role'> & {
  password: string;
};
