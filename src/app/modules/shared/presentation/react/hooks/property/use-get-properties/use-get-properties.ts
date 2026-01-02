import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesReturn = ReturnType<typeof usePropertyRepositoryContext>['getAll'];

type GetPropertiesReturnValue = Awaited<ReturnType<GetPropertiesReturn>>;

interface UseGetPropertiesReturn {
  onGetProperties: () => void;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesReturnValue;
}

export const useGetProperties = ({
  filterByFeatured,
}: {
  filterByFeatured?: boolean;
} = {}): UseGetPropertiesReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const onGetProperties = (): void => {
    void queryClient.resetQueries({ queryKey: ['get-properties'] });
  };

  const { isPending, error, data } = useQuery<GetPropertiesReturnValue, Error>({
    queryKey: ['get-properties'],
    queryFn: () => propertyRepository.getAll(),
  });

  const filterData = filterByFeatured ? data?.filter(property => property.featured) : data;

  return {
    onGetProperties,
    isPending,
    error,
    data: filterData,
  };
};
