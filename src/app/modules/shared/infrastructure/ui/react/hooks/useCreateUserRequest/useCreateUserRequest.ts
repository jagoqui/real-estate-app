import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUsersRequestsContext } from '../../contexts/usersRequests/usersRequests.context';

type CreateUserReturn = ReturnType<typeof useUsersRequestsContext>['createUserRequest'];

type CreateUserReturnValue = Awaited<ReturnType<CreateUserReturn>>;

type OnCreateUserArgs = Parameters<CreateUserReturn>[number];

interface UseCreateUserRequestReturn {
  onCreateUser: (args: OnCreateUserArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreateUserReturnValue;
}

export const useCreateUserRequest = (args: { onSuccess?: VoidFunction }): UseCreateUserRequestReturn => {
  const { createUserRequest } = useUsersRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUserRequest,
    onSuccess: () => {
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Create user failed:', error);
      toast.error('Create user failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onCreateUser: mutate,
    isPending,
    error,
    data,
  };
};
