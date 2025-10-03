import { Toaster } from '@/components/ui/sonner';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from '@tanstack/react-router';
import { useGoogleProviderValidator } from '../../hooks/useGoogleProviderValidator/useGoogleProviderValidator';
import { MainLayout } from '../../layouts/main/main.layout';
import { AuthResponseProvider } from '../../providers/authResponse/authResponse.provider';
import { appRouter } from '../../router/app.router';

export const MainContainer = (): React.ReactElement => {
  const { handlerOnScriptLoadError } = useGoogleProviderValidator();
  return (
    <GoogleOAuthProvider clientId={VARIABLES.VITE_GOOGLE_CLIENT_ID} onScriptLoadError={handlerOnScriptLoadError}>
      <AuthResponseProvider>
        <RouterProvider router={appRouter} InnerWrap={({ children }) => <MainLayout>{children}</MainLayout>} />
      </AuthResponseProvider>
      <Toaster richColors />
    </GoogleOAuthProvider>
  );
};
