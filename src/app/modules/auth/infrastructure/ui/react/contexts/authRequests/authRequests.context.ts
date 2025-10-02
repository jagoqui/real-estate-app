import type {AuthRequests} from '@/modules/shared/domain/contracts/authRequest.contract';
import {createContext, useContext} from 'react';

export const AuthRequestsContext = createContext<AuthRequests | undefined>(undefined);

export const useAuthRequestsContext = (): AuthRequests => {
  const context = useContext(AuthRequestsContext);

  if (context === undefined) {
    throw new Error('useAuthRequestsContext must be used within an AuthRequestsProvider.');
  }

  return context;
};
