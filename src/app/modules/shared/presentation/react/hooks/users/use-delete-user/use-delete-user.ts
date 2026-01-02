import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/users/user.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type DeleteUserRequestReturn = typeof userRepositoryImpl.delete;

type DeleteUserRequestReturnValue = Awaited<ReturnType<DeleteUserRequestReturn>>;

type OnDeleteUserArgs = Parameters<DeleteUserRequestReturn>[number];

interface UseDeleteUserReturn {
  onDeleteUser: (args: OnDeleteUserArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: DeleteUserRequestReturnValue;
}

export const useDeleteUser = (args: { onSuccess?: VoidFunction }): UseDeleteUserReturn => {
  const { mutate, isPending, error, data } = useMutation<DeleteUserRequestReturnValue, Error, OnDeleteUserArgs>({
    mutationFn: args => userRepositoryImpl.delete(args),
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('User deleted successfully.');
    },
    onError: error => {
      console.error('Delete user failed:', error);
      toast.error('Delete user failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onDeleteUser: mutate,
    isPending,
    error,
    data,
  };
};
