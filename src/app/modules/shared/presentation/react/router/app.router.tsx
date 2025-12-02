import { adminRoute } from '@/modules/admin//presentation/react/route/admin.route';
import { agentsRoute } from '@/modules/agents//presentation/react/route/agents.route';
import { authRoute } from '@/modules/auth//presentation/react/route/auth.route';
import { blogRoute } from '@/modules/blog//presentation/react/route/blog.route';
import { calculatorRoute } from '@/modules/calculator//presentation/react/route/calculator.route';
import { contactRoute } from '@/modules/contact//presentation/react/route/contact.route';
import { propertiesRoute } from '@/modules/properties//presentation/react/router/properties.route';
import { servicesRoute } from '@/modules/services//presentation/react/route/services.route';
import { createRouter, type Route } from '@tanstack/react-router';
import { NotFoundPage } from '../components/not-fount-page/not-fount-page';
import { appRoute } from '../route/app.route';

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
