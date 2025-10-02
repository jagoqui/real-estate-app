import type {AuthRequests} from '@/modules/auth/domain/contracts/authRequest.contract';
import {useMemo, type ReactNode} from 'react';
import {AuthRequestsContext} from '../../contexts/authRequests/authRequests.context';
import {useAuthRequests} from '../../hooks/useAuthRequests/useAuthRequests';

export const AuthRequestsProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const authRequests = useAuthRequests();
  const authRequestsContextValue = useMemo<AuthRequests>(() => ({...authRequests}), [authRequests]);

  return (
    <AuthRequestsContext.Provider value={{...authRequestsContextValue}}>
      {children}
    </AuthRequestsContext.Provider>
  );
};
