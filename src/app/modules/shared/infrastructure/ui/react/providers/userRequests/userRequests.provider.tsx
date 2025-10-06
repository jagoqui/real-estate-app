import type { UserRequests } from '@/modules/shared/domain/contracts/userRequests.contract';
import { useMemo } from 'react';
import { UserRequestsContext } from '../../contexts/userRequests/userRequests.context';
import { useUserRequests } from '../../hooks/useUserRequests/useUserRequests';

export const UserRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userRequests = useUserRequests();
  const userRequestsContextValue = useMemo<UserRequests>(() => ({ ...userRequests }), [userRequests]);

  return <UserRequestsContext.Provider value={userRequestsContextValue}>{children}</UserRequestsContext.Provider>;
};
