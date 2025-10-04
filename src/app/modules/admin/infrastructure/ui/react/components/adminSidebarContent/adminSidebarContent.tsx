import { Button } from '@/components/ui/button';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Link } from '@tanstack/react-router';
import { BarChart3, FileText, Home, LayoutDashboard, Users } from 'lucide-react';

const navItems = [
  { href: PATHNAME_ROUTES.ADMIN, icon: LayoutDashboard, label: 'Dashboard' },
  { href: PATHNAME_ROUTES.ADMIN_USERS, icon: Users, label: 'Usuarios' },
  { href: PATHNAME_ROUTES.ADMIN_OWNERS, icon: Users, label: 'Propietarios' },
  { href: PATHNAME_ROUTES.ADMIN_PROPERTIES, icon: Home, label: 'Propiedades' },
  { href: PATHNAME_ROUTES.ADMIN_ANALYTICS, icon: BarChart3, label: 'Analytics' },
  { href: PATHNAME_ROUTES.ADMIN_LOGS, icon: FileText, label: 'Logs de Compras' },
];

interface AdminSidebarContentProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export const AdminSidebarContent = ({ setMobileMenuOpen }: AdminSidebarContentProps): React.ReactElement => (
  <>
    <div className="flex h-16 items-center border-b border-border px-6">
      <Link to={PATHNAME_ROUTES.INDEX} className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary" />
        <span className="font-serif text-xl font-semibold">Admin</span>
      </Link>
    </div>
    <nav className="space-y-1 p-4">
      {navItems.map(item => (
        <Link to={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} key={item.href}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
    <div className="absolute bottom-12 left-4 right-4">
      <Link to={PATHNAME_ROUTES.INDEX}>
        <Button variant="outline" className="w-full bg-transparent">
          Volver al home
        </Button>
      </Link>
    </div>
  </>
);
