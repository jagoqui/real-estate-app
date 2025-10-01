import type {CreateUser} from '@/modules/shared/domain/schemas/user.schema';

export const CREATE_USER_MOCK: CreateUser = {
  email: 'test@example.com',
  password: 'securePassword123',
  name: 'Test User',
};
