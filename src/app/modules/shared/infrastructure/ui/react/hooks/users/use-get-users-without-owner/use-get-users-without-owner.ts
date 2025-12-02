import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/user.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetUsersWithoutOwnerRequestReturn = typeof userRepositoryImpl.getUsersWithoutOwner;

type GetUsersWithoutOwnerRequestReturnValue = Awaited<ReturnType<GetUsersWithoutOwnerRequestReturn>>;

interface UseGetUsersWithoutOwnerReturn {
  onRefetchGetUsersWithoutOwner: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetUsersWithoutOwnerRequestReturnValue;
}

export const useGetUsersWithoutOwner = (): UseGetUsersWithoutOwnerReturn => {
  const { isPending, error, data, refetch } = useQuery<GetUsersWithoutOwnerRequestReturnValue, Error>({
    queryKey: ['get-users-without-owner'],
    queryFn: () => userRepositoryImpl.getUsersWithoutOwner(),
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
