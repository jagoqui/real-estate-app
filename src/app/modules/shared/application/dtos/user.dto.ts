import type {UserRoleDto} from './role.dto';

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  photoUrl?: string;
  googleId?: string;
  role: UserRoleDto;
}
