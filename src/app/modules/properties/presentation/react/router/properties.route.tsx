import {
  PATHNAME_ROUTES,
  PATHNAME_ROUTES_LAST_SEGMENTS,
} from '@/modules/shared//presentation/react/constants/main.constants';
import { appRoute } from '@/modules/shared//presentation/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { PropertiesContainer } from '../containers/properties/properties.container';
import { PropertyDetailContainer } from '../containers/property-detail/property-detail.container';
import { PropertiesLayout } from '../layouts/properties/properties.layout';

export const propertiesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.PROPERTIES,
  component: PropertiesContainer,
});

const propertiesIndexRoute = createRoute({
  getParentRoute: () => propertiesRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: PropertiesLayout,
});

const propertyDetailsRoute = createRoute({
  getParentRoute: () => propertiesRoute,
  path: PATHNAME_ROUTES_LAST_SEGMENTS.PROPERTY_DETAILS,
  component: PropertyDetailContainer,
});

propertiesRoute.addChildren([propertiesIndexRoute, propertyDetailsRoute]);
