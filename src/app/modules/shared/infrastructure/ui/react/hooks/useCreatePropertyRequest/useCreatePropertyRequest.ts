import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { usePropertiesRequestsContext } from '../../contexts/propertiesRequests/propertiesRequests.context';

type CreatePropertyReturn = ReturnType<typeof usePropertiesRequestsContext>['createPropertyRequest'];

type CreatePropertyReturnValue = Awaited<ReturnType<CreatePropertyReturn>>;

type OnCreatePropertyArgs = Parameters<CreatePropertyReturn>[number];

interface UseCreatePropertyRequestReturn {
  onCreateProperty: (args: OnCreatePropertyArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: CreatePropertyReturnValue;
}

export const useCreatePropertyRequest = (args: { onSuccess?: VoidFunction }): UseCreatePropertyRequestReturn => {
  const { createPropertyRequest } = usePropertiesRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: createPropertyRequest,
    onSuccess: () => {
      args.onSuccess?.();
    },
    onError: error => {
      console.error('Create property failed:', error);
      toast.error('Create property failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {
    onCreateProperty: mutate,
    isPending,
    error,
    data,
  };
};
