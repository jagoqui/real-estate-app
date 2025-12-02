import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
import { appRoute } from '@/modules/shared//presentation/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { ContactContainer } from '../containers/services/services.container';
import { ServicesLayout } from '../layouts/services/services.layout';

export const servicesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.SERVICES,
  component: ContactContainer,
});

const servicesIndexRoute = createRoute({
  getParentRoute: () => servicesRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: ServicesLayout,
});

servicesRoute.addChildren([servicesIndexRoute]);
