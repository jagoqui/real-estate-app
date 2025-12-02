import { useAuthResponseContext } from '@/modules/shared//presentation/react/contexts/auth-response/auth-response.context';
import { userRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/users/user.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdateUserRequestReturn = typeof userRepositoryImpl.update;

type UpdateUserRequestReturnValue = Awaited<ReturnType<UpdateUserRequestReturn>>;

type OnUpdateUserArgs = Parameters<UpdateUserRequestReturn>[number];

interface UseUpdateUserReturn {
  onUpdateUser: (args: OnUpdateUserArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdateUserRequestReturnValue;
}

export const useUpdateUser = (args: { onSuccess?: VoidFunction }): UseUpdateUserReturn => {
  const { updateUser } = useAuthResponseContext();

  const { mutate, isPending, error, data } = useMutation<UpdateUserRequestReturnValue, Error, OnUpdateUserArgs>({
    mutationKey: ['update-user'],
    mutationFn: args => userRepositoryImpl.update(args),
    onSuccess: () => {
      toast.success('User updated successfully!');
      args.onSuccess?.();
      if (data) {
        updateUser(data);
      }
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
