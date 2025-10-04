import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { appRoute } from '@/modules/shared/infrastructure/ui/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { AgentsContainer } from '../containers/agents/agents.container';
import { AgentsLayout } from '../layouts/agents/agents.layout';

export const agentsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.AGENTS,
  component: AgentsContainer,
});

const agentsIndexRoute = createRoute({
  getParentRoute: () => agentsRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: AgentsLayout,
});

agentsRoute.addChildren([agentsIndexRoute]);
