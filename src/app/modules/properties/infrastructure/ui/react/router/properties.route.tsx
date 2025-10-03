import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { appRoute } from '@/modules/shared/infrastructure/ui/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { PropertyDetail } from '../components/propertyDetail/propertyDetail';
import { PropertiesContainer } from '../containers/properties/properties.container';

export const propertiesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.PROPERTIES,
  component: PropertiesContainer,
});

const propertyDetailsRoute = createRoute({
  getParentRoute: () => propertiesRoute,
  path: PATHNAME_ROUTES.PROPERTY_DETAILS.split('/').pop()!,
  component: PropertyDetail,
});

propertiesRoute.addChildren([propertyDetailsRoute]);
