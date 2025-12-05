import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesCountByOwnerIdReturn = typeof ownerRepositoryImpl.getPropertiesCountByOwnerId;

type GetPropertiesCountByOwnerIdReturnValue = Awaited<ReturnType<GetPropertiesCountByOwnerIdReturn>>;

type OnGetPropertiesCountByOwnerIdArgs = Parameters<GetPropertiesCountByOwnerIdReturn>[number];

interface UseGetPropertiesCountByOwnerIdReturn {
  onRefetchGetPropertiesCountByOwnerId: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesCountByOwnerIdReturnValue;
}

export const useGetPropertiesCountByOwnerId = (
  ownerId: OnGetPropertiesCountByOwnerIdArgs
): UseGetPropertiesCountByOwnerIdReturn => {
  const { isPending, error, data, refetch } = useQuery<GetPropertiesCountByOwnerIdReturnValue, Error>({
    queryKey: ['get-properties-count-by-owner-id', ownerId],
    queryFn: () => ownerRepositoryImpl.getPropertiesCountByOwnerId(ownerId),
  });

  const onRefetchGetPropertiesCountByOwnerId = async (): Promise<void> => {
    await refetch();
  };

  return {
    onRefetchGetPropertiesCountByOwnerId,
    isPending,
    error,
    data,
  };
};
