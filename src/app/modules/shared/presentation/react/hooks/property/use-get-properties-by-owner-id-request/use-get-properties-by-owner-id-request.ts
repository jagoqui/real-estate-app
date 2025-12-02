import { usePropertiesRequestsContext } from '@/modules/shared//presentation/react/contexts/properties-requests/properties-requests.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesByOwnerIdReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertiesByOwnerIdRequest'];

type GetPropertiesByOwnerIdReturnValue = Awaited<ReturnType<GetPropertiesByOwnerIdReturn>>;

type OnGetPropertiesByOwnerIdArgs = Parameters<GetPropertiesByOwnerIdReturn>[number];

interface UseGetPropertiesByOwnerIdReturn {
  onGetPropertiesByOwnerId: (arg: OnGetPropertiesByOwnerIdArgs) => Promise<GetPropertiesByOwnerIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesByOwnerIdReturnValue;
}

export const useGetPropertiesByOwnerIdRequest = ({
  ownerId,
}: OnGetPropertiesByOwnerIdArgs): UseGetPropertiesByOwnerIdReturn => {
  const { getPropertiesByOwnerIdRequest } = usePropertiesRequestsContext();

  const onGetPropertiesByOwnerId = getPropertiesByOwnerIdRequest.bind(null, { ownerId });

  const { isPending, error, data } = useQuery<GetPropertiesByOwnerIdReturnValue, Error>({
    queryKey: ['get-properties-by-owner-id', ownerId],
    queryFn: onGetPropertiesByOwnerId,
  });

  return {
    onGetPropertiesByOwnerId,
    isPending,
    error,
    data,
  };
};
