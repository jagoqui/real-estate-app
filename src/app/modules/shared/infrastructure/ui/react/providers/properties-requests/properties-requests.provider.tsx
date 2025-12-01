import type { PropertiesRequests } from '@/modules/shared/domain/contracts/properties-requests.contract';
import { type ReactNode, useMemo } from 'react';
import { PropertiesRequestsContext } from '../../contexts/properties-requests/properties-requests.context';
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
