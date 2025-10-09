import type { UsersRequests } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { createContext, useContext } from 'react';

export const UsersRequestsContext = createContext<UsersRequests | undefined>(undefined);

export const useUsersRequestsContext = (): UsersRequests => {
  const context = useContext(UsersRequestsContext);
  if (!context) {
    throw new Error('useUsersRequestsContext must be used within a UsersRequestsProvider');
  }
  return context;
};
