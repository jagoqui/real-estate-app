import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { AuthRequestsProvider } from '@/modules/shared/infrastructure/ui/react/providers/authRequest/authRequest.provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from 'node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools';

export const MainLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <>
    <AuthRequestsProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthRequestsProvider>
    <TanStackRouterDevtools />
  </>
);
