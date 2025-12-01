import { useQuery } from '@tanstack/react-query';
import { usePropertiesRequestsContext } from '../../contexts/properties-requests/properties-requests.context';

type GetPropertiesStatusesReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertiesStatusesRequest'];

type GetPropertiesStatusesReturnValue = Awaited<ReturnType<GetPropertiesStatusesReturn>>;

type OnGetPropertiesStatusesArgs = Parameters<GetPropertiesStatusesReturn>[number];

interface UseGetPropertiesStatusesRequestReturn {
  onGetPropertiesStatuses: (arg: OnGetPropertiesStatusesArgs) => Promise<GetPropertiesStatusesReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesStatusesReturnValue;
}

export const useGetPropertiesStatusesRequest = (): UseGetPropertiesStatusesRequestReturn => {
  const { getPropertiesStatusesRequest } = usePropertiesRequestsContext();

  const onGetPropertiesStatuses = getPropertiesStatusesRequest.bind(null);

  const { isPending, error, data } = useQuery<GetPropertiesStatusesReturnValue, Error>({
    queryKey: ['get-properties-statuses'],
    queryFn: onGetPropertiesStatuses,
  });

  return {
    onGetPropertiesStatuses,
    isPending,
    error,
    data,
  };
};
