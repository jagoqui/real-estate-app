import type { User } from '@/modules/shared/domain/schemas/user.schema';
import { USER_ROLES } from '@/modules/shared/domain/schemas/userRole.schema';

export const USER_MOCK: User = {
  id: '64b64c8f8f8f8f8f8f8f8f8f',
  email: 'user@example.com',
  name: 'John Doe',
  photoUrl: 'https://example.com/photo.jpg',
  googleId: 'google-123456',
  role: USER_ROLES.OWNER,
  isAdmin: false,
};
