import { Outlet, useRouterState } from '@tanstack/react-router';
import { FloatingAccessibilityButton } from '../../components/floatingAccessibilityButton/floatingAccessibilityButton';
import { Header } from '../../components/header/header';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { ThemeProvider } from '../../providers/theme/theme.provider';

export const AppLayout = (): React.ReactElement => {
  const { location } = useRouterState();
  const showHeader =
    !location.pathname.includes(PATHNAME_ROUTES.AUTH) && !location.pathname.includes(PATHNAME_ROUTES.ADMIN);

  return (
    <ThemeProvider>
      {showHeader && <Header />}
      <main className={showHeader ? 'mt-[80px] min-h-[calc(100vh-80px)]' : 'min-h-screen'}>
        <Outlet />
      </main>
      <FloatingAccessibilityButton />
    </ThemeProvider>
  );
};
