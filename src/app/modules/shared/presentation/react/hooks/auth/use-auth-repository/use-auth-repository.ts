import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
import { useAuthResponseContext } from '@/modules/shared//presentation/react/contexts/auth-response/auth-response.context';
import { asyncFunctionValidationWrapper } from '@/modules/shared/domain/helpers/async-function-validation-wrapper/async-function-validation-wrapper.helper';
import type { Auth } from '@/modules/shared/domain/models/auth.model';
import type { AuthRepository } from '@/modules/shared/domain/repositories/auth.repository';
import { authRepositoryImpl } from '@/modules/shared/infrastructure/repositories/actions/auth/auth.repository.impl';
import { googleLogout } from '@react-oauth/google';
import { useRouter } from '@tanstack/react-router';

export const useAuthRepository = (): AuthRepository => {
  const { setAuthResponse } = useAuthResponseContext();
  const router = useRouter();

  const onSuccessLogin = (args: Auth): void => {
    const searchParams = router.state.location.search as { redirectTo?: string };
    const redirectTo = searchParams?.redirectTo || PATHNAME_ROUTES.HOME;

    setAuthResponse(args);

    void router.invalidate().then(() => {
      void router.navigate({ to: redirectTo, replace: true });
    });
  };

  const onSuccessRefreshToken = (args: Auth): void => {
    setAuthResponse(args);
  };

  const onSuccessLogout = (): void => {
    googleLogout();
    setAuthResponse(null);
    void router.navigate({ to: PATHNAME_ROUTES.HOME, replace: true });
  };

  const onError = (): void => {
    console.error('[useAuthRequests] onError called');
    setAuthResponse(null);
  };

  const wrappedRequests: AuthRepository = {
    register: async (args): Promise<Auth> =>
      asyncFunctionValidationWrapper({
        fn: () => authRepositoryImpl.register(args),
        args,
        onSuccess: onSuccessLogin,
        onError,
      }),
    loginWithEmailAndPassword: async (args): Promise<Auth> =>
      asyncFunctionValidationWrapper({
        fn: () => authRepositoryImpl.loginWithEmailAndPassword(args),
        args,
        onSuccess: onSuccessLogin,
        onError,
      }),
    loginWithGoogle: async (args): Promise<Auth> =>
      asyncFunctionValidationWrapper({
        fn: () => authRepositoryImpl.loginWithGoogle(args),
        args,
        onSuccess: onSuccessLogin,
        onError,
      }),
    refreshToken: async (args): Promise<Auth> =>
      asyncFunctionValidationWrapper({
        fn: () => authRepositoryImpl.refreshToken(args),
        args,
        onSuccess: onSuccessRefreshToken,
        onError,
      }),
    logout: async (): Promise<void> =>
      asyncFunctionValidationWrapper({
        fn: () => authRepositoryImpl.logout(),
        onSuccess: onSuccessLogout,
        onError,
      }),
  };

  return wrappedRequests;
};
