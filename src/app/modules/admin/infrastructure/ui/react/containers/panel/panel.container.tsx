import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { UserProfileMenu } from '@/modules/shared/infrastructure/ui/react/components/userProfileMenu/userProfileMenu';
import { Menu } from 'lucide-react';
import { AdminSidebarContent } from '../../components/adminSidebarContent/adminSidebarContent';
import { PanelBodyContainer } from '../panelBody/panelBody.container';

interface SidebarContentProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const PanelContainer = ({ mobileMenuOpen, setMobileMenuOpen }: SidebarContentProps): React.ReactElement => {
  return (
    <div className="flex-1 w-full">
      <header className="flex h-16 items-center justify-between border-b border-border px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <AdminSidebarContent setMobileMenuOpen={setMobileMenuOpen} />
            </SheetContent>
          </Sheet>
          <h1 className="font-serif text-xl lg:text-2xl font-semibold">Panel Administrativo</h1>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <UserProfileMenu />
        </div>
      </header>
      <main className="p-4 lg:p-8">
        <PanelBodyContainer />
      </main>
    </div>
  );
};
