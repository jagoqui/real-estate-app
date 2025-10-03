import { adminRoute } from '@/modules/admin/infrastructure/ui/react/route/admin.route';
import { authRoute } from '@/modules/auth/infrastructure/ui/react/route/auth.route';
import { propertiesRoute } from '@/modules/properties/infrastructure/ui/react/router/properties.route';
import { createRouter, type Route } from '@tanstack/react-router';
import { NotFoundPage } from '../components/notFountPage/notFountPage';
import { appRoute } from '../route/app.route';

const appRouteChildren: Array<Route> = Array.isArray(appRoute.children) ? (appRoute.children as Array<Route>) : [];

const routeTree = appRoute.addChildren([...appRouteChildren, propertiesRoute, authRoute, adminRoute]);

export const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});
