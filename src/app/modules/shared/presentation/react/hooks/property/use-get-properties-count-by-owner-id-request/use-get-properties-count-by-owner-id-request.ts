import { useOwnersRequestsContext } from '@/modules/shared//presentation/react/contexts/owners-requests/owners-requests.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesCountByOwnerIdReturn = ReturnType<
  typeof useOwnersRequestsContext
>['getPropertiesCountByOwnerIdRequest'];

type GetPropertiesCountByOwnerIdReturnValue = Awaited<ReturnType<GetPropertiesCountByOwnerIdReturn>>;

type OnGetPropertiesCountByOwnerIdArgs = Parameters<GetPropertiesCountByOwnerIdReturn>[number];

interface UseGetPropertiesCountByOwnerIdRequestReturn {
  onGetPropertiesCountByOwnerId: (
    arg: OnGetPropertiesCountByOwnerIdArgs
  ) => Promise<GetPropertiesCountByOwnerIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesCountByOwnerIdReturnValue;
}

export const useGetPropertiesCountByOwnerIdRequest = (
  ownerId: OnGetPropertiesCountByOwnerIdArgs['ownerId']
): UseGetPropertiesCountByOwnerIdRequestReturn => {
  const { getPropertiesCountByOwnerIdRequest } = useOwnersRequestsContext();

  const onGetPropertiesCountByOwnerId = getPropertiesCountByOwnerIdRequest.bind(null, { ownerId });

  const { isPending, error, data } = useQuery<GetPropertiesCountByOwnerIdReturnValue, Error>({
    queryKey: ['get-properties-count-by-owner-id', ownerId],
    queryFn: onGetPropertiesCountByOwnerId,
  });

  return {
    onGetPropertiesCountByOwnerId,
    isPending,
    error,
    data,
  };
};
