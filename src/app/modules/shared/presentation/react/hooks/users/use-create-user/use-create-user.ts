import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/users/user.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type CreateUserReturn = typeof userRepositoryImpl.create;

type CreateUserReturnValue = Awaited<ReturnType<CreateUserReturn>>;

type OnCreateUserArgs = Parameters<CreateUserReturn>[number];

interface UseCreateUserReturn {
  onCreateUser: (args: OnCreateUserArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreateUserReturnValue;
}

export const useCreateUser = (args: { onSuccess?: VoidFunction }): UseCreateUserReturn => {
  const { mutate, isPending, error, data } = useMutation<CreateUserReturnValue, Error, OnCreateUserArgs>({
    mutationKey: ['create-user'],
    mutationFn: args => userRepositoryImpl.create(args),
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
