import { useOwnersRequestsContext } from '@/modules/shared//presentation/react/contexts/owners-requests/owners-requests.context';
import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { useQuery } from '@tanstack/react-query';

type GetOwnersReturn = ReturnType<typeof useOwnersRequestsContext>['getOwnersRequest'];

type GetOwnersReturnValue = Awaited<ReturnType<GetOwnersReturn>>;

interface UseGetOwnersRequestReturn {
  onGetOwners: () => void;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnersReturnValue;
}

export const useGetOwnersRequest = (): UseGetOwnersRequestReturn => {
  const { getOwnersRequest } = useOwnersRequestsContext();

  const onGetOwners = (): void => {
    void queryClient.resetQueries({ queryKey: ['get-owners'] });
  };

  const { isPending, error, data } = useQuery<GetOwnersReturnValue, Error>({
    queryKey: ['get-owners'],
    queryFn: getOwnersRequest,
  });

  return {
    onGetOwners,
    isPending,
    error,
    data,
  };
};
