import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Link } from '@tanstack/react-router';

export const AdminSidebarLayout = (): React.ReactElement => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 text-white h-screen w-60">
      <Link to={PATHNAME_ROUTES.ADMIN}>Dashboard</Link>
      <Link to={PATHNAME_ROUTES.ADMIN_USERS}>Users</Link>
      <Link to={PATHNAME_ROUTES.ADMIN_OWNERS}>Owners</Link>
      <Link to={PATHNAME_ROUTES.ADMIN_PROPERTIES}>Properties</Link>
      <Link to={PATHNAME_ROUTES.ADMIN_ANALYTICS}>Analytics</Link>
      <Link to={PATHNAME_ROUTES.ADMIN_LOGS}>Logs</Link>
    </div>
  );
};
