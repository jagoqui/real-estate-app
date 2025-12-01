import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { BlockedAuthContainer } from '@/modules/shared/infrastructure/ui/react/containers/blocked-auth/blocked-auth.container';
import { Link, Outlet } from '@tanstack/react-router';

export const AuthContainer = (): React.ReactElement => {
  return (
    <BlockedAuthContainer>
      <main>
        <Link
          to={PATHNAME_ROUTES.HOME}
          className="absolute top-4 left-4 text-sm text-primary underline hover:text-accent transition-colors"
        >
          Go to Home
        </Link>
        <Outlet />
      </main>
    </BlockedAuthContainer>
  );
};
