import type { UserRole } from '../models/user-role.model';

interface UserCommonProps {
  name: string;
  email: string;
  role: UserRole;
}

export interface CreateUserInput extends UserCommonProps {
  password: string;
}

export interface UpdateUserInput extends Partial<UserCommonProps> {
  id: string;
  phone?: string;
  bio?: string;
  photoFile?: File | null;
}

export interface ChangePasswordInput {
  userId: string;
  newPassword: string;
}
