import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useOwnersRequestsContext } from '../../contexts/ownersRequests/ownersRequests.context';

type UpdateOwnerRequestReturn = ReturnType<typeof useOwnersRequestsContext>['updateOwnerRequest'];

type UpdateOwnerRequestReturnValue = Awaited<ReturnType<UpdateOwnerRequestReturn>>;

type OnUpdateOwnerArgs = Parameters<UpdateOwnerRequestReturn>[number];

interface UseUpdateOwnerRequestReturn {
  onUpdateOwner: (args: OnUpdateOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdateOwnerRequestReturnValue;
}

export const useUpdateOwnerRequest = (args: { onSuccess?: VoidFunction }): UseUpdateOwnerRequestReturn => {
  const { updateOwnerRequest } = useOwnersRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['update-owner'],
    mutationFn: updateOwnerRequest,
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('Owner updated successfully!');
    },
    onError: error => {
      console.error('Update owner failed:', error);
      toast.error('Update owner failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onUpdateOwner: mutate,
    isPending,
    error,
    data,
  };
};
