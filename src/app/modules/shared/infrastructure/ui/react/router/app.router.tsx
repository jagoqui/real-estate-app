import { adminRoute } from '@/modules/admin/infrastructure/ui/react/router/admin.router';
import { authRoute } from '@/modules/auth/infrastructure/ui/react/route/auth.route';
import { propertiesRoute } from '@/modules/properties/infrastructure/ui/react/router/properties.route';
import { createRoute, createRouter, Navigate } from '@tanstack/react-router';
import { NotFoundPage } from '../components/notFountPage/notFountPage';
import { PATHNAME_ROUTES } from '../constants/main.constants';
import { HomeContainer } from '../containers/home/home.container';
import { appRoute } from '../route/app.route';

const indexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: () => <Navigate to={PATHNAME_ROUTES.HOME} />,
});

const homeRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.HOME,
  component: HomeContainer,
});

const routeTree = appRoute.addChildren([indexRoute, homeRoute, propertiesRoute, authRoute, adminRoute]);

export const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});
