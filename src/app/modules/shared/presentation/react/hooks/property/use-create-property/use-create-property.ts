import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type CreatePropertyReturn = typeof propertyRepositoryImpl.create;

type CreatePropertyReturnValue = Awaited<ReturnType<CreatePropertyReturn>>;

type OnCreatePropertyArgs = Parameters<CreatePropertyReturn>[number];

interface UseCreatePropertyReturn {
  onCreateProperty: (args: OnCreatePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreatePropertyReturnValue;
}

export const useCreateProperty = (args: { onSuccess?: VoidFunction }): UseCreatePropertyReturn => {
  const { mutate, isPending, error, data } = useMutation<CreatePropertyReturnValue, Error, OnCreatePropertyArgs>({
    mutationKey: ['create-property'],
    mutationFn: args => propertyRepositoryImpl.create(args),
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
