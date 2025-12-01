import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { usePropertiesRequestsContext } from '../../contexts/properties-requests/properties-requests.context';

type UpdatePropertyStatusRequestReturn = ReturnType<typeof usePropertiesRequestsContext>['updatePropertyStatusRequest'];

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
  const { updatePropertyStatusRequest } = usePropertiesRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['update-property-status'],
    mutationFn: updatePropertyStatusRequest,
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
