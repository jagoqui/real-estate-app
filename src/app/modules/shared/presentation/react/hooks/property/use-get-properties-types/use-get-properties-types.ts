import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useQuery } from '@tanstack/react-query';

type GetPropertiesTypesReturn = typeof propertyRepositoryImpl.getTypes;

type GetPropertiesTypesReturnValue = Awaited<ReturnType<GetPropertiesTypesReturn>>;

interface UseGetPropertiesTypesReturn {
  onGetPropertiesTypes: () => Promise<GetPropertiesTypesReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertiesTypesReturnValue;
}

export const useGetPropertiesTypes = (): UseGetPropertiesTypesReturn => {
  const onGetPropertiesTypes = propertyRepositoryImpl.getTypes.bind(null);

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
