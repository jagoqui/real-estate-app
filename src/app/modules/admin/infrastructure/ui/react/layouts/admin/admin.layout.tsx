import { AdminSidebarContainer } from '../../containers/adminSidebar/adminSidebar.container';
import { PanelContainer } from '../../containers/panel/panel.container';

export const AdminLayout = (): React.ReactElement => {
  return (
    <section className="flex h-full w-full">
      <AdminSidebarContainer />
      <PanelContainer />
    </section>
  );
};
