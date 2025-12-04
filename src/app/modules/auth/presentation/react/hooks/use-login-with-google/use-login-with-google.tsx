import { useAuthRepository } from '@/modules/shared/presentation/react/hooks/auth/use-auth-repository/use-auth-repository';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type LoginWithGoogleReturn = ReturnType<typeof useAuthRepository>['loginWithGoogle'];

type LoginWithGoogleArgs = Parameters<LoginWithGoogleReturn>[number];

type LoginWithGoogleReturnValue = Awaited<ReturnType<LoginWithGoogleReturn>>;

interface UseLoginWithGoogleReturn {
  onLoginWithGoogle: (args: LoginWithGoogleArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: LoginWithGoogleReturnValue;
}

export const useLoginWithGoogleRequest = (): UseLoginWithGoogleReturn => {
  const authRepository = useAuthRepository();

  const { mutate, isPending, error, data } = useMutation<LoginWithGoogleReturnValue, Error, LoginWithGoogleArgs>({
    mutationKey: ['login-with-google'],
    mutationFn: args => authRepository.loginWithGoogle(args),
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
