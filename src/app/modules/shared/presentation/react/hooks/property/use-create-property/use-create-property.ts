import { createPropertyUseCase } from '@/modules/shared/application/use-cases/create-property/create-property.use-case';
import { usePropertyRepositoryContext } from '@/modules/shared/presentation/react/contexts/property-repository/property-repository.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type CreatePropertyReturn = ReturnType<typeof usePropertyRepositoryContext>['create'];

type CreatePropertyReturnValue = Awaited<ReturnType<CreatePropertyReturn>>;

type OnCreatePropertyArgs = Parameters<CreatePropertyReturn>[number];

interface UseCreatePropertyReturn {
  onCreateProperty: (args: OnCreatePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreatePropertyReturnValue;
}

export const useCreateProperty = (args: { onSuccess?: VoidFunction }): UseCreatePropertyReturn => {
  const propertyRepository = usePropertyRepositoryContext();

  const createProperty = createPropertyUseCase(propertyRepository);

  const { mutate, isPending, error, data } = useMutation<CreatePropertyReturnValue, Error, OnCreatePropertyArgs>({
    mutationKey: ['create-property'],
    mutationFn: args => createProperty(args),
    onSuccess: () => {
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Create property failed:', error);
      toast.error('Create property failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onCreateProperty: mutate,
    isPending,
    error,
    data,
  };
};
