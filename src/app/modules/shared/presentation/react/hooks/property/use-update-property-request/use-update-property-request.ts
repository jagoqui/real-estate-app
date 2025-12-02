import { usePropertiesRequestsContext } from '@/modules/shared//presentation/react/contexts/properties-requests/properties-requests.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { property } from 'zod';

type UpdatePropertyRequestReturn = ReturnType<typeof usePropertiesRequestsContext>['updatePropertyRequest'];

type UpdatePropertyRequestReturnValue = Awaited<ReturnType<UpdatePropertyRequestReturn>>;

type OnUpdatePropertyArgs = Parameters<UpdatePropertyRequestReturn>[number];

interface UseUpdatePropertyRequestReturn {
  onUpdateProperty: (arg: OnUpdatePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: UpdatePropertyRequestReturnValue;
}

export const useUpdatePropertyRequest = (args: { onSuccess?: VoidFunction }): UseUpdatePropertyRequestReturn => {
  const { updatePropertyRequest } = usePropertiesRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['update-property', property],
    mutationFn: updatePropertyRequest,
    onSuccess: () => {
      args.onSuccess?.();
      toast.success('Property updated successfully!');
    },
    onError: error => {
      console.error('Update property failed:', error);
      toast.error('Failed to update property . Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onUpdateProperty: mutate,
    isPending,
    error,
    data,
  };
};
