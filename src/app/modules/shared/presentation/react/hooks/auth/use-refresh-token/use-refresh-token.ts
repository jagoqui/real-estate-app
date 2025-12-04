import type { RefreshTokenInput } from '@/modules/shared/domain/inputs/auth.input';
import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { authTokenRepositoryImpl } from '@/modules/shared/infrastructure/repositories/auth-token.repository.impl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthRepository } from '../use-auth-repository/use-auth-repository';

interface UseRefreshTokenReturn {
  onRefreshToken: () => Promise<Auth>;
  isPending: boolean;
  error: Error | null;
  data?: Auth;
}

export const useRefreshToken = (): UseRefreshTokenReturn => {
  const authRepository = useAuthRepository();

  const { mutateAsync, isPending, error, data } = useMutation<Auth, Error, RefreshTokenInput>({
    mutationKey: ['refresh-token'],
    mutationFn: args => authRepository.refreshToken(args),
    onError: error => {
      console.error('[useRefreshTokenRequest] Mutation onError:', error);
      toast.error('Refresh token failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  const onRefreshToken = async (): Promise<Auth> => {
    const { refreshToken } = authTokenRepositoryImpl.get() || {};

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const result = await mutateAsync({ refreshToken });
    return result;
  };

  return { onRefreshToken, isPending, error, data };
};
