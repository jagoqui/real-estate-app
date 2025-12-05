import { Separator } from '@/components/ui/separator';
import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
import { Link, useRouter } from '@tanstack/react-router';
import { type ReactElement } from 'react';
import { LoginWithEmailAndPasswordForm } from '../../components/login-form/login-form';
import { LoginWithGoogle } from '../../components/login-with-google/login-with-google';
import { useLoginWithEmailAndPassword } from '../../hooks/use-login-with-email-and-password/use-login-with-email-and-password';
import { useLoginWithGoogleRequest } from '../../hooks/use-login-with-google/use-login-with-google';

export const LoginLayout = (): ReactElement => {
  const {
    onLoginWithEmailAndPassword,
    isPending: isLoginEmailAndPasswordPending,
    error: emailError,
  } = useLoginWithEmailAndPassword();
  const router = useRouter();
  const currentSearch = router.state.location.search as Record<string, unknown>;

  const { onLoginWithGoogle, isPending: isLoginWithGooglePending, error: googleError } = useLoginWithGoogleRequest();

  const isLoading = isLoginWithGooglePending || isLoginEmailAndPasswordPending;

  const error = emailError?.message ?? googleError?.message;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-xl font-semibold text-foreground">Log in or create account</h2>

          <LoginWithEmailAndPasswordForm
            onSubmit={onLoginWithEmailAndPassword}
            isLoading={isLoginEmailAndPasswordPending || isLoading}
          />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or with</span>
            </div>
          </div>

          <LoginWithGoogle onSuccess={onLoginWithGoogle} isPendingLogin={isLoading} />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to={PATHNAME_ROUTES.AUTH_REGISTER}
              replace
              search={currentSearch}
              className="font-medium text-primary hover:text-primary/90 cursor-pointer"
            >
              Sign up
            </Link>
          </p>

          {error && (
            <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <a href="#" className="underline underline-offset-4">
              terms of service
            </a>{' '}
            and{' '}
            <a href="#" className="underline underline-offset-4">
              privacy policy
            </a>
            .
          </p>
          <div className="text-center text-sm text-muted-foreground">
            <p>Protected by Google Security</p>
          </div>
        </div>
      </div>
    </div>
  );
};
