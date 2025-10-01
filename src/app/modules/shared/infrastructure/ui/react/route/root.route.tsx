import {createRootRoute, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from 'node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
