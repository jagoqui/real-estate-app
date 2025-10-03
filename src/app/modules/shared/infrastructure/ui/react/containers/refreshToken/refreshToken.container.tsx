import { useRefreshTokenRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useRefreshTokenRequest/useRefreshTokenRequest';
import { Navigate } from '@tanstack/react-router';
import { useState } from 'react';
import { PATHNAME_ROUTES } from '../../constants/main.constants';

//TODO: Refactor to use a more elegant solution (maybe with react-router loaders)
export const RefreshTokenContainer = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { onRefreshToken, isPending, error } = useRefreshTokenRequest();

  if (isFirstRender) {
    void onRefreshToken();
    setIsFirstRender(false);
  }

  if (isPending) {
    <div>Signing in...</div>;
  }

  if (error) {
    return <Navigate to={PATHNAME_ROUTES.HOME} />;
  }

  return <>{children}</>;
};
