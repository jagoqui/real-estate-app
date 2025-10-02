import type {AuthRequests} from '@/modules/shared/domain/contracts/authRequest.contract';
import {AuthRequestsContext} from '@/modules/shared/infrastructure/ui/react/contexts/authRequests/authRequests.context';
import {useAuthRequests} from '@/modules/shared/infrastructure/ui/react/hooks/useAuthRequests/useAuthRequests';
import {useMemo, type ReactNode} from 'react';

export const AuthRequestsProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const authRequests = useAuthRequests();
  const authRequestsContextValue = useMemo<AuthRequests>(() => ({...authRequests}), [authRequests]);

  return (
    <AuthRequestsContext.Provider value={{...authRequestsContextValue}}>
      {children}
    </AuthRequestsContext.Provider>
  );
};
