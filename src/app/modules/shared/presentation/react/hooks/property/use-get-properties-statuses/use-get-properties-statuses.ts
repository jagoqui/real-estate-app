import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesStatusesReturn = ReturnType<typeof usePropertyRepositoryContext>['getStatuses'];

type GetPropertiesStatusesReturnValue = Awaited<ReturnType<GetPropertiesStatusesReturn>>;

interface UseGetPropertiesStatusesReturn {
  onGetPropertiesStatuses: () => Promise<GetPropertiesStatusesReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesStatusesReturnValue;
}

export const useGetPropertiesStatuses = (): UseGetPropertiesStatusesReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const onGetPropertiesStatuses = (): Promise<GetPropertiesStatusesReturnValue> => propertyRepository.getStatuses();

  const { isPending, error, data } = useQuery<GetPropertiesStatusesReturnValue, Error>({
    queryKey: ['get-properties-statuses'],
    queryFn: onGetPropertiesStatuses,
  });

  return {
    onGetPropertiesStatuses,
    isPending,
    error,
    data,
  };
};
