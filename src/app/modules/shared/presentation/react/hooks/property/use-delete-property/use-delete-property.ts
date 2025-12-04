import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type DeletePropertyReturn = typeof propertyRepositoryImpl.delete;

type DeletePropertyReturnValue = Awaited<ReturnType<DeletePropertyReturn>>;

type OnDeletePropertyArgs = Parameters<DeletePropertyReturn>[number];

interface UseDeletePropertyReturn {
  onDeleteProperty: (arg: OnDeletePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: DeletePropertyReturnValue;
}

export const useDeleteProperty = (args: { onSuccess?: VoidFunction }): UseDeletePropertyReturn => {
  const { mutate, isPending, error, data } = useMutation<DeletePropertyReturnValue, Error, OnDeletePropertyArgs>({
    mutationKey: ['delete-property'],
    mutationFn: propertyRepositoryImpl.delete.bind(null),
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('Property deleted successfully!');
    },
    onError: error => {
      console.error('Delete property failed:', error);
      toast.error('Failed to delete property. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onDeleteProperty: mutate,
    isPending,
    error,
    data,
  };
};
