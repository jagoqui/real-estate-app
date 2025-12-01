import { Navigate, useRouter } from '@tanstack/react-router';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/auth-response/auth-response.context';

export const BlockedUnauthorizedAdminContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authResponse, isAuthLoading } = useAuthResponseContext();
  const router = useRouter();

  const currentPath = router.state.location.pathname;

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!authResponse?.accessToken || authResponse.user.role !== 'ADMIN') {
    return <Navigate to={PATHNAME_ROUTES.AUTH_LOGIN} replace search={{ redirectTo: currentPath }} />;
  }

  return <>{children}</>;
};
