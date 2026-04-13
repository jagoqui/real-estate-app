import type { UserRole } from '../models/user-role.model';

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  confirmPassword: string;
}
