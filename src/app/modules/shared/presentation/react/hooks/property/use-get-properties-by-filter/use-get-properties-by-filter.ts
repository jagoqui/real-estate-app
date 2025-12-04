import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesByFilterReturn = typeof propertyRepositoryImpl.getByFilter;

type GetPropertiesByFilterReturnValue = Awaited<ReturnType<GetPropertiesByFilterReturn>>;

type OnGetPropertiesByFilterArgs = Parameters<GetPropertiesByFilterReturn>[number];

interface UseGetPropertiesByFilterOptions {
  enabled?: boolean;
}

interface UseGetPropertiesByFilterReturn {
  onGetPropertiesByFilter: (arg: OnGetPropertiesByFilterArgs) => Promise<GetPropertiesByFilterReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesByFilterReturnValue;
}

export const useGetPropertiesByFilter = (
  filter: OnGetPropertiesByFilterArgs,
  options: UseGetPropertiesByFilterOptions = {}
): UseGetPropertiesByFilterReturn => {
  const { enabled = true } = options;
  const onGetPropertiesByFilter = propertyRepositoryImpl.getByFilter.bind(null, filter);

  const { isPending, error, data } = useQuery<GetPropertiesByFilterReturnValue, Error>({
    queryKey: ['get-properties-by-filter', filter],
    queryFn: onGetPropertiesByFilter,
    enabled,
  });

  return {
    onGetPropertiesByFilter,
    isPending,
    error,
    data,
  };
};
