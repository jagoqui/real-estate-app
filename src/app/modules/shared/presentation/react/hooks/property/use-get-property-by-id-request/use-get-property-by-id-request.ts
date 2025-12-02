import { usePropertiesRequestsContext } from '@/modules/shared//presentation/react/contexts/properties-requests/properties-requests.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertyByIdReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertyByIdRequest'];

type GetPropertyByIdReturnValue = Awaited<ReturnType<GetPropertyByIdReturn>>;

type OnGetPropertyByIdArgs = Parameters<GetPropertyByIdReturn>[number];

interface UseGetPropertyByIdRequestReturn {
  onGetPropertyById: (arg: OnGetPropertyByIdArgs) => Promise<GetPropertyByIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertyByIdReturnValue;
}

export const useGetPropertyByIdRequest = ({ propertyId }: OnGetPropertyByIdArgs): UseGetPropertyByIdRequestReturn => {
  const { getPropertyByIdRequest } = usePropertiesRequestsContext();

  const onGetPropertyById = getPropertyByIdRequest.bind(null, { propertyId });

  const { isLoading, error, data } = useQuery<GetPropertyByIdReturnValue, Error>({
    queryKey: ['get-property-by-id', propertyId],
    queryFn: onGetPropertyById,
  });

  return {
    onGetPropertyById,
    isPending: isLoading,
    error,
    data,
  };
};
