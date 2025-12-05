import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/users/user.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetUserByIdRequestReturn = typeof userRepositoryImpl.getById;

type GetUserByIdRequestReturnValue = Awaited<ReturnType<GetUserByIdRequestReturn>>;

type OnGetUserByIdArgs = Parameters<GetUserByIdRequestReturn>[number];

interface UseGetUserByIdReturn {
  onGetUserById: (arg: OnGetUserByIdArgs) => Promise<GetUserByIdRequestReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetUserByIdRequestReturnValue;
}

export const useGetUserById = (userId: OnGetUserByIdArgs): UseGetUserByIdReturn => {
  const onGetUserById = (): Promise<GetUserByIdRequestReturnValue> => userRepositoryImpl.getById(userId);

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
