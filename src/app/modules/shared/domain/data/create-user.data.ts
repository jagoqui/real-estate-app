import type { UserRole } from '../models/user-role.model';

export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
}
