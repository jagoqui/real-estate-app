import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/users/user.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetUsersReturn = typeof userRepositoryImpl.getAll;

type GetUsersReturnValue = Awaited<ReturnType<GetUsersReturn>>;

interface UseGetUsersReturn {
  onRefetchGetUsers: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetUsersReturnValue;
}

export const useGetUsers = (): UseGetUsersReturn => {
  const { isPending, error, data, refetch } = useQuery<GetUsersReturnValue, Error>({
    queryKey: ['get-users'],
    queryFn: () => userRepositoryImpl.getAll(),
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
