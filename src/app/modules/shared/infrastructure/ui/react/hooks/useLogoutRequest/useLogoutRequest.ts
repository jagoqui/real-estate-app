import {useAuthRequestsContext} from '@/modules/shared/infrastructure/ui/react/contexts/authRequests/authRequests.context';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';

type LogoutRequestReturn = ReturnType<typeof useAuthRequestsContext>['logoutRequest'];

type LogoutRequestReturnValue = Awaited<ReturnType<LogoutRequestReturn>>;

interface UseLogoutRequestReturn {
  onLogout: () => void;
  isPending: boolean;
  error: Error | null;
  data?: LogoutRequestReturnValue;
}

export const useLogoutRequest = (): UseLogoutRequestReturn => {
  const {logoutRequest} = useAuthRequestsContext();

  const {mutate, isPending, error, data} = useMutation({
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

  return {onLogout: mutate, isPending, error, data};
};
