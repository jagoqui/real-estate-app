import { useAuthRequestsContext } from '@/modules/shared//presentation/react/contexts/auth-requests/auth-requests.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type LoginWithEmailAndPasswordRequestReturn = ReturnType<
  typeof useAuthRequestsContext
>['loginWithEmailAndPasswordRequest'];

type LoginWithEmailAndPasswordRequestArgs = Parameters<LoginWithEmailAndPasswordRequestReturn>[number];

type LoginWithEmailAndPasswordRequestReturnValue = Awaited<ReturnType<LoginWithEmailAndPasswordRequestReturn>>;

interface UseLoginWithEmailAndPasswordRequestReturn {
  onLoginWithEmailAndPassword: (args: LoginWithEmailAndPasswordRequestArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: LoginWithEmailAndPasswordRequestReturnValue;
}

export const useLoginWithEmailAndPasswordRequest = (): UseLoginWithEmailAndPasswordRequestReturn => {
  const { loginWithEmailAndPasswordRequest } = useAuthRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['login-with-email-and-password'],
    mutationFn: loginWithEmailAndPasswordRequest,
    onError: error => {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return { onLoginWithEmailAndPassword: mutate, isPending, error, data };
};
