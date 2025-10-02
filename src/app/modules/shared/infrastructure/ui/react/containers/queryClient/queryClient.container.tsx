import {AuthRequestsProvider} from '@/modules/auth/infrastructure/ui/react/providers/authRequest/authRequest.provider';
import {queryClient} from '@/modules/shared/infrastructure/clients/query/query.client';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

export const QueryClientContainer = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <QueryClientProvider client={queryClient}>
    <AuthRequestsProvider>{children}</AuthRequestsProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
