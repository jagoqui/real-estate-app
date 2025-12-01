import { USER_ROLES } from '@/modules/shared/domain/models/user-role.model';
import type { CreateUser } from '@/modules/shared/domain/models/user.model';

export const CREATE_USER_MOCK: CreateUser = {
  email: 'test@example.com',
  password: 'securePassword123',
  name: 'Test User',
  role: USER_ROLES.OWNER,
};
