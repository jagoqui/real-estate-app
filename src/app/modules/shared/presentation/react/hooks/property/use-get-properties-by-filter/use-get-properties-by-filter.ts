import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesByFilterReturn = ReturnType<typeof usePropertyRepositoryContext>['getByFilter'];

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
  const propertyRepository = usePropertyRepositoryContext();

  const { enabled = true } = options;
  const onGetPropertiesByFilter = (): Promise<GetPropertiesByFilterReturnValue> =>
    propertyRepository.getByFilter(filter);

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
