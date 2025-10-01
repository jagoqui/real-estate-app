import {useAuthRequestsContext} from '@/modules/auth/infrastructure/ui/react/contexts/authRequests/authRequests.context';
import {useMutation} from '@tanstack/react-query';
import {toast} from 'sonner';

type RefreshTokenRequestReturn = ReturnType<typeof useAuthRequestsContext>['refreshTokenRequest'];

type RefreshTokenRequestArgs = Parameters<RefreshTokenRequestReturn>[number];

type RefreshTokenRequestReturnValue = Awaited<ReturnType<RefreshTokenRequestReturn>>;

interface UseRefreshTokenRequestReturn {
  onRefreshToken: (args: RefreshTokenRequestArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: RefreshTokenRequestReturnValue;
}

export const useRefreshTokenRequest = (): UseRefreshTokenRequestReturn => {
  const {refreshTokenRequest} = useAuthRequestsContext();

  const {mutate, isPending, error, data} = useMutation({
    mutationKey: ['refresh-token'],
    mutationFn: refreshTokenRequest,
    onError: error => {
      console.error('Refresh token failed:', error);
      toast.error('Refresh token failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return {onRefreshToken: mutate, isPending, error, data};
};
