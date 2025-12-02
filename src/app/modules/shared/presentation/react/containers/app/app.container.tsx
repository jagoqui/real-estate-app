import { AppLayout } from '../../layouts/app/app.layout';
import { RefreshTokenContainer } from '../refresh-token/refresh-token.container';

export const AppContainer = (): React.ReactElement => {
  return (
    <RefreshTokenContainer>
      <AppLayout />
    </RefreshTokenContainer>
  );
};
