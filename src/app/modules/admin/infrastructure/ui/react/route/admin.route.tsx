import {
  PATHNAME_ROUTES,
  PATHNAME_ROUTES_LAST_SEGMENTS,
} from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { appRoute } from '@/modules/shared/infrastructure/ui/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { AdminContainer } from '../containers/admin/admin.container';
import { AnalyticsContainer } from '../containers/analytics/analytics.container';
import { DashboardContainer } from '../containers/dashboard/dashboard.container';
import { LogsContainer } from '../containers/logs/logs.container';
import { OwnersContainer } from '../containers/owners/owners.container';
import { PropertiesContainer } from '../containers/properties/properties.container';
import { UsersContainer } from '../containers/users/users.container';

export const adminRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.ADMIN,
  component: AdminContainer,
});

export const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: DashboardContainer,
});

const usersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_USERS,
  component: UsersContainer,
});

const ownersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_OWNERS,
  component: OwnersContainer,
});

const propertiesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_PROPERTIES,
  component: PropertiesContainer,
});

const analyticsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_ANALYTICS,
  component: AnalyticsContainer,
});

const logsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_LOGS,
  component: LogsContainer,
});

adminRoute.addChildren([usersRoute, ownersRoute, propertiesRoute, analyticsRoute, logsRoute]);
