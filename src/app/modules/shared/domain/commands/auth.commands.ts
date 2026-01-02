import type { Token } from '../models/token.model';
import type { UserRole } from '../models/user-role.model';

export interface RegisterCommand {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export interface LoginWithEmailAndPasswordCommand {
  email: string;
  password: string;
}

export interface LoginWithGoogleCommand {
  code: string;
}

export interface RefreshTokenCommand {
  refreshToken: Token['refreshToken'];
}
