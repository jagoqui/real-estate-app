import type { AuthResponse } from '../models/auth-response.model';
import type { Token } from '../models/token.model';
import type { CreateUser, LoginUserWithEmailAndPassword } from '../models/user.model';

export type RegisterRequest = (ars: CreateUser) => Promise<AuthResponse>;

export type LoginWithEmailAndPasswordRequest = (args: LoginUserWithEmailAndPassword) => Promise<AuthResponse>;

export type LoginWithGoogleRequest = (args: { code: string }) => Promise<AuthResponse>;

export type RefreshTokenRequest = (args: Pick<Token, 'refreshToken'>) => Promise<AuthResponse>;

export type LogoutRequest = () => Promise<void>;

export interface AuthRequests {
  registerRequest: RegisterRequest;
  loginWithEmailAndPasswordRequest: LoginWithEmailAndPasswordRequest;
  loginWithGoogleRequest: LoginWithGoogleRequest;
  refreshTokenRequest: RefreshTokenRequest;
  logoutRequest: LogoutRequest;
}
