import type { AuthRequests } from '@/modules/shared/domain/contracts/authRequest.contract';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/asyncFunctionValidationWrapper/asyncFunctionValidationWrapper.helper';
import type { AuthResponse } from '@/modules/shared/domain/schemas/authResponse.schema';
import { loginWithEmailAndPasswordRequest } from '@/modules/shared/infrastructure/requests/loginWithEmailAndPassword/loginWithEmailAndPassword.request';
import { loginWithGoogleRequest } from '@/modules/shared/infrastructure/requests/loginWithGoogle/loginWithGoogle.request';
import { logoutRequest } from '@/modules/shared/infrastructure/requests/logout/logout.request';
import { refreshTokenRequest } from '@/modules/shared/infrastructure/requests/refreshToken/refreshToken.request';
import { registerRequest } from '@/modules/shared/infrastructure/requests/register/register.request';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { useAuthResponseContext } from '@/modules/shared/infrastructure/ui/react/contexts/authResponse/authResponse.context';
import { googleLogout } from '@react-oauth/google';
import { useNavigate, useRouter } from '@tanstack/react-router';

const AUTH_REQUESTS: AuthRequests = {
  registerRequest,
  loginWithEmailAndPasswordRequest,
  loginWithGoogleRequest,
  refreshTokenRequest,
  logoutRequest,
};

//FIXME: No esta funcionando el redirect
export const useAuthRequests = (): AuthRequests => {
  const { setAuthResponse } = useAuthResponseContext();
  const navigate = useNavigate();
  const router = useRouter();

  const onSuccessRegister = (args: Parameters<typeof setAuthResponse>[number]): void => {
    setAuthResponse(args);
    const redirectTo = (router.state.location.search as Record<string, string>)?.redirect || PATHNAME_ROUTES.HOME;

    void navigate({ to: redirectTo, replace: true });
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
