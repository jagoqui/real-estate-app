import type { UserRequests } from '@/modules/shared/domain/contracts/userRequests.contract';
import { createContext, useContext } from 'react';

export const UserRequestsContext = createContext<UserRequests | undefined>(undefined);

export const useUserRequestsContext = (): UserRequests => {
  const context = useContext(UserRequestsContext);
  if (!context) {
    throw new Error('useUserRequestsContext must be used within a UserRequestsProvider');
  }
  return context;
};
