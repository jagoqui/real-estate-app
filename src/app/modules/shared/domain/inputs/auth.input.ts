import type { Token } from '../models/token.model';
import type { UserRole } from '../models/user-role.model';

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export interface LoginWithEmailAndPasswordInput {
  email: string;
  password: string;
}

export interface LoginWithGoogleInput {
  code: string;
}

export interface RefreshTokenInput {
  refreshToken: Token['refreshToken'];
}
