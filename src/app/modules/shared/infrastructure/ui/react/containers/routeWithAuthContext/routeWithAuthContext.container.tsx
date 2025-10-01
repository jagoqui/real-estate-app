import {RouterProvider} from '@tanstack/react-router';
import {useAuthResponseContext} from '../../contexts/authResponse/authResponse.context';
import {router} from '../../router/app.router';

export const RouterWithAuthContext = (): React.ReactElement => {
  const {authResponse} = useAuthResponseContext();

  return (
    <RouterProvider
      router={router}
      context={{
        authResponse,
      }}
    />
  );
};
