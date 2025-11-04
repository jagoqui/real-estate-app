import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { useQuery } from '@tanstack/react-query';
import { usePropertiesRequestsContext } from '../../contexts/propertiesRequests/propertiesRequests.context';

type GetPropertiesReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertiesRequest'];

type GetPropertiesReturnValue = Awaited<ReturnType<GetPropertiesReturn>>;

interface UseGetPropertiesReturn {
  onGetProperties: () => void;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesReturnValue;
}

export const useGetPropertiesRequest = (): UseGetPropertiesReturn => {
  const { getPropertiesRequest } = usePropertiesRequestsContext();

  const onGetProperties = (): void => {
    void queryClient.resetQueries({ queryKey: ['get-properties'] });
  };

  const { isPending, error, data } = useQuery<GetPropertiesReturnValue, Error>({
    queryKey: ['get-properties'],
    queryFn: getPropertiesRequest,
  });

  return {
    onGetProperties,
    isPending,
    error,
    data,
  };
};
