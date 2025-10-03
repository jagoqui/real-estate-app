import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { AuthRequestsProvider } from '@/modules/shared/infrastructure/ui/react/providers/authRequest/authRequest.provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RefreshTokenContainer } from '../../containers/refreshToken/refreshToken.container';

export const MainLayout = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <AuthRequestsProvider>
    <QueryClientProvider client={queryClient}>
      <RefreshTokenContainer>{children}</RefreshTokenContainer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </AuthRequestsProvider>
);
