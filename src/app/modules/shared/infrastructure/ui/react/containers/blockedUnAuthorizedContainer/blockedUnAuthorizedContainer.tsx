import { Navigate, useRouter } from '@tanstack/react-router';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

export const BlockedUnAuthorizedContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authResponse, isAuthLoading } = useAuthResponseContext();
  const router = useRouter();

  const currentPath = router.state.location.pathname;

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!authResponse?.accessToken) {
    return <Navigate to={PATHNAME_ROUTES.AUTH_LOGIN} replace search={{ redirectTo: currentPath }} />;
  }

  return <>{children}</>;
};
