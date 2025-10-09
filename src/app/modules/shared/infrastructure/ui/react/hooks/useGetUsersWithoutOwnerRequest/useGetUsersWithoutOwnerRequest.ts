import { useQuery } from '@tanstack/react-query';
import { useUserRequests } from '../useUserRequests/useUserRequests';

type GetUsersWithoutOwnerRequestReturn = ReturnType<typeof useUserRequests>['getUsersWithoutOwnerRequest'];

type GetUsersWithoutOwnerRequestReturnValue = Awaited<ReturnType<GetUsersWithoutOwnerRequestReturn>>;

interface UseGetUsersWithoutOwnerRequestReturn {
  onGetUsersWithoutOwner: () => Promise<GetUsersWithoutOwnerRequestReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetUsersWithoutOwnerRequestReturnValue;
}

export const useGetUsersWithoutOwnerRequest = (): UseGetUsersWithoutOwnerRequestReturn => {
  const { getUsersWithoutOwnerRequest } = useUserRequests();

  const onGetUsersWithoutOwner = getUsersWithoutOwnerRequest;

  const { isPending, error, data } = useQuery<GetUsersWithoutOwnerRequestReturnValue, Error>({
    queryKey: ['get-users-without-owner'],
    queryFn: onGetUsersWithoutOwner,
  });

  return {
    onGetUsersWithoutOwner,
    isPending,
    error,
    data,
  };
};
