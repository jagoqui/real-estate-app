import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUsersRequests } from '../useUsersRequests/useUsersRequests';

type ChangeUserPasswordRequestReturn = ReturnType<typeof useUsersRequests>['changeUserPasswordRequest'];

type ChangeUserPasswordRequestReturnValue = Awaited<ReturnType<ChangeUserPasswordRequestReturn>>;

type OnChangeUserPasswordArgs = Parameters<ChangeUserPasswordRequestReturn>[number];

interface UseChangeUserPasswordRequestReturn {
  onChangeUserPassword: (args: OnChangeUserPasswordArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: ChangeUserPasswordRequestReturnValue;
}

export const useChangeUserPasswordRequest = (args: {
  onSuccess?: VoidFunction;
}): UseChangeUserPasswordRequestReturn => {
  const { changeUserPasswordRequest } = useUsersRequests();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: changeUserPasswordRequest,
    onSuccess: () => {
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Change user password failed:', error);
      toast.error('Change user password failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onChangeUserPassword: mutate,
    isPending,
    error,
    data,
  };
};
