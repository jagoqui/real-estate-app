import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdatePropertyRequestReturn = typeof propertyRepositoryImpl.update;

type UpdatePropertyRequestReturnValue = Awaited<ReturnType<UpdatePropertyRequestReturn>>;

type OnUpdatePropertyArgs = Parameters<UpdatePropertyRequestReturn>[number];

interface UseUpdatePropertyReturn {
  onUpdateProperty: (arg: OnUpdatePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdatePropertyRequestReturnValue;
}

export const useUpdateProperty = (args: { onSuccess?: VoidFunction }): UseUpdatePropertyReturn => {
  const { mutate, isPending, error, data } = useMutation<UpdatePropertyRequestReturnValue, Error, OnUpdatePropertyArgs>(
    {
      mutationKey: ['update-property'],
      mutationFn: args => propertyRepositoryImpl.update(args),
      onSuccess: () => {
        args.onSuccess?.();
        toast.success('Property updated successfully!');
      },
      onError: error => {
        console.error('Update property failed:', error);
        toast.error('Failed to update property . Please try again.', {
          duration: Infinity,
          description: error.message || 'An unexpected error occurred.',
          closeButton: true,
        });
      },
    }
  );

  return {
    onUpdateProperty: mutate,
    isPending,
    error,
    data,
  };
};
