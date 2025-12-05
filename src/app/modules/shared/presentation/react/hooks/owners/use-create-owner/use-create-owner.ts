import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type CreateOwnerReturn = typeof ownerRepositoryImpl.create;

type CreateOwnerReturnValue = Awaited<ReturnType<CreateOwnerReturn>>;

type OnCreateOwnerArgs = Parameters<CreateOwnerReturn>[number];

interface UseCreateOwnerReturn {
  onCreateOwner: (args: OnCreateOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreateOwnerReturnValue;
}

export const useCreateOwner = (args: { onSuccess?: VoidFunction }): UseCreateOwnerReturn => {
  const { mutate, isPending, error, data } = useMutation<CreateOwnerReturnValue, Error, OnCreateOwnerArgs>({
    mutationKey: ['create-owner'],
    mutationFn: args => ownerRepositoryImpl.create(args),
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
