import {Login} from '@/app/modules/login/infrastructure/UI/components/Login';
import {LoginContainer} from '../../containers/login/Login.container';

export const MainLayout = (): React.ReactElement => (
  <main className='min-h-screen'>
    <LoginContainer>
      <Login />
    </LoginContainer>
  </main>
);
