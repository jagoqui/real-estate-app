import type { PropertiesRequests } from '@/modules/shared/domain/contracts/propertiesRequests.contract';
import { type ReactNode, useMemo } from 'react';
import { PropertiesRequestsContext } from '../../contexts/propertiesRequests/propertiesRequests.context';
import { usePropertiesRequests } from '../../hooks/usePropertiesRequests/usePropertiesRequests';

export const PropertiesRequestsProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const propertiesRequests = usePropertiesRequests();

  const propertiesRequestsContextValue = useMemo<PropertiesRequests>(
    () => ({ ...propertiesRequests }),
    [propertiesRequests]
  );

  return (
    <PropertiesRequestsContext.Provider value={propertiesRequestsContextValue}>
      {children}
    </PropertiesRequestsContext.Provider>
  );
};
