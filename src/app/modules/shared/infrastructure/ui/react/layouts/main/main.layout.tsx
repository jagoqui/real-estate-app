import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClickToComponent } from 'click-to-react-component';
import { TanStackRouterDevtools } from 'node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools';
import { AuthRequestsProvider } from '../../providers/authRequests/authRequests.provider';
import { OwnersRequestsProvider } from '../../providers/ownersRequests/ownersRequests.provider';
import { UsersRequestsProvider } from '../../providers/usersRequests/usersRequests.provider';

export const MainLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <>
    <AuthRequestsProvider>
      <UsersRequestsProvider>
        <OwnersRequestsProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </OwnersRequestsProvider>
      </UsersRequestsProvider>
    </AuthRequestsProvider>
    <TanStackRouterDevtools />
    <ClickToComponent />
  </>
);
