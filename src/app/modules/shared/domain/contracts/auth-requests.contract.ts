import type { Auth } from '../models/auth.model';
import type { Token } from '../models/token.model';
import type { CreateUser, LoginUserWithEmailAndPassword } from '../models/user.model';

export type RegisterRequest = (ars: CreateUser) => Promise<Auth>;

export type LoginWithEmailAndPasswordRequest = (args: LoginUserWithEmailAndPassword) => Promise<Auth>;

export type LoginWithGoogleRequest = (args: { code: string }) => Promise<Auth>;

export type RefreshTokenRequest = (args: Pick<Token, 'refreshToken'>) => Promise<Auth>;

export type LogoutRequest = () => Promise<void>;

export interface AuthRequests {
  registerRequest: RegisterRequest;
  loginWithEmailAndPasswordRequest: LoginWithEmailAndPasswordRequest;
  loginWithGoogleRequest: LoginWithGoogleRequest;
  refreshTokenRequest: RefreshTokenRequest;
  logoutRequest: LogoutRequest;
}
