import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useOwnersRequestsContext } from '../../contexts/ownersRequests/ownersRequests.context';

type DeleteOwnerReturn = ReturnType<typeof useOwnersRequestsContext>['deleteOwnerRequest'];

type DeleteOwnerReturnValue = Awaited<ReturnType<DeleteOwnerReturn>>;

type OnDeleteOwnerArgs = Parameters<DeleteOwnerReturn>[number];

interface UseDeleteOwnerRequestReturn {
  onDeleteOwner: (args: OnDeleteOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: DeleteOwnerReturnValue;
}

export const useDeleteOwnerRequest = ({ onSuccess }: { onSuccess: VoidFunction }): UseDeleteOwnerRequestReturn => {
  const { deleteOwnerRequest } = useOwnersRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['delete-owner'],
    mutationFn: deleteOwnerRequest,
    onSuccess: () => {
      onSuccess();
      toast.success('Owner deleted successfully!');
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
