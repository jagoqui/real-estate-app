import type { AuthRepository } from '@/modules/shared/domain/ports/repositories/auth.repository';
import { loginWithEmailAndPasswordAdapter } from './login-with-email-and-password/login-with-email-and-password.adapter';
import { loginWithGoogleAdapter } from './login-with-google/login-with-google.adapter';
import { logoutAdapter } from './logout/logout.adapter';
import { refreshTokenAdapter } from './refresh-token/refresh-token.adapter';
import { registerAdapter } from './register/register.adapter';

export const authRepositoryImpl: AuthRepository = {
  register: registerAdapter,
  loginWithEmailAndPassword: loginWithEmailAndPasswordAdapter,
  loginWithGoogle: loginWithGoogleAdapter,
  refreshToken: refreshTokenAdapter,
  logout: logoutAdapter,
};
