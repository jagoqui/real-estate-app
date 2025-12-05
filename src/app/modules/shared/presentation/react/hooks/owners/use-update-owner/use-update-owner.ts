import { ownerRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/owners/owner.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdateOwnerReturn = typeof ownerRepositoryImpl.update;

type UpdateOwnerReturnValue = Awaited<ReturnType<UpdateOwnerReturn>>;

type OnUpdateOwnerArgs = Parameters<UpdateOwnerReturn>[number];

interface UseUpdateOwnerReturn {
  onUpdateOwner: (args: OnUpdateOwnerArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdateOwnerReturnValue;
}

export const useUpdateOwner = (args: { onSuccess?: VoidFunction }): UseUpdateOwnerReturn => {
  const { mutate, isPending, error, data } = useMutation<UpdateOwnerReturnValue, Error, OnUpdateOwnerArgs>({
    mutationKey: ['update-owner'],
    mutationFn: args => ownerRepositoryImpl.update(args),
    onSuccess: () => {
      toast.success('Owner updated successfully!');
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Update owner failed:', error);
      toast.error('Update owner failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return { onUpdateOwner: mutate, isPending, error, data };
};
