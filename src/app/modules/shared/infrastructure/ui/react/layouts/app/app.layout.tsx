import { Outlet } from '@tanstack/react-router';
import { Header } from '../../components/header/header';

export const AppLayout = (): React.ReactElement => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
