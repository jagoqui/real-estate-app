import { GoogleOAuthProvider } from '@react-oauth/google';
import { MainLayout } from '../../layouts/main/Main.layout';

export const MainContainer = () => {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      onScriptLoadError={() =>
        console.error('Google OAuth script failed to load')
      }
      onScriptLoadSuccess={() => console.log('Google OAuth script loaded')}
    >
      <MainLayout />
    </GoogleOAuthProvider>
  );
};
