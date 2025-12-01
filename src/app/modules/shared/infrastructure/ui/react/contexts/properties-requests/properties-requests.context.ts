import type { PropertiesRequests } from '@/modules/shared/domain/contracts/properties-requests.contract';
import { createContext, useContext } from 'react';

export const PropertiesRequestsContext = createContext<PropertiesRequests | undefined>(undefined);

export const usePropertiesRequestsContext = (): PropertiesRequests => {
  const context = useContext(PropertiesRequestsContext);
  if (!context) {
    throw new Error('usePropertiesRequestsContext must be used within a PropertiesRequestsProvider');
  }
  return context;
};
