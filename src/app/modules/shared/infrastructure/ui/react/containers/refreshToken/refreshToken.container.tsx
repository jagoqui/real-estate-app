import { getAuthTokenBL } from '@/modules/shared/domain/businessLogic/getAuthToken/getAuthToken.bl';
import { useRefreshTokenRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useRefreshTokenRequest/useRefreshTokenRequest';
import { useEffect, useRef } from 'react';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

export const RefreshTokenContainer = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const { onRefreshToken } = useRefreshTokenRequest();
  const { setIsAuthLoading, authResponse } = useAuthResponseContext();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const { refreshToken } = getAuthTokenBL() || {};

    console.info('[RefreshTokenContainer] Initializing...', {
      hasToken: !!refreshToken,
      hasAuthResponse: !!authResponse,
    });

    if (refreshToken) {
      console.info('[RefreshTokenContainer] Token found, starting refresh...');
      setIsAuthLoading(true);
      onRefreshToken()
        .then(() => {
          setIsAuthLoading(false);
        })
        .catch(error => {
          console.error('[RefreshTokenContainer] Refresh failed:', error);
          setIsAuthLoading(false);
        });
    } else {
      setIsAuthLoading(false);
    }
  }, [onRefreshToken, setIsAuthLoading, authResponse]);

  return <>{children}</>;
};
