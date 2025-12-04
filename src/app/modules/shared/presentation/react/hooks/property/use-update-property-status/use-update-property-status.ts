import { propertyRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/properties/property.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type UpdatePropertyStatusRequestReturn = typeof propertyRepositoryImpl.updateStatus;

type UpdatePropertyStatusRequestReturnValue = Awaited<ReturnType<UpdatePropertyStatusRequestReturn>>;

type OnUpdatePropertyStatusArgs = Parameters<UpdatePropertyStatusRequestReturn>[number];

interface UseUpdatePropertyStatusRequestReturn {
  onUpdatePropertyStatus: (arg: OnUpdatePropertyStatusArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdatePropertyStatusRequestReturnValue;
}

export const useUpdatePropertyStatusRequest = (args: {
  onSuccess?: VoidFunction;
}): UseUpdatePropertyStatusRequestReturn => {
  const { mutate, isPending, error, data } = useMutation<
    UpdatePropertyStatusRequestReturnValue,
    Error,
    OnUpdatePropertyStatusArgs
  >({
    mutationKey: ['update-property-status'],
    mutationFn: propertyRepositoryImpl.updateStatus.bind(null),
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('Property status updated successfully!');
    },
    onError: error => {
      console.error('Update property status failed:', error);
      toast.error('Failed to update property status. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onUpdatePropertyStatus: mutate,
    isPending,
    error,
    data,
  };
};
