import {useRefreshTokenRequest} from '@/modules/auth/infrastructure/ui/react/hooks/useRefreshTokenRequest/useRefreshTokenRequest';
import {useState} from 'react';

export const RefreshTokenContainer = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const {onRefreshToken, isPending, error} = useRefreshTokenRequest();

  if (isFirstRender) {
    onRefreshToken();
    setIsFirstRender(false);
  }

  if (isPending) {
    return <div>Loading session...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <>{children}</>;
};
