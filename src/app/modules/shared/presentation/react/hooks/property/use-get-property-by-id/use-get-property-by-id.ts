import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertyByIdReturn = typeof propertyRepositoryImpl.getById;

type GetPropertyByIdReturnValue = Awaited<ReturnType<GetPropertyByIdReturn>>;

type OnGetPropertyByIdArgs = Parameters<GetPropertyByIdReturn>[number];

interface UseGetPropertyByIdReturn {
  onGetPropertyById: (arg: OnGetPropertyByIdArgs) => Promise<GetPropertyByIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertyByIdReturnValue;
}

export const useGetPropertyById = ({ propertyId }: OnGetPropertyByIdArgs): UseGetPropertyByIdReturn => {
  const onGetPropertyById = (): Promise<GetPropertyByIdReturnValue> => propertyRepositoryImpl.getById({ propertyId });

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
