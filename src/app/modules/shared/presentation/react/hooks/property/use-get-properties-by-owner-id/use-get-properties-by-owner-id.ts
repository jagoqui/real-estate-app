import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesByOwnerIdReturn = typeof propertyRepositoryImpl.getByOwnerId;

type GetPropertiesByOwnerIdReturnValue = Awaited<ReturnType<GetPropertiesByOwnerIdReturn>>;

type OnGetPropertiesByOwnerIdArgs = Parameters<GetPropertiesByOwnerIdReturn>[number];

interface UseGetPropertiesByOwnerIdReturn {
  onGetPropertiesByOwnerId: (arg: OnGetPropertiesByOwnerIdArgs) => Promise<GetPropertiesByOwnerIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesByOwnerIdReturnValue;
}

export const useGetPropertiesByOwnerId = ({
  ownerId,
}: OnGetPropertiesByOwnerIdArgs): UseGetPropertiesByOwnerIdReturn => {
  const onGetPropertiesByOwnerId = propertyRepositoryImpl.getByOwnerId.bind(null, { ownerId });

  const { isPending, error, data } = useQuery<GetPropertiesByOwnerIdReturnValue, Error>({
    queryKey: ['get-properties-by-owner-id', ownerId],
    queryFn: onGetPropertiesByOwnerId,
  });

  return {
    onGetPropertiesByOwnerId,
    isPending,
    error,
    data,
  };
};
