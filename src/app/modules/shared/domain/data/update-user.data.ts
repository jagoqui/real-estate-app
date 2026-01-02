import type { UserRole } from '../models/user-role.model';

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  id: string;
  phone?: string;
  bio?: string;
  photoFile?: File | null;
}
