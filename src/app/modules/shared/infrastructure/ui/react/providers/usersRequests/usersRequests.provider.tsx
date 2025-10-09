import type { UsersRequests } from '@/modules/shared/domain/contracts/usersRequests.contract';
import { useMemo } from 'react';
import { UsersRequestsContext } from '../../contexts/usersRequests/usersRequests.context';
import { useUsersRequests } from '../../hooks/useUsersRequests/useUsersRequests';

export const UsersRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const usersRequests = useUsersRequests();
  const usersRequestsContextValue = useMemo<UsersRequests>(() => ({ ...usersRequests }), [usersRequests]);

  return <UsersRequestsContext.Provider value={usersRequestsContextValue}>{children}</UsersRequestsContext.Provider>;
};
