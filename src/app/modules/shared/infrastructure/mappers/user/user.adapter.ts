import type { User } from '@/modules/shared/domain/models/user.model';
import { USER_ROLES_DTO } from '../../dtos/role.dto';
import type { UserDto } from '../../dtos/user.dto';
import { userRoleAdapter } from '../userRole/userRole.adapter';

export const userAdapter = (user: UserDto): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photoUrl: user.photoUrl,
  googleId: user.googleId,
  role: userRoleAdapter(user.role),
  isAdmin: user.role === USER_ROLES_DTO.ADMIN,
  phone: user.phoneNumber,
  bio: user.bio,
});
