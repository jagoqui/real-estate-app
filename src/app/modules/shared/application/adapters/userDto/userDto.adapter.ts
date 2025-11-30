import type { User } from '@/modules/shared/domain/models/user.model';
import type { UserDto } from '../../dtos/user.dto';
import { userRoleDtoAdapter } from '../userRoleDto/userRoleDto.adapter';

export const userDtoAdapter = (user: User): UserDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photoUrl: user.photoUrl,
  googleId: user.googleId,
  role: userRoleDtoAdapter(user.role),
  phoneNumber: user.phone,
  bio: user.bio,
});
