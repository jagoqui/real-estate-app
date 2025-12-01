import type { OwnersRequests } from '@/modules/shared/domain/contracts/owners-request.contract';
import { type ReactNode, useMemo } from 'react';
import { OwnersRequestsContext } from '../../contexts/owners-requests/owners-requests.context';
import { useOwnersRequests } from '../../hooks/use-owners-requests/use-owners-requests';

export const OwnersRequestsProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const ownersRequests = useOwnersRequests();

  const ownersRequestsContextValue = useMemo<OwnersRequests>(() => ({ ...ownersRequests }), [ownersRequests]);

  return (
    <OwnersRequestsContext.Provider value={{ ...ownersRequestsContextValue }}>
      {children}
    </OwnersRequestsContext.Provider>
  );
};
