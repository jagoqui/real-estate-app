import { AdminSidebarLayout } from '../../layouts/adminSidebar/adminSidebar.layout';

interface AdminSidebarContainerProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export const AdminSidebarContainer = ({ setMobileMenuOpen }: AdminSidebarContainerProps): React.ReactElement => {
  return <AdminSidebarLayout setMobileMenuOpen={setMobileMenuOpen} />;
};
