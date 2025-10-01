import {PATHNAME_ROUTES} from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import {Navigate} from '@tanstack/react-router';
import {useAuthResponseContext} from '../../contexts/authResponse/authResponse.context';

export const BlockedAuthContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {authResponse} = useAuthResponseContext();

  if (authResponse?.accessToken) {
    return <Navigate to={PATHNAME_ROUTES.BASE_PATH} />;
  }

  return <>{children}</>;
};
