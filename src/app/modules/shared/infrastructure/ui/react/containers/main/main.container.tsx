import { Toaster } from '@/components/ui/sonner';
import { VARIABLES } from '@/variables/infrastructure/constants/variables.constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from '@tanstack/react-router';
import { useGoogleProviderValidator } from '../../hooks/use-google-provider-validator/use-google-provider-validator';
import { MainLayout } from '../../layouts/main/main.layout';
import { AuthResponseProvider } from '../../providers/auth-response/auth-response.provider';
import { appRouter } from '../../router/app.router';

export const MainContainer = (): React.ReactElement => {
  const { handlerOnScriptLoadError } = useGoogleProviderValidator();
  return (
    <GoogleOAuthProvider clientId={VARIABLES.VITE_GOOGLE_CLIENT_ID} onScriptLoadError={handlerOnScriptLoadError}>
      <AuthResponseProvider>
        <RouterProvider router={appRouter} InnerWrap={({ children }) => <MainLayout>{children}</MainLayout>} />
      </AuthResponseProvider>
      <Toaster
        richColors
        toastOptions={{
          classNames: {
            toast:
              'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto',
          },
        }}
      />
    </GoogleOAuthProvider>
  );
};
