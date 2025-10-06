import type { OwnersRequests } from '@/modules/shared/domain/contracts/ownersRequest.contract';
import { type ReactNode, useMemo } from 'react';
import { OwnersRequestsContext } from '../../contexts/ownersRequests/ownersRequests.context';
import { useOwnersRequests } from '../../hooks/useOwnersRequests/useOwnersRequests';

export const OwnersRequestsProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const ownersRequests = useOwnersRequests();

  const ownersRequestsContextValue = useMemo<OwnersRequests>(() => ({ ...ownersRequests }), [ownersRequests]);

  return (
    <OwnersRequestsContext.Provider value={{ ...ownersRequestsContextValue }}>
      {children}
    </OwnersRequestsContext.Provider>
  );
};
