import { useState } from 'react';
import { AdminSidebarContainer } from '../../containers/adminSidebar/adminSidebar.container';
import { PanelContainer } from '../../containers/panel/panel.container';

export const AdminLayout = (): React.ReactElement => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <section className="flex h-full w-full">
      <AdminSidebarContainer setMobileMenuOpen={setMobileMenuOpen} />
      <PanelContainer mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </section>
  );
};
