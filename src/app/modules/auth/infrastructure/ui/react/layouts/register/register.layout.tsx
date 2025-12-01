import { Card, CardContent } from '@/components/ui/card';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Link, useRouter } from '@tanstack/react-router';
import type { JSX } from 'react';
import { RegisterForm } from '../../components/register-form/register-form';
import { useRegisterRequest } from '../../hooks/use-register-request/use-register-request';

export const RegisterLayout = (): JSX.Element => {
  const { onRegister, isPending } = useRegisterRequest();
  const router = useRouter();

  const currentSearch = router.state.location.search as Record<string, unknown>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-2 text-center text-lg font-bold text-foreground dark:text-foreground">
            Create new account for Real Estate Luxury
          </h3>
        </div>

        <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <RegisterForm onSubmit={onRegister} isPending={isPending} />
            <p className="mt-6 text-center text-xs text-muted-foreground dark:text-muted-foreground">
              By signing in, you agree to our{' '}
              <a href="#" className="capitalize text-primary hover:text-primary/90">
                Terms of use
              </a>{' '}
              and{' '}
              <a href="#" className="capitalize text-primary hover:text-primary/90">
                Privacy policy
              </a>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
          Already have an account?{' '}
          <Link
            to={PATHNAME_ROUTES.AUTH_LOGIN}
            replace
            search={currentSearch}
            className="font-medium text-primary hover:text-primary/90 cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
