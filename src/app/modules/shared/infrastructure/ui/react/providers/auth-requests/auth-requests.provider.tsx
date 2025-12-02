import type { AuthRequests } from '@/modules/shared/domain/contracts/auth-requests.contract';
import { AuthRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/auth-requests/auth-requests.context';
import { useAuthRequests } from '@/modules/shared/infrastructure/ui/react/hooks/auth/use-auth-requests/use-auth-requests';
import { useMemo, type ReactNode } from 'react';

export const AuthRequestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authRequests = useAuthRequests();
  const authRequestsContextValue = useMemo<AuthRequests>(() => ({ ...authRequests }), [authRequests]);

  return (
    <AuthRequestsContext.Provider value={{ ...authRequestsContextValue }}>{children}</AuthRequestsContext.Provider>
  );
};
