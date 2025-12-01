import type { UsersRequests } from '@/modules/shared/domain/contracts/users-requests.contract';
import { useMemo } from 'react';
import { UsersRequestsContext } from '../../contexts/users-requests/users-requests.context';
import { useUsersRequests } from '../../hooks/use-users-requests/use-users-requests';

export const UsersRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const usersRequests = useUsersRequests();
  const usersRequestsContextValue = useMemo<UsersRequests>(() => ({ ...usersRequests }), [usersRequests]);

  return <UsersRequestsContext.Provider value={usersRequestsContextValue}>{children}</UsersRequestsContext.Provider>;
};
