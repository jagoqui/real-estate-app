import { useAuthRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/auth-requests/auth-requests.context';
import { useAuthResponseContext } from '@/modules/shared/infrastructure/ui/react/contexts/auth-response/auth-response.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type LogoutRequestReturn = ReturnType<typeof useAuthRequestsContext>['logoutRequest'];

type LogoutRequestReturnValue = Awaited<ReturnType<LogoutRequestReturn>>;

interface UseLogoutRequestReturn {
  onLogout: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  data?: LogoutRequestReturnValue;
}

export const useLogoutRequest = (): UseLogoutRequestReturn => {
  const { logoutRequest } = useAuthRequestsContext();
  const { setIsLoggingOut } = useAuthResponseContext();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutRequest,
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
