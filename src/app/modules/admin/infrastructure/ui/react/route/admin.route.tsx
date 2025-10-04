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
import { OwnersManagementContainer } from '../containers/ownersManagement/ownersManagement.container';
import { PropertiesManagementContainer } from '../containers/propertiesManagement/propertiesManagement.container';
import { UsersManagementContainer } from '../containers/usersManagement/usersManagement.container';

export const adminRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.ADMIN,
  component: AdminContainer,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: DashboardContainer,
});

const usersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_USERS,
  component: UsersManagementContainer,
});

const ownersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_OWNERS,
  component: OwnersManagementContainer,
});

const propertiesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.ADMIN_PROPERTIES,
  component: PropertiesManagementContainer,
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

adminRoute.addChildren([adminIndexRoute, usersRoute, ownersRoute, propertiesRoute, analyticsRoute, logsRoute]);
