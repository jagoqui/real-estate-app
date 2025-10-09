import type { CreateUser } from '@/modules/shared/domain/schemas/user.schema';
import { USER_ROLES } from './../../../src/app/modules/shared/domain/schemas/userRole.schema';

export const CREATE_USER_MOCK: CreateUser = {
  email: 'test@example.com',
  password: 'securePassword123',
  name: 'Test User',
  role: USER_ROLES.OWNER,
};
