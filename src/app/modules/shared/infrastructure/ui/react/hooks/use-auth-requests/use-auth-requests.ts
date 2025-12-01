import type { AuthRequests } from '@/modules/shared/domain/contracts/auth-requests.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/async-function-validation-wrapper/async-function-validation-wrapper.helper';
import type { AuthResponse } from '@/modules/shared/domain/models/auth-response.model';
import { loginWithEmailAndPasswordRequest } from '@/modules/shared/infrastructure/requests/loginWithEmailAndPassword/loginWithEmailAndPassword.request';
import { loginWithGoogleRequest } from '@/modules/shared/infrastructure/requests/loginWithGoogle/loginWithGoogle.request';
import { logoutRequest } from '@/modules/shared/infrastructure/requests/logout/logout.request';
import { refreshTokenRequest } from '@/modules/shared/infrastructure/requests/refreshToken/refreshToken.request';
import { registerRequest } from '@/modules/shared/infrastructure/requests/register/register.request';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { useAuthResponseContext } from '@/modules/shared/infrastructure/ui/react/contexts/auth-response/auth-response.context';
import { googleLogout } from '@react-oauth/google';
import { useNavigate, useRouter } from '@tanstack/react-router';

const AUTH_REQUESTS: AuthRequests = {
  registerRequest,
  loginWithEmailAndPasswordRequest,
  loginWithGoogleRequest,
  refreshTokenRequest,
  logoutRequest,
};

export const useAuthRequests = (): AuthRequests => {
  const { setAuthResponse } = useAuthResponseContext();
  const navigate = useNavigate();
  const router = useRouter();

  //FIXME: El rederict to llega bien pero no esta navegando correctamente
  const onSuccessRegister = (args: Parameters<typeof setAuthResponse>[number]): void => {
    setAuthResponse(args);

    const searchParams = router.state.location.search as { redirectTo?: string };
    const redirectTo = searchParams?.redirectTo || PATHNAME_ROUTES.HOME;

    void navigate({ to: redirectTo, from: '' });
  };

  const onSuccessRefreshToken = (args: Parameters<typeof setAuthResponse>[number]): void => {
    setAuthResponse(args);
  };

  const onSuccessLogout = (): void => {
    googleLogout();
    setAuthResponse(null);
    void navigate({ to: PATHNAME_ROUTES.HOME, replace: true });
  };

  const onError = (): void => {
    console.error('[useAuthRequests] onError called');
    setAuthResponse(null);
  };

  const wrappedRequests: AuthRequests = {
    registerRequest: async (args): Promise<AuthResponse> =>
      asyncFunctionValidationWrapper({
        fn: AUTH_REQUESTS.registerRequest,
        args,
        onSuccess: onSuccessRegister,
        onError,
      }),
    loginWithEmailAndPasswordRequest: async (args): Promise<AuthResponse> =>
      asyncFunctionValidationWrapper({
        fn: AUTH_REQUESTS.loginWithEmailAndPasswordRequest,
        args,
        onSuccess: onSuccessRegister,
        onError,
      }),
    loginWithGoogleRequest: async (args): Promise<AuthResponse> =>
      asyncFunctionValidationWrapper({
        fn: AUTH_REQUESTS.loginWithGoogleRequest,
        args,
        onSuccess: onSuccessRegister,
        onError,
      }),
    refreshTokenRequest: async (args): Promise<AuthResponse> =>
      asyncFunctionValidationWrapper({
        fn: AUTH_REQUESTS.refreshTokenRequest,
        args,
        onSuccess: onSuccessRefreshToken,
        onError,
      }),
    logoutRequest: async (): Promise<void> =>
      asyncFunctionValidationWrapper({
        fn: AUTH_REQUESTS.logoutRequest,
        onSuccess: onSuccessLogout,
        onError,
      }),
  };

  return wrappedRequests;
};
