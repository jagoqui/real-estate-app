import { tokenStorageRepositoryImpl } from '@/modules/shared/infrastructure/storage/token/token-storage.repository.impl';
import { useRefreshToken } from '@/modules/shared/presentation/react/hooks/auth/use-refresh-token/use-refresh-token';
import { useEffect, useRef } from 'react';
import { useAuthResponseContext } from '../../contexts/auth-response/auth-response.context';

export const RefreshTokenContainer = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const { onRefreshToken } = useRefreshToken();
  const { setIsAuthLoading, authResponse } = useAuthResponseContext();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const { refreshToken } = tokenStorageRepositoryImpl.get() || {};

    if (refreshToken) {
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
