import { createRouter, type Route } from '@tanstack/react-router';
import { adminRoute } from './modules/admin/infrastructure/ui/react/route/admin.route';
import { agentsRoute } from './modules/agents/infrastructure/ui/react/route/agents.route';
import { authRoute } from './modules/auth/infrastructure/ui/react/route/auth.route';
import { blogRoute } from './modules/blog/infrastructure/ui/react/route/blog.route';
import { calculatorRoute } from './modules/calculator/infrastructure/ui/react/route/calculator.route';
import { contactRoute } from './modules/contact/infrastructure/ui/react/route/contact.route';
import { propertiesRoute } from './modules/properties/infrastructure/ui/react/router/properties.route';
import { servicesRoute } from './modules/services/infrastructure/ui/react/route/services.route';
import { NotFoundPage } from './modules/shared/infrastructure/ui/react/components/not-fount-page/not-fount-page';
import { appRoute } from './modules/shared/infrastructure/ui/react/route/app.route';

const appRouteChildren: Array<Route> = Array.isArray(appRoute.children) ? (appRoute.children as Array<Route>) : [];

const routeTree = appRoute.addChildren([
  ...appRouteChildren,
  propertiesRoute,
  agentsRoute,
  servicesRoute,
  blogRoute,
  calculatorRoute,
  contactRoute,
  authRoute,
  adminRoute,
]);

export const appRouter = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
  scrollRestoration: true,
});
