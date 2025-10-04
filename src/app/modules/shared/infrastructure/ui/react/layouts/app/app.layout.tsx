import { Outlet, useRouterState } from '@tanstack/react-router';
import { FloatingAccessibilityButton } from '../../components/floatingAccessibilityButton/floatingAccessibilityButton';
import { Header } from '../../components/header/header';
import { ThemeProvider } from '../../providers/theme/theme.provider';

export const AppLayout = (): React.ReactElement => {
  const { location } = useRouterState();
  const showHeader = !location.pathname.includes('auth');

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
