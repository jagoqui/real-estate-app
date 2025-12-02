import { usePropertiesRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/properties-requests/properties-requests.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type DeletePropertyRequestReturn = ReturnType<typeof usePropertiesRequestsContext>['deletePropertyRequest'];

type DeletePropertyRequestReturnValue = Awaited<ReturnType<DeletePropertyRequestReturn>>;

type OnDeletePropertyArgs = Parameters<DeletePropertyRequestReturn>[number];

interface UseDeletePropertyRequestReturn {
  onDeleteProperty: (arg: OnDeletePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: DeletePropertyRequestReturnValue;
}

export const useDeletePropertyRequest = (args: { onSuccess?: VoidFunction }): UseDeletePropertyRequestReturn => {
  const { deletePropertyRequest } = usePropertiesRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['delete-property'],
    mutationFn: deletePropertyRequest,
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('Property deleted successfully!');
    },
    onError: error => {
      console.error('Delete property failed:', error);
      toast.error('Failed to delete property. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onDeleteProperty: mutate,
    isPending,
    error,
    data,
  };
};
