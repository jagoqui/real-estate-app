import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useOwnersRequestsContext } from '../../contexts/owners-requests/owners-requests.context';

type GetUpdateOwnerRequestReturn = ReturnType<typeof useOwnersRequestsContext>['updateOwnerRequest'];

type GetUpdateOwnerRequestReturnValue = Awaited<ReturnType<GetUpdateOwnerRequestReturn>>;

type OnUpdateOwnerArgs = Parameters<GetUpdateOwnerRequestReturn>[number];

interface UseGetUpdateOwnerRequestReturn {
  onUpdateOwner: (args: OnUpdateOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: GetUpdateOwnerRequestReturnValue;
}

export const useGetUpdateOwnerRequest = (args: { onSuccess?: VoidFunction }): UseGetUpdateOwnerRequestReturn => {
  const { updateOwnerRequest } = useOwnersRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['update-owner'],
    mutationFn: updateOwnerRequest,
    onSuccess: () => {
      args.onSuccess?.();
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
