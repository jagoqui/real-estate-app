import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type DeleteOwnerReturn = typeof ownerRepositoryImpl.delete;

type DeleteOwnerReturnValue = Awaited<ReturnType<DeleteOwnerReturn>>;

type OnDeleteOwnerArgs = Parameters<DeleteOwnerReturn>[number];

interface UseDeleteOwnerReturn {
  onDeleteOwner: (args: OnDeleteOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: DeleteOwnerReturnValue;
}

export const useDeleteOwner = (args: { onSuccess?: VoidFunction }): UseDeleteOwnerReturn => {
  const { mutate, isPending, error, data } = useMutation<DeleteOwnerReturnValue, Error, OnDeleteOwnerArgs>({
    mutationKey: ['delete-owner'],
    mutationFn: args => ownerRepositoryImpl.delete(args),
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('Owner deleted successfully.');
    },
    onError: error => {
      console.error('Delete owner failed:', error);
      toast.error('Delete owner failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onDeleteOwner: mutate,
    isPending,
    error,
    data,
  };
};
