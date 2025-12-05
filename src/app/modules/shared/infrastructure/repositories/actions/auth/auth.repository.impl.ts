import type { AuthRepository } from '@/modules/shared/domain/repositories/auth.repository';
import { loginWithEmailAndPasswordAction } from './login-with-email-and-password/login-with-email-and-password.action';
import { loginWithGoogleAction } from './login-with-google/login-with-google.action';
import { logoutAction } from './logout/logout.action';
import { refreshTokenAction } from './refresh-token/refresh-token.action';
import { registerAction } from './register/register.action';

export const authRepositoryImpl: AuthRepository = {
  register: registerAction,
  loginWithEmailAndPassword: loginWithEmailAndPasswordAction,
  loginWithGoogle: loginWithGoogleAction,
  refreshToken: refreshTokenAction,
  logout: logoutAction,
};
