import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetOwnerByIdReturn = typeof ownerRepositoryImpl.getById;

type GetOwnerByIdReturnValue = Awaited<ReturnType<GetOwnerByIdReturn>>;

type OnGetOwnerByIdArgs = Parameters<GetOwnerByIdReturn>[number];

interface UseGetOwnerByIdReturn {
  onGetOwnerById: (arg: OnGetOwnerByIdArgs) => Promise<GetOwnerByIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetOwnerByIdReturnValue;
}

export const useGetOwnerById = (ownerId: OnGetOwnerByIdArgs): UseGetOwnerByIdReturn => {
  const onGetOwnerById = (): Promise<GetOwnerByIdReturnValue> => ownerRepositoryImpl.getById(ownerId);

  const { isPending, error, data } = useQuery<GetOwnerByIdReturnValue, Error>({
    queryKey: ['get-owner-by-id', ownerId],
    queryFn: onGetOwnerById,
  });

  return {
    onGetOwnerById,
    isPending,
    error,
    data,
  };
};
