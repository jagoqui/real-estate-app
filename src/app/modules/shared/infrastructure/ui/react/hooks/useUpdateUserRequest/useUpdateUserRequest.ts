import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUsersRequestsContext } from '../../contexts/usersRequests/usersRequests.context';

type UpdateUserRequestReturn = ReturnType<typeof useUsersRequestsContext>['updateUserRequest'];

type UpdateUserRequestReturnValue = Awaited<ReturnType<UpdateUserRequestReturn>>;

type OnUpdateUserArgs = Parameters<UpdateUserRequestReturn>[number];

interface UseUpdateUserRequestReturn {
  onUpdateUser: (args: OnUpdateUserArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdateUserRequestReturnValue;
}

export const useUpdateUserRequest = (args: { onSuccess?: VoidFunction }): UseUpdateUserRequestReturn => {
  const { updateUserRequest } = useUsersRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUserRequest,
    onSuccess: () => {
      toast.success('User updated successfully!');
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Update user failed:', error);
      toast.error('Update user failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return { onUpdateUser: mutate, isPending, error, data };
};
