import { Outlet } from '@tanstack/react-router';

import { RefreshTokenContainer } from '../refreshToken/refreshToken.container';

export const AppContainer = (): React.ReactElement => {
  return (
    <RefreshTokenContainer>
      <Outlet />
    </RefreshTokenContainer>
  );
};
