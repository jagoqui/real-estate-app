import { useAuthRepository } from '@/modules/shared/presentation/react/hooks/auth/use-auth-repository/use-auth-repository';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type RegisterReturn = ReturnType<typeof useAuthRepository>['register'];

type RegisterArgs = Parameters<RegisterReturn>[number];

type RegisterReturnValue = Awaited<ReturnType<RegisterReturn>>;

interface UseRegisterReturn {
  onRegister: (args: RegisterArgs) => void;
  isPending: boolean;
  error: Error | null;
  data?: RegisterReturnValue;
}

export const useRegister = (): UseRegisterReturn => {
  const authRepository = useAuthRepository();

  const { mutate, isPending, error, data } = useMutation<RegisterReturnValue, Error, RegisterArgs>({
    mutationKey: ['register'],
    mutationFn: args => authRepository.register(args),
    onSuccess: () => {
      toast.success('Registration successful!');
    },
    onError: error => {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.', {
        duration: Infinity,
        description: error.message || 'An unexpected error occurred.',
        closeButton: true,
      });
    },
  });

  return { onRegister: mutate, isPending, error, data };
};
