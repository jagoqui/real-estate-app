import { AdminSidebarContent } from '../../components/admin-sidebar-content/admin-sidebar-content';

interface SidebarContentProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export const AdminSidebarLayout = ({ setMobileMenuOpen }: SidebarContentProps): React.ReactElement => {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:block w-64 border-r border-border bg-card relative">
        <AdminSidebarContent setMobileMenuOpen={setMobileMenuOpen} />
      </aside>
    </div>
  );
};
