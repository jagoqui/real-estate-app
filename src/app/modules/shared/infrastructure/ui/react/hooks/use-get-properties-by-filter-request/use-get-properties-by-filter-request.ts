import { useQuery } from '@tanstack/react-query';
import { usePropertiesRequestsContext } from '../../contexts/properties-requests/properties-requests.context';

type GetPropertiesByFilterReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertiesByFilterRequest'];

type GetPropertiesByFilterReturnValue = Awaited<ReturnType<GetPropertiesByFilterReturn>>;

type OnGetPropertiesByFilterArgs = Parameters<GetPropertiesByFilterReturn>[number];

interface UseGetPropertiesByFilterReturn {
  onGetPropertiesByFilter: (arg: OnGetPropertiesByFilterArgs) => Promise<GetPropertiesByFilterReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesByFilterReturnValue;
}

export const useGetPropertiesByFilterRequest = (
  filter: OnGetPropertiesByFilterArgs
): UseGetPropertiesByFilterReturn => {
  const { getPropertiesByFilterRequest } = usePropertiesRequestsContext();

  const onGetPropertiesByFilter = getPropertiesByFilterRequest.bind(null, filter);

  const { isPending, error, data } = useQuery<GetPropertiesByFilterReturnValue, Error>({
    queryKey: ['get-properties-by-filter', filter],
    queryFn: onGetPropertiesByFilter,
  });

  return {
    onGetPropertiesByFilter,
    isPending,
    error,
    data,
  };
};
