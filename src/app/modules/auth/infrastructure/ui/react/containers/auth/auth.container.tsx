import {AuthRequestsProvider} from '@/modules/auth/infrastructure/ui/react/providers/authRequest/authRequest.provider';
import {Outlet} from '@tanstack/react-router';

export const AuthContainer = (): React.ReactElement => (
  <AuthRequestsProvider>
    <Outlet />
  </AuthRequestsProvider>
);
