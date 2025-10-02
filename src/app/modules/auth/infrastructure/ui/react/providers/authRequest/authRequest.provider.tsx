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
import {useCallback, useEffect, useMemo, useState, type ReactNode} from 'react';
import {AuthRequestsContext} from '../../contexts/authRequests/authRequests.context';

const AUTH_REQUESTS: AuthRequests = {
  registerRequest,
  loginWithEmailAndPasswordRequest,
  loginWithGoogleRequest,
  refreshTokenRequest,
  logoutRequest,
};

// eslint-disable-next-line max-lines-per-function
export const AuthRequestsProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {authResponse, setAuthResponse} = useAuthResponseContext();
  const navigate = useNavigate();

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!isFirstRender) return;

    if (authResponse?.refreshToken) {
      const refresh = async (): Promise<void> => {
        try {
          const res = await refreshTokenRequest({refreshToken: authResponse.refreshToken});
          setAuthResponse(res);
        } catch (error) {
          console.error('Error during token refresh on logout:', error);
          setAuthResponse(null);
        }
      };
      void refresh();
      setIsFirstRender(false);
    }
  }, [authResponse, isFirstRender, setAuthResponse]);

  const onSuccessRegister = useCallback(
    (args: Parameters<typeof setAuthResponse>[number]): void => {
      setAuthResponse(args);
      void navigate({to: PATHNAME_ROUTES.HOME, replace: true});
    },
    [setAuthResponse, navigate]
  );

  const onSuccessRefreshToken = useCallback(
    (args: Parameters<typeof setAuthResponse>[number]): void => {
      setAuthResponse(args);
    },
    [setAuthResponse]
  );

  const onSuccessLogout = useCallback((): void => {
    googleLogout();
    setAuthResponse(null);
    void navigate({to: PATHNAME_ROUTES.LOGIN, replace: true});
  }, [setAuthResponse, navigate]);

  const wrappedRequests = useMemo<AuthRequests>(() => {
    return {
      registerRequest: async (args): Promise<AuthResponse> =>
        asyncFunctionValidationWrapper({
          fn: AUTH_REQUESTS.registerRequest,
          args,
          onSuccess: onSuccessRegister,
          onError: () => setAuthResponse(null),
        }),
      loginWithEmailAndPasswordRequest: async (args): Promise<AuthResponse> =>
        asyncFunctionValidationWrapper({
          fn: AUTH_REQUESTS.loginWithEmailAndPasswordRequest,
          args,
          onSuccess: onSuccessRegister,
          onError: () => setAuthResponse(null),
        }),
      loginWithGoogleRequest: async (args): Promise<AuthResponse> =>
        asyncFunctionValidationWrapper({
          fn: AUTH_REQUESTS.loginWithGoogleRequest,
          args,
          onSuccess: onSuccessRegister,
          onError: () => setAuthResponse(null),
        }),
      refreshTokenRequest: async (args): Promise<AuthResponse> =>
        asyncFunctionValidationWrapper({
          fn: AUTH_REQUESTS.refreshTokenRequest,
          args,
          onSuccess: onSuccessRefreshToken,
          onError: () => setAuthResponse(null),
        }),
      logoutRequest: async (): Promise<void> =>
        asyncFunctionValidationWrapper({
          fn: AUTH_REQUESTS.logoutRequest,
          onSuccess: onSuccessLogout,
          onError: () => setAuthResponse(null),
        }),
    };
  }, [setAuthResponse, onSuccessRegister, onSuccessLogout, onSuccessRefreshToken]);

  return (
    <AuthRequestsContext.Provider value={{...wrappedRequests}}>
      {children}
    </AuthRequestsContext.Provider>
  );
};
