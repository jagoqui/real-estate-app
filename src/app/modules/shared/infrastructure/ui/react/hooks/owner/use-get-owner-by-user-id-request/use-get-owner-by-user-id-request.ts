import { useOwnersRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/owners-requests/owners-requests.context';
import { useQuery } from '@tanstack/react-query';

type GetOwnerByUserIdReturn = ReturnType<typeof useOwnersRequestsContext>['getOwnerByUserIdRequest'];

type GetOwnerByUserIdReturnValue = Awaited<ReturnType<GetOwnerByUserIdReturn>>;

type OnGetOwnerByUserIdArgs = Parameters<GetOwnerByUserIdReturn>[number];

interface UseGetOwnerByUserIdRequestReturn {
  onGetOwnerByUserId: (arg: OnGetOwnerByUserIdArgs) => Promise<GetOwnerByUserIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnerByUserIdReturnValue;
}

export const useGetOwnerByUserIdRequest = (
  userId: OnGetOwnerByUserIdArgs['userId']
): UseGetOwnerByUserIdRequestReturn => {
  const { getOwnerByUserIdRequest } = useOwnersRequestsContext();

  const onGetOwnerByUserId = getOwnerByUserIdRequest.bind(null, { userId });

  const { isPending, error, data } = useQuery<GetOwnerByUserIdReturnValue, Error>({
    queryKey: ['get-owner-by-user-id', userId],
    queryFn: onGetOwnerByUserId,
  });

  return {
    onGetOwnerByUserId,
    isPending,
    error,
    data,
  };
};
