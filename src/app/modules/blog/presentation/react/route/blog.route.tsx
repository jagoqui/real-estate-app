import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
import { appRoute } from '@/modules/shared//presentation/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { ContactContainer } from '../containers/blog/blog.container';
import { BlogLayout } from '../layouts/blog/blog.layout';

export const blogRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.BLOG,
  component: ContactContainer,
});

const blogIndexRoute = createRoute({
  getParentRoute: () => blogRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: BlogLayout,
});

blogRoute.addChildren([blogIndexRoute]);
