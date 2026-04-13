import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertyByIdReturn = ReturnType<typeof usePropertyRepositoryContext>['getById'];

type GetPropertyByIdReturnValue = Awaited<ReturnType<GetPropertyByIdReturn>>;

type OnGetPropertyByIdArgs = Parameters<GetPropertyByIdReturn>[number];

interface UseGetPropertyByIdReturn {
  onGetPropertyById: (arg: OnGetPropertyByIdArgs) => Promise<GetPropertyByIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertyByIdReturnValue;
}

export const useGetPropertyById = ({ propertyId }: OnGetPropertyByIdArgs): UseGetPropertyByIdReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const onGetPropertyById = (): Promise<GetPropertyByIdReturnValue> => propertyRepository.getById({ propertyId });

  const { isLoading, error, data } = useQuery<GetPropertyByIdReturnValue, Error>({
    queryKey: ['get-property-by-id', propertyId],
    queryFn: onGetPropertyById,
  });

  return {
    onGetPropertyById,
    isPending: isLoading,
    error,
    data,
  };
};
