import { Navigate, useRouter } from '@tanstack/react-router';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

//FIXME: No esta funcionando el redirect
export const BlockedUnAuthorizedAdminContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authResponse } = useAuthResponseContext();

  const router = useRouter();

  const currentLocation: string = typeof router.state.location.search === 'string' ? router.state.location.search : '';

  if (!authResponse?.accessToken || authResponse.user.role !== 'ADMIN') {
    return <Navigate to={PATHNAME_ROUTES.AUTH_LOGIN} replace search={{ redirect: currentLocation }} />;
  }

  return <>{children}</>;
};
