import {USER_ROLES_DTO} from '@/modules/auth/application/dtos/role.dto';
import type {UserDto} from '@/modules/auth/application/dtos/user.dto';

export const USER_DTO_MOCK: UserDto = {
  id: '64b64c8f8f8f8f8f8f8f8f8f',
  email: 'user@example.com',
  name: 'John Doe',
  photoUrl: 'https://example.com/photo.jpg',
  googleId: 'google-123456',
  role: USER_ROLES_DTO.OWNER,
};
