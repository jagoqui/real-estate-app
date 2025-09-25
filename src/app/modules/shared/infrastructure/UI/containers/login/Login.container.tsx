import { useGoogleOAuth } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';

export const LoginContainer = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const { scriptLoadedSuccessfully } = useGoogleOAuth();

  return (
    <>
      {!scriptLoadedSuccessfully ? (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <Loader2 className='w-8 h-8 animate-spin mx-auto text-blue-600' />
            <p className='text-muted-foreground'>Loading...</p>
          </div>
        </div>
      ) : (
        <div className='min-h-screen'>
          {/* {isAuthenticated ? <>User logged in {user?.name}</> : <Login />} */}
          {children}
        </div>
      )}
    </>
  );
};
