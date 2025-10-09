import { useQuery } from '@tanstack/react-query';
import { useUsersRequests } from '../useUsersRequests/useUsersRequests';

type GetUsersWithoutOwnerRequestReturn = ReturnType<typeof useUsersRequests>['getUsersWithoutOwnerRequest'];

type GetUsersWithoutOwnerRequestReturnValue = Awaited<ReturnType<GetUsersWithoutOwnerRequestReturn>>;

interface UseGetUsersWithoutOwnerRequestReturn {
  onRefetchGetUsersWithoutOwner: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetUsersWithoutOwnerRequestReturnValue;
}

export const useGetUsersWithoutOwnerRequest = (): UseGetUsersWithoutOwnerRequestReturn => {
  const { getUsersWithoutOwnerRequest } = useUsersRequests();

  const { isPending, error, data, refetch } = useQuery<GetUsersWithoutOwnerRequestReturnValue, Error>({
    queryKey: ['get-users-without-owner'],
    queryFn: getUsersWithoutOwnerRequest,
  });

  const onRefetchGetUsersWithoutOwner = async (): Promise<void> => {
    await refetch();
  };

  return {
    onRefetchGetUsersWithoutOwner,
    isPending,
    error,
    data,
  };
};
