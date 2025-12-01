import { getAuthTokenBL } from '@/modules/shared/domain/business-logic/get-auth-token/get-auth-token.bl';
import { useAuthRequestsContext } from '@/modules/shared/infrastructure/ui/react/contexts/auth-requests/auth-requests.context';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type RefreshTokenRequestReturn = ReturnType<typeof useAuthRequestsContext>['refreshTokenRequest'];

type RefreshTokenRequestReturnValue = Awaited<ReturnType<RefreshTokenRequestReturn>>;

interface UseRefreshTokenRequestReturn {
  onRefreshToken: () => Promise<RefreshTokenRequestReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: RefreshTokenRequestReturnValue;
}

export const useRefreshTokenRequest = (): UseRefreshTokenRequestReturn => {
  const { refreshTokenRequest } = useAuthRequestsContext();

  const { mutateAsync, isPending, error, data } = useMutation({
    mutationKey: ['refresh-token'],
    mutationFn: refreshTokenRequest,
    onError: error => {
      console.error('[useRefreshTokenRequest] Mutation onError:', error);
      toast.error('Refresh token failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  const onRefreshToken = async (): Promise<RefreshTokenRequestReturnValue> => {
    const { refreshToken } = getAuthTokenBL() || {};

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const result = await mutateAsync({ refreshToken });
    return result;
  };

  return { onRefreshToken, isPending, error, data };
};
