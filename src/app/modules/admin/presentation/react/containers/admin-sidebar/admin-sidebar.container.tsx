import { AdminSidebarLayout } from '../../layouts/admin-sidebar/admin-sidebar.layout';

interface AdminSidebarContainerProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export const AdminSidebarContainer = ({ setMobileMenuOpen }: AdminSidebarContainerProps): React.ReactElement => {
  return <AdminSidebarLayout setMobileMenuOpen={setMobileMenuOpen} />;
};
