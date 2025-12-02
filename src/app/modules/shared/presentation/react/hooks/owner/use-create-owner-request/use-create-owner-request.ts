import { useOwnersRequestsContext } from '@/modules/shared//presentation/react/contexts/owners-requests/owners-requests.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type CreateOwnerReturn = ReturnType<typeof useOwnersRequestsContext>['createOwnerRequest'];

type CreateOwnerReturnValue = Awaited<ReturnType<CreateOwnerReturn>>;

type OnCreateOwnerArgs = Parameters<CreateOwnerReturn>[number];

interface UseCreateOwnerRequestReturn {
  onCreateOwner: (args: OnCreateOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreateOwnerReturnValue;
}

export const useCreateOwnerRequest = (args: { onSuccess?: VoidFunction }): UseCreateOwnerRequestReturn => {
  const { createOwnerRequest } = useOwnersRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['create-owner'],
    mutationFn: createOwnerRequest,
    onSuccess: () => {
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Create owner failed:', error);
      toast.error('Create owner failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onCreateOwner: mutate,
    isPending,
    error,
    data,
  };
};
