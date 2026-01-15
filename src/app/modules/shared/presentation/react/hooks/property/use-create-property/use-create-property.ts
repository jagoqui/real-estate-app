import { createPropertyUseCase } from '@/modules/shared/application/use-cases/create-property/create-property.use-case';
import type { TanstackQueryMetaCallbacks } from '@/modules/shared/domain/models/tanstack-query-meta.model';
import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useMutation } from '@tanstack/react-query';

type CreatePropertyReturn = ReturnType<typeof usePropertyRepositoryContext>['create'];

type CreatePropertyReturnValue = Awaited<ReturnType<CreatePropertyReturn>>;

type OnCreatePropertyArgs = Parameters<CreatePropertyReturn>[number];

interface UseCreatePropertyReturn {
  onExecute: (args: OnCreatePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreatePropertyReturnValue;
}

export const useCreateProperty = (options: TanstackQueryMetaCallbacks): UseCreatePropertyReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const createProperty = createPropertyUseCase(propertyRepository);

  const { mutate, isPending, error, data } = useMutation<CreatePropertyReturnValue, Error, OnCreatePropertyArgs>({
    mutationKey: ['create-property'],
    mutationFn: args => createProperty(args),
    meta: {
      successMessage: 'Property created successfully.',
      errorMessage: 'Create property failed. Please try again.',
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    },
  });

  return {
    onExecute: mutate,
    isPending,
    error,
    data,
  };
};
