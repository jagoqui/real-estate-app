import type { UsersRequests } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { createContext, useContext } from 'react';

export const UserRequestsContext = createContext<UsersRequests | undefined>(undefined);

export const useUserRequestsContext = (): UsersRequests => {
  const context = useContext(UserRequestsContext);
  if (!context) {
    throw new Error('useUserRequestsContext must be used within a UserRequestsProvider');
  }
  return context;
};
