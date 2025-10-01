import type {AuthRequests} from '@/modules/auth/domain/contracts/authRequest.contract';
import {loginWithEmailAndPasswordRequest} from '@/modules/auth/infrastructure/requests/loginWithEmailAndPassword/loginWithEmailAndPassword.request';
import {loginWithGoogleRequest} from '@/modules/auth/infrastructure/requests/loginWithGoogle/loginWithGoogle.request';
import {logoutRequest} from '@/modules/auth/infrastructure/requests/logout/logout.request';
import {refreshTokenRequest} from '@/modules/auth/infrastructure/requests/refreshToken/refreshToken.request';
import {registerRequest} from '@/modules/auth/infrastructure/requests/register/register.request';
import type {AuthResponse} from '@/modules/shared/domain/schemas/authResponse.schema';
import {useAuthResponseContext} from '@/modules/shared/infrastructure/ui/react/contexts/authResponse/authResponse.context';
import {googleLogout} from '@react-oauth/google';
import {useMemo, type ReactNode} from 'react';
import {AuthRequestsContext} from '../../contexts/authRequests/authRequests.context';

const AUTH_REQUESTS: AuthRequests = {
  registerRequest,
  loginWithEmailAndPasswordRequest,
  loginWithGoogleRequest,
  refreshTokenRequest,
  logoutRequest,
};

export const AuthRequestsProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {setAuthResponse} = useAuthResponseContext();

  const wrappedRequests = useMemo<AuthRequests>(() => {
    return {
      registerRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.registerRequest(args);
        setAuthResponse(res);
        return res;
      },
      loginWithEmailAndPasswordRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.loginWithEmailAndPasswordRequest(args);
        setAuthResponse(res);
        return res;
      },
      loginWithGoogleRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.loginWithGoogleRequest(args);
        setAuthResponse(res);
        return res;
      },
      refreshTokenRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.refreshTokenRequest(args);
        setAuthResponse(res);
        return res;
      },
      logoutRequest: async (): Promise<void> => {
        await AUTH_REQUESTS.logoutRequest();
        googleLogout();
        setAuthResponse(null);
      },
    };
  }, [setAuthResponse]);

  return (
    <AuthRequestsContext.Provider value={{...wrappedRequests}}>
      {children}
    </AuthRequestsContext.Provider>
  );
};
