import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/user.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type ChangeUserPasswordRequestReturn = typeof userRepositoryImpl.changePassword;

type ChangeUserPasswordRequestReturnValue = Awaited<ReturnType<ChangeUserPasswordRequestReturn>>;

type OnChangeUserPasswordArgs = Parameters<ChangeUserPasswordRequestReturn>[number];

interface UseChangeUserPasswordReturn {
  onChangeUserPassword: (args: OnChangeUserPasswordArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: ChangeUserPasswordRequestReturnValue;
}

export const useChangeUserPassword = (args: { onSuccess?: VoidFunction }): UseChangeUserPasswordReturn => {
  const { mutate, isPending, error, data } = useMutation<
    ChangeUserPasswordRequestReturnValue,
    Error,
    OnChangeUserPasswordArgs
  >({
    mutationFn: args => userRepositoryImpl.changePassword(args),
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
