import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesReturn = typeof propertyRepositoryImpl.getAll;

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
  const onGetProperties = (): void => {
    void queryClient.resetQueries({ queryKey: ['get-properties'] });
  };

  const { isPending, error, data } = useQuery<GetPropertiesReturnValue, Error>({
    queryKey: ['get-properties'],
    queryFn: () => propertyRepositoryImpl.getAll(),
  });

  const filterData = filterByFeatured ? data?.filter(property => property.featured) : data;

  return {
    onGetProperties,
    isPending,
    error,
    data: filterData,
  };
};
