import {useState} from 'react';
import {QueryClientContainer} from '../../containers/queryClient/queryClient.container';
import {RefreshTokenContainer} from '../../containers/refreshToken/refreshToken.container';

export const MainLayout = ({children}: {children: React.ReactNode}): React.ReactElement => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  if (isFirstRender) {
    setIsFirstRender(false);
    return (
      <QueryClientContainer>
        <RefreshTokenContainer>{children}</RefreshTokenContainer>
      </QueryClientContainer>
    );
  }

  return <QueryClientContainer>{children}</QueryClientContainer>;
};
