import { useQuery } from '@tanstack/react-query';
import { usePropertiesRequestsContext } from '../../contexts/propertiesRequests/propertiesRequests.context';

type GetPropertiesTypesReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertiesTypesRequest'];

type GetPropertiesTypesReturnValue = Awaited<ReturnType<GetPropertiesTypesReturn>>;

type OnGetPropertiesTypesArgs = Parameters<GetPropertiesTypesReturn>[number];

interface UseGetPropertiesTypesRequestReturn {
  onGetPropertiesTypes: (arg: OnGetPropertiesTypesArgs) => Promise<GetPropertiesTypesReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesTypesReturnValue;
}

export const useGetPropertiesTypesRequest = (): UseGetPropertiesTypesRequestReturn => {
  const { getPropertiesTypesRequest } = usePropertiesRequestsContext();

  const onGetPropertiesTypes = getPropertiesTypesRequest.bind(null);

  const { isPending, error, data } = useQuery<GetPropertiesTypesReturnValue, Error>({
    queryKey: ['get-properties-types'],
    queryFn: onGetPropertiesTypes,
  });

  return {
    onGetPropertiesTypes,
    isPending,
    error,
    data,
  };
};
