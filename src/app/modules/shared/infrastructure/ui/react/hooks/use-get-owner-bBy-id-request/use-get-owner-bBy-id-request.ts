import { useQuery } from '@tanstack/react-query';
import { useOwnersRequestsContext } from '../../contexts/owners-requests/owners-requests.context';

type GetOwnerByIdReturn = ReturnType<typeof useOwnersRequestsContext>['getOwnerByIdRequest'];

type GetOwnerByIdReturnValue = Awaited<ReturnType<GetOwnerByIdReturn>>;

type OnGetOwnerByIdArgs = Parameters<GetOwnerByIdReturn>[number];

interface UseGetOwnerByIdRequestReturn {
  onGetOwnerById: (arg: OnGetOwnerByIdArgs) => Promise<GetOwnerByIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnerByIdReturnValue;
}

export const useGetOwnerByIdRequest = ({ id }: OnGetOwnerByIdArgs): UseGetOwnerByIdRequestReturn => {
  const { getOwnerByIdRequest } = useOwnersRequestsContext();

  const onGetOwnerById = getOwnerByIdRequest.bind(null, { id });

  const { isPending, error, data } = useQuery<GetOwnerByIdReturnValue, Error>({
    queryKey: ['get-owner-by-id', id],
    queryFn: onGetOwnerById,
  });

  return {
    onGetOwnerById,
    isPending,
    error,
    data,
  };
};
