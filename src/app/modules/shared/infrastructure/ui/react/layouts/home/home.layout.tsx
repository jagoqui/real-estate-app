import { Button } from '@/components/ui/button';
import { useLogoutRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useLogoutRequest/useLogoutRequest';
import { Link } from '@tanstack/react-router';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';

export const HomeLayout = (): React.ReactElement => {
  const { authResponse } = useAuthResponseContext();
  const { onLogout, isPending } = useLogoutRequest();

  if (isPending) {
    return <div>Signing out...</div>;
  }

  if (!authResponse?.accessToken) {
    return (
      <div>
        Please log in to access this content.{' '}
        <Link to={PATHNAME_ROUTES.AUTH_LOGIN} replace>
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap gap-4 w-full">
      <h1>Welcome, you are logged in !</h1>
      <p>Your access token: {authResponse.accessToken}</p>
      <p>Your refresh token: {authResponse.refreshToken}</p>
      <p>Your user ID: {authResponse.user.id}</p>
      <p>Your email: {authResponse.user.email}</p>
      <p>Your name: {authResponse.user.name}</p>
      <p>Your profile picture: {authResponse.user.photoUrl}</p>
      <p>Your roles: {authResponse.user.role}</p>

      <Button onClick={() => onLogout()} disabled={isPending}>
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
};
