import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesByOwnerIdReturn = ReturnType<typeof usePropertyRepositoryContext>['getByOwnerId'];

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
  const propertyRepository = usePropertyRepositoryContext();

  const onGetPropertiesByOwnerId = (): Promise<GetPropertiesByOwnerIdReturnValue> =>
    propertyRepository.getByOwnerId({ ownerId });

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
