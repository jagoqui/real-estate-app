import { useGoogleOAuth } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { LoginLayout } from '../../layouts/login/login.layout';

export const LoginContainer = (): React.ReactElement => {
  const { scriptLoadedSuccessfully } = useGoogleOAuth();

  if (!scriptLoadedSuccessfully) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <Loader2 className='w-8 h-8 animate-spin mx-auto text-blue-600' />
          <p className='text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }

  return <LoginLayout />;
};
