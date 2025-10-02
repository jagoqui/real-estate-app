import type {AuthRequests} from '@/modules/auth/domain/contracts/authRequest.contract';
import {loginWithEmailAndPasswordRequest} from '@/modules/auth/infrastructure/requests/loginWithEmailAndPassword/loginWithEmailAndPassword.request';
import {loginWithGoogleRequest} from '@/modules/auth/infrastructure/requests/loginWithGoogle/loginWithGoogle.request';
import {logoutRequest} from '@/modules/auth/infrastructure/requests/logout/logout.request';
import {refreshTokenRequest} from '@/modules/auth/infrastructure/requests/refreshToken/refreshToken.request';
import {registerRequest} from '@/modules/auth/infrastructure/requests/register/register.request';
import {asyncFunctionValidationWrapper} from '@/modules/shared/domain/helpers/asyncFunctionValidationWrapper/asyncFunctionValidationWrapper.helper';
import type {AuthResponse} from '@/modules/shared/domain/schemas/authResponse.schema';
import {PATHNAME_ROUTES} from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import {useAuthResponseContext} from '@/modules/shared/infrastructure/ui/react/contexts/authResponse/authResponse.context';
import {googleLogout} from '@react-oauth/google';
import {useNavigate} from '@tanstack/react-router';

const AUTH_REQUESTS: AuthRequests = {
  registerRequest,
  loginWithEmailAndPasswordRequest,
  loginWithGoogleRequest,
  refreshTokenRequest,
  logoutRequest,
};

export const useAuthRequests = (): AuthRequests => {
  const {setAuthResponse} = useAuthResponseContext();
  const navigate = useNavigate();

  const onSuccessRegister = (args: Parameters<typeof setAuthResponse>[number]): void => {
    setAuthResponse(args);
    void navigate({to: PATHNAME_ROUTES.HOME, replace: true});
  };

  const onSuccessRefreshToken = (args: Parameters<typeof setAuthResponse>[number]): void => {
    setAuthResponse(args);
  };

  const onSuccessLogout = (): void => {
    googleLogout();
    setAuthResponse(null);
    void navigate({to: PATHNAME_ROUTES.LOGIN, replace: true});
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
