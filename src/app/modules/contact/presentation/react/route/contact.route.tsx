import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
import { appRoute } from '@/modules/shared//presentation/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { BlogContainer } from '../containers/contact/contact.container';
import { ContactLayout } from '../layouts/contact/contact.layout';

export const contactRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.CONTACT,
  component: BlogContainer,
});

const contactIndexRoute = createRoute({
  getParentRoute: () => contactRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: ContactLayout,
});

contactRoute.addChildren([contactIndexRoute]);
