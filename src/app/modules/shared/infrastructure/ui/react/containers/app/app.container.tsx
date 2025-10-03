import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from 'node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools';

export const AppContainer = (): React.ReactElement => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};
