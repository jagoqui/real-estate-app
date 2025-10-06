import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from 'node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools';
import { AuthRequestsProvider } from '../../providers/authRequests/authRequests.provider';
import { UserRequestsProvider } from '../../providers/userRequests/userRequests.provider';

export const MainLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <>
    <AuthRequestsProvider>
      <UserRequestsProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserRequestsProvider>
    </AuthRequestsProvider>
    <TanStackRouterDevtools />
  </>
);
