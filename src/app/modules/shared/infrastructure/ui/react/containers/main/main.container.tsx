import {Toaster} from '@/components/ui/sonner';
import {AuthRequestsProvider} from '@/modules/auth/infrastructure/ui/react/providers/authRequest/authRequest.provider';
import {queryClient} from '@/modules/shared/infrastructure/clients/query/query.client';
import {VARIABLES} from '@/variables/infrastructure/constants/variables.constants';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider} from '@tanstack/react-router';
import {useGoogleProviderValidator} from '../../hooks/useGoogleProviderValidator/useGoogleProviderValidator';
import {AuthResponseProvider} from '../../providers/authResponse/authResponse.provider';
import {mainRouter} from '../../router/app.router';

export const MainContainer = (): React.ReactElement => {
  const {handlerOnScriptLoadError} = useGoogleProviderValidator();
  return (
    <GoogleOAuthProvider
      clientId={VARIABLES.VITE_GOOGLE_CLIENT_ID}
      onScriptLoadError={handlerOnScriptLoadError}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={mainRouter}
          InnerWrap={({children}) => (
            <AuthResponseProvider>
              <AuthRequestsProvider>{children}</AuthRequestsProvider>
            </AuthResponseProvider>
          )}
        />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
