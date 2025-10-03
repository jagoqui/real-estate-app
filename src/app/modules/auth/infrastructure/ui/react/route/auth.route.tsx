import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { appRoute } from '@/modules/shared/infrastructure/ui/react/route/app.route';
import { createRoute, Navigate } from '@tanstack/react-router';
import { AuthContainer } from '../containers/auth/auth.container';
import { LoginContainer } from '../containers/login/login.container';
import { RegisterContainer } from '../containers/register/register.container';

export const authRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.AUTH,
  component: AuthContainer,
});

const authIndexRoute = createRoute({
  getParentRoute: () => authRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: () => <Navigate to={PATHNAME_ROUTES.LOGIN} />,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: PATHNAME_ROUTES.LOGIN.split('/').pop()!,
  component: LoginContainer,
});

const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: PATHNAME_ROUTES.REGISTER.split('/').pop()!,
  component: RegisterContainer,
});

authRoute.addChildren([authIndexRoute, loginRoute, registerRoute]);
