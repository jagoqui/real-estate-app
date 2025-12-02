import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetOwnersReturn = typeof ownerRepositoryImpl.getAll;

type GetOwnersReturnValue = Awaited<ReturnType<GetOwnersReturn>>;

interface UseGetOwnersReturn {
  onRefetchGetOwners: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnersReturnValue;
}

export const useGetOwners = (): UseGetOwnersReturn => {
  const { isPending, error, data, refetch } = useQuery<GetOwnersReturnValue, Error>({
    queryKey: ['get-owners'],
    queryFn: () => ownerRepositoryImpl.getAll(),
  });

  const onRefetchGetOwners = async (): Promise<void> => {
    await refetch();
  };

  return {
    onRefetchGetOwners,
    isPending,
    error,
    data,
  };
};
