import type {AuthRequests} from '@/modules/auth/domain/contracts/authRequest.contract';
import {loginWithEmailAndPasswordRequest} from '@/modules/auth/infrastructure/requests/loginWithEmailAndPassword/loginWithEmailAndPassword.request';
import {loginWithGoogleRequest} from '@/modules/auth/infrastructure/requests/loginWithGoogle/loginWithGoogle.request';
import {logoutRequest} from '@/modules/auth/infrastructure/requests/logout/logout.request';
import {refreshTokenRequest} from '@/modules/auth/infrastructure/requests/refreshToken/refreshToken.request';
import {registerRequest} from '@/modules/auth/infrastructure/requests/register/register.request';
import type {AuthResponse} from '@/modules/shared/domain/schemas/authResponse.schema';
import {PATHNAME_ROUTES} from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import {useAuthResponseContext} from '@/modules/shared/infrastructure/ui/react/contexts/authResponse/authResponse.context';
import {googleLogout} from '@react-oauth/google';
import {useNavigate} from '@tanstack/react-router';
import {useEffect, useMemo, useState, type ReactNode} from 'react';
import {AuthRequestsContext} from '../../contexts/authRequests/authRequests.context';

const AUTH_REQUESTS: AuthRequests = {
  registerRequest,
  loginWithEmailAndPasswordRequest,
  loginWithGoogleRequest,
  refreshTokenRequest,
  logoutRequest,
};

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

  const wrappedRequests = useMemo<AuthRequests>(() => {
    return {
      registerRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.registerRequest(args);
        setAuthResponse(res);
        await navigate({to: PATHNAME_ROUTES.HOME});
        return res;
      },
      loginWithEmailAndPasswordRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.loginWithEmailAndPasswordRequest(args);
        setAuthResponse(res);
        await navigate({to: PATHNAME_ROUTES.HOME});
        return res;
      },
      loginWithGoogleRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.loginWithGoogleRequest(args);
        setAuthResponse(res);
        await navigate({to: PATHNAME_ROUTES.HOME});
        return res;
      },
      refreshTokenRequest: async (args): Promise<AuthResponse> => {
        const res = await AUTH_REQUESTS.refreshTokenRequest(args);
        setAuthResponse(res);
        await navigate({to: PATHNAME_ROUTES.HOME});
        return res;
      },
      logoutRequest: async (): Promise<void> => {
        const res = await AUTH_REQUESTS.logoutRequest();

        googleLogout();

        setAuthResponse(null);
        await navigate({to: PATHNAME_ROUTES.LOGIN, replace: true});

        return res;
      },
    };
  }, [setAuthResponse, navigate]);

  return (
    <AuthRequestsContext.Provider value={{...wrappedRequests}}>
      {children}
    </AuthRequestsContext.Provider>
  );
};
