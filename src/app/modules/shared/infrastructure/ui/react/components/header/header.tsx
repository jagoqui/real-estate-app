import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useAuthResponseContext } from '../../contexts/authResponse/authResponse.context';
import { UserProfileMenu } from '../userProfileMenu/userProfileMenu';

const NAV_LINKS = [
  { to: PATHNAME_ROUTES.PROPERTIES, label: 'PROPERTIES' },
  { to: PATHNAME_ROUTES.AGENTS, label: 'AGENTS' },
  { to: PATHNAME_ROUTES.SERVICES, label: 'SERVICES' },
  { to: PATHNAME_ROUTES.BLOG, label: 'BLOG' },
  { to: PATHNAME_ROUTES.CALCULATOR, label: 'CALCULATOR' },
  { to: PATHNAME_ROUTES.CONTACT, label: 'CONTACT' },
];

const NavLinks = ({ onClick, className = '' }: { onClick?: () => void; className?: string }): React.ReactElement => {
  return (
    <>
      {NAV_LINKS.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-sm tracking-wide hover:text-accent transition-colors ${className}`}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

// eslint-disable-next-line max-lines-per-function
export const Header = (): React.ReactElement => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { authResponse } = useAuthResponseContext();
  const user = authResponse?.user;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <nav className="flex flex-col gap-4">
              <NavLinks onClick={() => setMobileMenuOpen(false)} />
              {authResponse && (
                <>
                  <Link
                    to={PATHNAME_ROUTES.ADMIN}
                    className="text-sm tracking-wide hover:text-accent transition-colors flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    DASHBOARD
                  </Link>
                  <div className="w-fit self-end">
                    <UserProfileMenu />
                  </div>
                </>
              )}
              {!user && (
                <Button
                  variant="outline"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4"
                >
                  <Link to={PATHNAME_ROUTES.AUTH_LOGIN}>Login</Link>
                </Button>
              )}
            </nav>
          </div>
        )}

        <div className="flex items-center justify-between h-20">
          <Link to={PATHNAME_ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary" />
            <span className="text-xl font-serif tracking-tight">LUXE ESTATES</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <NavLinks />
          </nav>
          <div className="hidden md:flex items-center">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to={PATHNAME_ROUTES.ADMIN}>
                    <Button variant="ghost" className="gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      <span className="text-sm">DASHBOARD</span>
                    </Button>
                  </Link>
                )}
                <UserProfileMenu />
              </>
            ) : (
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to={PATHNAME_ROUTES.AUTH_LOGIN}>Login</Link>
              </Button>
            )}
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <X className="w-6 h-6 hover:mix-blend-difference" />
            ) : (
              <Menu className="w-6 h-6 hover:mix-blend-difference" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
