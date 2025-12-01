import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Navigate } from '@tanstack/react-router';
import { useAuthResponseContext } from '../../contexts/auth-response/auth-response.context';

export const BlockedAuthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authResponse, isAuthLoading } = useAuthResponseContext();

  if (isAuthLoading) {
    return <>{children}</>;
  }

  if (authResponse?.accessToken) {
    return <Navigate to={PATHNAME_ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};
