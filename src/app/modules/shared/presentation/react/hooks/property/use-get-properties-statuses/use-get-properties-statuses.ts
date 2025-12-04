import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesStatusesReturn = typeof propertyRepositoryImpl.getStatuses;

type GetPropertiesStatusesReturnValue = Awaited<ReturnType<GetPropertiesStatusesReturn>>;

interface UseGetPropertiesStatusesReturn {
  onGetPropertiesStatuses: () => Promise<GetPropertiesStatusesReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesStatusesReturnValue;
}

export const useGetPropertiesStatuses = (): UseGetPropertiesStatusesReturn => {
  const onGetPropertiesStatuses = propertyRepositoryImpl.getStatuses.bind(null);

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
