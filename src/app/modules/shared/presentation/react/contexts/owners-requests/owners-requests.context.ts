import type { OwnersRequests } from '@/modules/shared/domain/contracts/owners-request.contract';
import { createContext, useContext } from 'react';

export const OwnersRequestsContext = createContext<OwnersRequests | undefined>(undefined);

export const useOwnersRequestsContext = (): OwnersRequests => {
  const context = useContext(OwnersRequestsContext);
  if (!context) {
    throw new Error('useOwnersRequestsContext must be used within a OwnersRequestsProvider');
  }
  return context;
};
