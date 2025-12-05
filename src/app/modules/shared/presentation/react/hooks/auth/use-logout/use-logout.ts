import { useAuthResponseContext } from '@/modules/shared//presentation/react/contexts/auth-response/auth-response.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthRepository } from '../use-auth-repository/use-auth-repository';

type LogoutReturn = ReturnType<typeof useAuthRepository>['logout'];

type LogoutReturnValue = Awaited<ReturnType<LogoutReturn>>;

interface UseLogout {
  onLogout: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: LogoutReturnValue;
}

export const useLogout = (): UseLogout => {
  const authRepository = useAuthRepository();
  const { setIsLoggingOut } = useAuthResponseContext();

  const { mutateAsync, isPending, error, data } = useMutation<LogoutReturnValue, Error>({
    mutationKey: ['logout'],
    mutationFn: () => authRepository.logout(),
    onError: error => {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  const onLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await mutateAsync();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { onLogout, isPending, error, data };
};
