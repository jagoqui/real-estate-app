import type { UserRole } from '../models/user-role.model';

export interface UpdateUserInput {
  id: string;
  email?: string;
  name?: string;
  role?: UserRole;
  phone?: string;
  bio?: string;
  photoFile?: File;
}
