import type {User} from '@/modules/shared/domain/schemas/user.schema';
import type {UserDto} from '../../dtos/user.dto';
import {userRoleAdapter} from '../user-role/user-role.adapter';

export const userAdapter = (user: UserDto): User => ({
  id: user.id,
  email: user.email,
  name: user.name,
  photoUrl: user.photoUrl,
  googleId: user.googleId,
  role: userRoleAdapter(user.role),
});
