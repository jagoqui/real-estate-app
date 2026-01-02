import type { UpdateUserCommand } from '@/modules/shared/domain/commands/user.command';
import { USER_ROLES } from '@/modules/shared/domain/models/user-role.model';

export const USER_COMMAND_MOCK: UpdateUserCommand = {
  id: '64b64c8f8f8f8f8f8f8f8f8f',
  email: 'user@example.com',
  name: 'John Doe',
  photoFile: undefined,
  role: USER_ROLES.OWNER,
  phone: '123-456-7890',
  bio: 'This is a sample bio',
};
