import { USER_ROLES_DTO } from '@/modules/shared/application/dtos/role.dto';
import type { CreateUserDto } from '@/modules/shared/application/dtos/user.dto';

export const CREATE_USER_DTO_MOCK: CreateUserDto = {
  email: 'test@example.com',
  password: 'securePassword123',
  name: 'Test User',
  role: USER_ROLES_DTO.OWNER,
};
