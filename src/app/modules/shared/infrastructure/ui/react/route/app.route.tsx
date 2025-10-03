import { createRootRoute } from '@tanstack/react-router';
import { AppContainer } from '../containers/app/app.container';

export const appRoute = createRootRoute({
  component: AppContainer,
});
