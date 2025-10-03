import { Navigate, useRouter } from '@tanstack/react-router';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

export const BlockedUnAuthorizedContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authResponse } = useAuthResponseContext();

  const router = useRouter();

  const currentLocation = router.state.location.pathname + router.state.location.search;

  if (!authResponse?.accessToken) {
    return <Navigate to={PATHNAME_ROUTES.AUTH_LOGIN} replace search={{ redirect: currentLocation }} />;
  }

  return <>{children}</>;
};
