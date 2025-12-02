import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { usePropertiesRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/properties-requests/properties-requests.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertiesRequest'];

type GetPropertiesReturnValue = Awaited<ReturnType<GetPropertiesReturn>>;

interface UseGetPropertiesReturn {
  onGetProperties: () => void;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesReturnValue;
}

export const useGetPropertiesRequest = ({
  filterByFeatured,
}: {
  filterByFeatured?: boolean;
} = {}): UseGetPropertiesReturn => {
  const { getPropertiesRequest } = usePropertiesRequestsContext();

  const onGetProperties = (): void => {
    void queryClient.resetQueries({ queryKey: ['get-properties'] });
  };

  const { isPending, error, data } = useQuery<GetPropertiesReturnValue, Error>({
    queryKey: ['get-properties'],
    queryFn: getPropertiesRequest,
  });

  const filterData = filterByFeatured ? data?.filter(property => property.featured) : data;

  return {
    onGetProperties,
    isPending,
    error,
    data: filterData,
  };
};
