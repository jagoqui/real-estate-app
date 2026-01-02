import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesTypesReturn = ReturnType<typeof usePropertyRepositoryContext>['getTypes'];

type GetPropertiesTypesReturnValue = Awaited<ReturnType<GetPropertiesTypesReturn>>;

interface UseGetPropertiesTypesReturn {
  onGetPropertiesTypes: () => Promise<GetPropertiesTypesReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesTypesReturnValue;
}

export const useGetPropertiesTypes = (): UseGetPropertiesTypesReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const onGetPropertiesTypes = (): Promise<GetPropertiesTypesReturnValue> => propertyRepository.getTypes();

  const { isPending, error, data } = useQuery<GetPropertiesTypesReturnValue, Error>({
    queryKey: ['get-properties-types'],
    queryFn: onGetPropertiesTypes,
  });

  return {
    onGetPropertiesTypes,
    isPending,
    error,
    data,
  };
};
