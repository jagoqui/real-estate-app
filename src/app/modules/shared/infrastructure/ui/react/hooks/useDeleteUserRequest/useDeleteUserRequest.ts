import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUsersRequests } from '../useUsersRequests/useUsersRequests';

type DeleteUserRequestReturn = ReturnType<typeof useUsersRequests>['deleteUserRequest'];

type OnDeleteUserArgs = Parameters<DeleteUserRequestReturn>[number];

interface UseDeleteUserRequestReturn {
  onDeleteUser: (args: OnDeleteUserArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: Awaited<ReturnType<DeleteUserRequestReturn>>;
}

export const useDeleteUserRequest = (args: { onSuccess?: VoidFunction }): UseDeleteUserRequestReturn => {
  const { deleteUserRequest } = useUsersRequests();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: deleteUserRequest,
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
