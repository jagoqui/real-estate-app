import { AppLayout } from '../../layouts/app/app.layout';
import { RefreshTokenContainer } from '../refreshToken/refreshToken.container';

export const AppContainer = (): React.ReactElement => {
  return (
    <RefreshTokenContainer>
      <AppLayout />
    </RefreshTokenContainer>
  );
};
