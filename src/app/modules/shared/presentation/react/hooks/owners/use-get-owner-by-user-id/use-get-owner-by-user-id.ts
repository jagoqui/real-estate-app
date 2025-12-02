import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetOwnerByUserIdReturn = typeof ownerRepositoryImpl.getByUserId;

type GetOwnerByUserIdReturnValue = Awaited<ReturnType<GetOwnerByUserIdReturn>>;

type OnGetOwnerByUserIdArgs = Parameters<GetOwnerByUserIdReturn>[number];

interface UseGetOwnerByUserIdReturn {
  onRefetchGetOwnerByUserId: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnerByUserIdReturnValue;
}

export const useGetOwnerByUserId = (userId: OnGetOwnerByUserIdArgs): UseGetOwnerByUserIdReturn => {
  const { isPending, error, data, refetch } = useQuery<GetOwnerByUserIdReturnValue, Error>({
    queryKey: ['get-owner-by-user-id', userId],
    queryFn: () => ownerRepositoryImpl.getByUserId(userId),
  });

  const onRefetchGetOwnerByUserId = async (): Promise<void> => {
    await refetch();
  };

  return {
    onRefetchGetOwnerByUserId,
    isPending,
    error,
    data,
  };
};
