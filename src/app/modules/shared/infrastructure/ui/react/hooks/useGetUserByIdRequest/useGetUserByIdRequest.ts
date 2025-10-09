import { useQuery } from '@tanstack/react-query';
import { useUsersRequests } from '../useUsersRequests/useUsersRequests';

type GetUserByIdRequestReturn = ReturnType<typeof useUsersRequests>['getUserByIdRequest'];

type GetUserByIdRequestReturnValue = Awaited<ReturnType<GetUserByIdRequestReturn>>;

type OnGetUserByIdArgs = Parameters<GetUserByIdRequestReturn>[number];

interface UseGetUserByIdRequestReturn {
  onGetUserById: (arg: OnGetUserByIdArgs) => Promise<GetUserByIdRequestReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetUserByIdRequestReturnValue;
}

export const useGetUserByIdRequest = ({ userId }: OnGetUserByIdArgs): UseGetUserByIdRequestReturn => {
  const { getUserByIdRequest } = useUsersRequests();

  const onGetUserById = getUserByIdRequest.bind(null, { userId });

  const { isPending, error, data } = useQuery<GetUserByIdRequestReturnValue, Error>({
    queryKey: ['get-user-by-id', userId],
    queryFn: onGetUserById,
  });

  return {
    onGetUserById,
    isPending,
    error,
    data,
  };
};
