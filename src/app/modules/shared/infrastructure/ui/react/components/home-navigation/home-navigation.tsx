import { Link } from '@tanstack/react-router';
import { PATHNAME_ROUTES } from '../../constants/main.constants';

export const HomeNavigation = (): React.ReactElement => (
  <Link to={PATHNAME_ROUTES.HOME} className="flex items-center gap-2">
    <div className="w-8 h-8 bg-primary" />
    <span className="text-xl font-serif tracking-tight">LUXE ESTATES</span>
  </Link>
);
