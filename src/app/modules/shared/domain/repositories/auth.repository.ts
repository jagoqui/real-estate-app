import type {
  LoginWithEmailAndPasswordInput,
  LoginWithGoogleInput,
  RefreshTokenInput,
  RegisterInput,
} from '../inputs/auth.input';
import type { Auth } from '../models/auth.model';

export interface AuthRepository {
  register(input: RegisterInput): Promise<Auth>;
  loginWithEmailAndPassword(input: LoginWithEmailAndPasswordInput): Promise<Auth>;
  loginWithGoogle(input: LoginWithGoogleInput): Promise<Auth>;
  refreshToken(input: RefreshTokenInput): Promise<Auth>;
  logout(): Promise<void>;
}
