import { useAuthRepository } from '@/modules/shared/presentation/react/hooks/auth/use-auth-repository/use-auth-repository';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type LoginWithEmailAndPasswordReturn = ReturnType<typeof useAuthRepository>['loginWithEmailAndPassword'];

type LoginWithEmailAndPasswordArgs = Parameters<LoginWithEmailAndPasswordReturn>[number];

type LoginWithEmailAndPasswordReturnValue = Awaited<ReturnType<LoginWithEmailAndPasswordReturn>>;

interface UseLoginWithEmailAndPasswordReturn {
  onLoginWithEmailAndPassword: (args: LoginWithEmailAndPasswordArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: LoginWithEmailAndPasswordReturnValue;
}

export const useLoginWithEmailAndPassword = (): UseLoginWithEmailAndPasswordReturn => {
  const authRepository = useAuthRepository();

  const { mutate, isPending, error, data } = useMutation<
    LoginWithEmailAndPasswordReturnValue,
    Error,
    LoginWithEmailAndPasswordArgs
  >({
    mutationKey: ['login-with-email-and-password'],
    mutationFn: args => authRepository.loginWithEmailAndPassword(args),
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
