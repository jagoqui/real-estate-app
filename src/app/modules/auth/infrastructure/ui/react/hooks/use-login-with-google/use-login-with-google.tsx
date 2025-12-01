import { useAuthRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/auth-requests/auth-requests.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type LoginWithGoogleRequestReturn = ReturnType<typeof useAuthRequestsContext>['loginWithGoogleRequest'];

type LoginWithGoogleRequestArgs = Parameters<LoginWithGoogleRequestReturn>[number];

type LoginWithGoogleRequestReturnValue = Awaited<ReturnType<LoginWithGoogleRequestReturn>>;

interface UseLoginWithGoogleRequestReturn {
  onLoginWithGoogle: (args: LoginWithGoogleRequestArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: LoginWithGoogleRequestReturnValue;
}

export const useLoginWithGoogleRequest = (): UseLoginWithGoogleRequestReturn => {
  const { loginWithGoogleRequest } = useAuthRequestsContext();

  const { mutate, isPending, error, data } = useMutation({
    mutationKey: ['login-with-google'],
    mutationFn: loginWithGoogleRequest,
    onError: error => {
      console.error('Login with Google failed:', error);
      toast.error('Login with Google failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return { onLoginWithGoogle: mutate, isPending, error, data };
};
