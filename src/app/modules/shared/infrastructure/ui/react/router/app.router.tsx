import {authRoute} from '@/modules/auth/infrastructure/ui/react/route/auth.route';
import {createRoute, createRouter, Navigate} from '@tanstack/react-router';
import {NotFoundPage} from '../components/notFountPage/notFountPage';
import {PATHNAME_ROUTES} from '../constants/main.constants';
import {HomeContainer} from '../containers/home/home.container';
import {rootRoute} from '../route/root.route';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: PATHNAME_ROUTES.index,
  component: () => <Navigate to={PATHNAME_ROUTES.HOME} />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: PATHNAME_ROUTES.HOME.split('/').pop()!,
  component: HomeContainer,
});

const routeTree = rootRoute.addChildren([indexRoute, homeRoute, authRoute]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});
