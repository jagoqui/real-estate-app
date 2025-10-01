import {Button} from '@/components/ui/button';
import {useAuthRequestsContext} from '@/modules/auth/infrastructure/ui/react/contexts/authRequests/authRequests.context';
import {useRefreshTokenRequest} from '@/modules/auth/infrastructure/ui/react/hooks/useRefreshTokenRequest/useRefreshTokenRequest';
import {useEffect} from 'react';
import {useAuthResponseContext} from '../../contexts/authResponse/authResponse.context';

export const HomeLayout = (): React.ReactElement => {
  const {isPending} = useRefreshToken();
  const {logoutRequest} = useAuthRequestsContext();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <Button onClick={void logoutRequest}>Sign out</Button>;
};

export const useRefreshToken = (): {
  isPending: boolean;
} => {
  const {authResponse} = useAuthResponseContext();
  const {onRefreshToken, isPending} = useRefreshTokenRequest();

  useEffect(() => {
    if (authResponse) {
      onRefreshToken({refreshToken: authResponse.refreshToken});
    }
  }, [authResponse, onRefreshToken]);

  return {isPending};
};
