import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthResponseContext } from '@/modules/shared/infrastructure/ui/react/contexts/authResponse/authResponse.context';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { AdminSidebarContent } from '../../components/adminSidebarContent/adminSidebarContent';
import { PanelBodyContainer } from '../panelBody/panelBody.container';

const INITIALS_LENGTH = 2;

interface SidebarContentProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const PanelContainer = ({ mobileMenuOpen, setMobileMenuOpen }: SidebarContentProps): React.ReactElement => {
  const { authResponse } = useAuthResponseContext();

  const [formData] = useState(authResponse?.user);
  const userName = authResponse?.user?.name || 'Admin User';

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, INITIALS_LENGTH);
  };

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
          <span className="text-xs lg:text-sm text-muted-foreground hidden sm:inline">Admin User</span>
          <Avatar className="size-8 lg:size-10">
            <AvatarImage src={formData?.photoUrl} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {' '}
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="p-4 lg:p-8">
        <PanelBodyContainer />
      </main>
    </div>
  );
};
