import { getPropertyUseCase } from '@/modules/shared/application/use-cases/get-properties/get-properties.use-case';
import type { TanstackQueryMetaCallbacks } from '@/modules/shared/domain/models/tanstack-query-meta.model';
import { queryClient } from '@/modules/shared/infrastructure/clients/query/query.client';
import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesReturn = ReturnType<typeof usePropertyRepositoryContext>['getAll'];

type GetPropertiesReturnValue = Awaited<ReturnType<GetPropertiesReturn>>;

interface UseGetPropertiesReturn {
  onExecute: () => void;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesReturnValue;
}

export const useGetProperties = (
  options: {
    filterByFeatured?: boolean;
  } & TanstackQueryMetaCallbacks = {}
): UseGetPropertiesReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const getProperties = getPropertyUseCase(propertyRepository);

  const refetch = (): void => {
    void queryClient.resetQueries({ queryKey: ['get-properties'] });
  };

  const { isPending, error, data } = useQuery<GetPropertiesReturnValue, Error>({
    queryKey: ['get-properties'],
    queryFn: getProperties,
    meta: {
      errorMessage: 'Fetch properties failed. Please try again.',
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
  });

  const filterData = options.filterByFeatured ? data?.filter(property => property.featured) : data;

  return {
    onExecute: refetch,
    isPending,
    error,
    data: filterData,
  };
};
