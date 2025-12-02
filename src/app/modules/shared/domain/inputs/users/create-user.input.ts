import type { UserRole } from '../../models/user-role.model';

export interface CreateUserInput {
  email: string;
  name: string;
  role: UserRole;
  password: string;
}
