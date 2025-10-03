import { BlockedAuthContainer } from '@/modules/shared/infrastructure/ui/react/containers/blockedAuth/blockedAuth.container';
import { Outlet } from '@tanstack/react-router';

export const AuthContainer = (): React.ReactElement => (
  <BlockedAuthContainer>
    <Outlet />
  </BlockedAuthContainer>
);
