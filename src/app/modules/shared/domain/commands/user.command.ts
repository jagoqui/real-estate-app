import type { UserRole } from '../models/user-role.model';

interface UserCommonProps {
  name: string;
  email: string;
  role: UserRole;
}

export interface CreateUserCommand extends UserCommonProps {
  password: string;
}

export interface UpdateUserCommand extends Partial<UserCommonProps> {
  id: string;
  phone?: string;
  bio?: string;
  photoFile?: File | null;
}

export interface ChangePasswordCommand {
  userId: string;
  newPassword: string;
}
