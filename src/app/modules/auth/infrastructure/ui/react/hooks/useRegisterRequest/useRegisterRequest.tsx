import {useAuthRequestsContext} from '@/modules/auth/infrastructure/ui/react/contexts/authRequests/authRequests.context';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';

type RegisterRequestReturn = ReturnType<typeof useAuthRequestsContext>['registerRequest'];

type RegisterRequestArgs = Parameters<RegisterRequestReturn>[number];

type RegisterRequestReturnValue = Awaited<ReturnType<RegisterRequestReturn>>;

interface UseRegisterRequestReturn {
  onRegister: (args: RegisterRequestArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: RegisterRequestReturnValue;
}

export const useRegisterRequest = (): UseRegisterRequestReturn => {
  const {registerRequest} = useAuthRequestsContext();

  const {mutate, isPending, error, data} = useMutation({
    mutationKey: ['register'],
    mutationFn: registerRequest,
    onSuccess: () => {
      toast.success('Registration successful!');
    },
    onError: error => {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {onRegister: mutate, isPending, error, data};
};
