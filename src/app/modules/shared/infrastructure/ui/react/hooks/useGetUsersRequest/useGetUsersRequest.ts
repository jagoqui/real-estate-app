import { useQuery } from '@tanstack/react-query';
import { useUsersRequestsContext } from '../../contexts/usersRequests/usersRequests.context';

type GetUsersReturn = ReturnType<typeof useUsersRequestsContext>['getUsersRequest'];

type GetUsersReturnValue = Awaited<ReturnType<GetUsersReturn>>;

interface UseGetUsersRequestReturn {
  onRefetchGetUsers: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetUsersReturnValue;
}

export const useGetUsersRequest = (): UseGetUsersRequestReturn => {
  const { getUsersRequest } = useUsersRequestsContext();

  const { isPending, error, data, refetch } = useQuery<GetUsersReturnValue, Error>({
    queryKey: ['get-users'],
    queryFn: getUsersRequest,
  });

  const onRefetchGetUsers = async (): Promise<void> => {
    await refetch();
  };

  return {
    onRefetchGetUsers,
    isPending,
    error,
    data,
  };
};
