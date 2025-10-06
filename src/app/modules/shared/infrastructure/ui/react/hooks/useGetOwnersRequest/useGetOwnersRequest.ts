import { useQuery } from '@tanstack/react-query';
import { useOwnersRequestsContext } from '../../contexts/ownersRequests/ownersRequests.context';

type GetOwnersReturn = ReturnType<typeof useOwnersRequestsContext>['getOwnersRequest'];

type GetOwnersReturnValue = Awaited<ReturnType<GetOwnersReturn>>;

interface UseGetOwnersRequestReturn {
  onGetOwners: () => Promise<GetOwnersReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnersReturnValue;
}

export const useGetOwnersRequest = (): UseGetOwnersRequestReturn => {
  const { getOwnersRequest } = useOwnersRequestsContext();

  const onGetOwners = getOwnersRequest.bind(null);

  const { isPending, error, data } = useQuery<GetOwnersReturnValue, Error>({
    queryKey: ['get-owners'],
    queryFn: onGetOwners,
  });

  return {
    onGetOwners,
    isPending,
    error,
    data,
  };
};
