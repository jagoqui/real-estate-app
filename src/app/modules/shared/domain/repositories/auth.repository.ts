import type {
  LoginWithEmailAndPasswordCommand,
  LoginWithGoogleCommand,
  RefreshTokenCommand,
  RegisterCommand,
} from '@/modules/shared/domain/commands/auth.commands';
import type { Auth } from '../models/auth.model';

export interface AuthRepository {
  register(args: RegisterCommand): Promise<Auth>;
  loginWithEmailAndPassword(args: LoginWithEmailAndPasswordCommand): Promise<Auth>;
  loginWithGoogle(args: LoginWithGoogleCommand): Promise<Auth>;
  refreshToken(args: RefreshTokenCommand): Promise<Auth>;
  logout(): Promise<void>;
}
