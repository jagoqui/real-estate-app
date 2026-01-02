import type { RefreshTokenCommand } from '@/modules/shared/domain/commands/auth.commands';
import type { Auth } from '@/modules/shared/domain/models/auth.model';
import { tokenStorageRepositoryImpl } from '@/modules/shared/infrastructure/adapters/storage/token/token-storage.repository.impl';
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

  const { mutateAsync, isPending, error, data } = useMutation<Auth, Error, RefreshTokenCommand>({
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
    const { refreshToken } = tokenStorageRepositoryImpl.get() || {};

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const result = await mutateAsync({ refreshToken });
    return result;
  };

  return { onRefreshToken, isPending, error, data };
};
