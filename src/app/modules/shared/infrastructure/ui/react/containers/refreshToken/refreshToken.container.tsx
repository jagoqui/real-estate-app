import {useRefreshTokenRequest} from '@/modules/shared/infrastructure/ui/react/hooks/useRefreshTokenRequest/useRefreshTokenRequest';
import {useState} from 'react';

export const RefreshTokenContainer = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const {onRefreshToken, isPending, error} = useRefreshTokenRequest();

  if (isFirstRender) {
    void onRefreshToken();
    setIsFirstRender(false);
  }

  if (isPending) {
    <div>Signing in...</div>;
  }

  if (error) {
    <div>Error Signing in</div>;
  }

  return <>{children}</>;
};
