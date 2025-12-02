import {
  PATHNAME_ROUTES,
  PATHNAME_ROUTES_LAST_SEGMENTS,
} from '@/modules/shared//presentation/react/constants/main.constants';
import { appRoute } from '@/modules/shared//presentation/react/route/app.route';
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
  component: () => <Navigate to={PATHNAME_ROUTES.AUTH_LOGIN} />,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.AUTH_LOGIN,
  component: LoginContainer,
});

const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.AUTH_REGISTER,
  component: RegisterContainer,
});

authRoute.addChildren([authIndexRoute, loginRoute, registerRoute]);
