import type {AuthResponse} from '@/modules/shared/domain/schemas/authResponse.schema';
import type {Token} from '@/modules/shared/domain/schemas/token.schema';
import type {
  CreateUser,
  LoginUserWithEmailAndPassword,
} from '@/modules/shared/domain/schemas/user.schema';

export type RegisterRequest = (ars: CreateUser) => Promise<AuthResponse>;

export type LoginWithEmailAndPasswordRequest = (
  args: LoginUserWithEmailAndPassword
) => Promise<AuthResponse>;

export type LoginWithGoogleRequest = (args: {code: string}) => Promise<AuthResponse>;

export type RefreshTokenRequest = (args: Pick<Token, 'refreshToken'>) => Promise<AuthResponse>;

export type LogoutRequest = () => Promise<void>;

export interface AuthRequests {
  registerRequest: RegisterRequest;
  loginWithEmailAndPasswordRequest: LoginWithEmailAndPasswordRequest;
  loginWithGoogleRequest: LoginWithGoogleRequest;
  refreshTokenRequest: RefreshTokenRequest;
  logoutRequest: LogoutRequest;
}
